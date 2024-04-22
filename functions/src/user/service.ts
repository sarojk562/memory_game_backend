import * as admin from 'firebase-admin'
import * as dbService from './dbservice'
import { userError } from './error'
import CustomError from '../utils/customError'
import {
  UserSignupPayLoad,
  FirebaseUserPayload,
  UserLevelUpdatePayload,
  UserStatsPayload,
} from './structs'

/*
 * ======
 * USERS
 * ======
 */

const createNewUser = async (
  payload: UserSignupPayLoad
) => {
  const { user_name_first, user_name_last, user_email, user_pswd } = payload

  // Step-1) Create User in Firebase Auth
  const firebaseUserData: FirebaseUserPayload = {
    displayName: user_name_first + ' ' + user_name_last,
    password: user_pswd,
    email: user_email
  }
  const firebaseuser: admin.auth.UserRecord = await admin
    .auth()
    .createUser(firebaseUserData)

  if (!firebaseuser.uid) {
    throw new CustomError(userError.auth.signupfirebaseerror)
  }

  // Insert user data to "users" collection in firestore
  await dbService.createUser(payload, firebaseuser)

  return firebaseuser.uid
}

// Create New User
export const createUser = async (
  payload: UserSignupPayLoad
) => {
  await createUserInputvalidation(payload)

  const { user_email } = payload

  // Check if user already exists based on email
  const user = await findUserByEmail(user_email)
  // New User
  if (!user) {
    const uid = await createNewUser(payload)
    return uid
  }

  // Existing user
  if (user) {
    const user_id = user.uid
    if (!user_id) {
      throw new CustomError(userError.db.nouser)
    }

    return user_id // To-do: Change response
  }
}

export const fetchAllUsers = async () => {
  const result = await dbService.fecthAllUsers()
  if (result) {
    return result
  } else {
    return []
  }
}

export const updateUserLevel = async (payload: UserLevelUpdatePayload) => {
  const { user_email, user_level } = payload

  if (!user_email || !user_email.length || !user_level) {
    throw new CustomError(userError.validation.missingfield)
  }

  // User should be present
  const user = await findUserByEmail(user_email)
  if (!user) {
    throw new CustomError(userError.db.nouser)
  }

  payload.user_id = user.uid

  const result = await dbService.updateUserLevel(payload)

  if (result) {
    return { status: 'User Updated Successfully!' }
  }

  return { status: 'Not able to update User Level!'}
}

export const getUserLevel = async (user_email: string) => {
  if (!user_email || !user_email.length) {
    throw new CustomError(userError.validation.missingfield)
  }

  // User should be present
  const user = await findUserByEmail(user_email)
  if (!user) {
    throw new CustomError(userError.db.nouser)
  }

  const result = await dbService.getUserLevel(user_email)
  
  return {
    user_level: result.user_level,
    day: result.day,
    hasPlayedToday: result.hasPlayedToday
  }
}

export const saveUserStats = async (payload: UserStatsPayload) => {
  const { user_email, user_level, time_to_solve } = payload

  if (!user_email || !user_email.length || !user_level || !time_to_solve) {
    throw new CustomError(userError.validation.missingfield)
  }

  const result = await dbService.saveUserStats(payload)

  return result
}

export const getUserStats = async () => {
  const result = await dbService.getUserStats()

  return result
}

// Delete User
export const deleteUser = async (user_id: string) => {
  // Checks
  if (!user_id) {
    throw new CustomError(userError.validation.missingfield)
  }

  // User should be present
  const user = await findUserById(user_id)
  if (!user) {
    throw new CustomError(userError.db.nouser)
  }

  // Delete User
  const result = await dbService.deleteUser(user_id)

  if (result) {
    return { status: 'User deleted successfully' }
  }
  return { status: 'Not able to delete user data' }
}

// Get user data
export const findUserById = async (uid: string) => {
  // Checks
  if (!uid) {
    throw new CustomError(userError.validation.missingfield)
  }
  const user: any = await dbService.findUserById(uid)
  if (!user) {
    return
  }
  return user
}

export const findUserByEmail = async (email_id: string) => {
  // Checks
  if (!email_id) {
    throw new CustomError(userError.validation.missingfield)
  }

  const users: any = await dbService.findUserByEmail(email_id)
  if (!users || (users && !users.length)) {
    return
  }
  // Should be single record
  const user = users[0] || null
  return user
}

const createUserInputvalidation = async (
  payload: UserSignupPayLoad
) => {
  const { user_name_first, user_name_last, user_email, user_pswd } = payload

  if (!user_name_first || !user_name_last || !user_email || !user_pswd) {
    throw new CustomError(userError.auth.missingsignupdata)
  }
}
