import * as admin from 'firebase-admin'
import {
  UserSignupPayLoad,
  UserLevelUpdatePayload,
  UserStatsPayload
} from './structs'
import { userError } from './error'
import {
  db,
  COLLECTION,
  USER_FIELDS,
  USER_STATS_FIELDS
} from '../utils/firestore'
import CustomError from '../utils/customError'

/*
 * ======
 * USERS
 * ======
 */

export const createUser = async (
  payload: UserSignupPayLoad,
  firebaseUser: admin.auth.UserRecord
) => {
  const { uid, email, passwordHash } = firebaseUser
  const {
    user_name_first,
    user_name_last
  } = payload

  const newUserDocRef: FirebaseFirestore.DocumentReference = db
    .collection(COLLECTION.USERS)
    .doc(uid)

  const user = {
    // To-do: create user type
    [USER_FIELDS.USER_EMAIL]: email?.toLowerCase(),
    [USER_FIELDS.USER_NAME]: {
      [USER_FIELDS.FIRST_NAME]: user_name_first,
      [USER_FIELDS.LAST_NAME]: user_name_last
    },
    [USER_FIELDS.PASSWORD]: passwordHash || '',
    [USER_FIELDS.LEVEL]: 1,
    [USER_FIELDS.CREATED_TS]: new Date()
  }

  // Add User
  const newuserDoc = await newUserDocRef.set(user)
  return newuserDoc
}

export const fecthAllUsers = async () => {
  const users = db.collection(COLLECTION.USERS)
  const snapshot: FirebaseFirestore.QuerySnapshot = await users.orderBy(USER_FIELDS.USER_EMAIL, 'asc').get()

  const result: any[] = []
  for (const doc of snapshot.docs) {
    const data = doc.data()
    data.id = doc.id
    const user_details: any = {
      [USER_FIELDS.USER_EMAIL]: data.user_email,
      [USER_FIELDS.USER_NAME]: data.user_name,
      [USER_FIELDS.CREATED_TS]: data.created_ts,
      [USER_FIELDS.GUID]: data.id
    }

    result.push(user_details)
  }

  return result
}

export const deleteUser = async (user_id: string) => {
  if (!user_id || !user_id.length) {
    throw new CustomError(userError.validation.missingfield)
  }

  const result = await db.collection(COLLECTION.USERS).doc(user_id).delete()

  return result
}

export const updateUserLevel = async (payload: UserLevelUpdatePayload) => {
  const { user_id, user_level } = payload

  if (!user_id || !user_id.length || !user_level) {
    throw new CustomError(userError.validation.missingfield)
  }

  const update_data: any = {
    [USER_FIELDS.LEVEL]: user_level
  }

  // Update User Level
  const usersRef: FirebaseFirestore.WriteResult = await db
    .collection(COLLECTION.USERS)
    .doc(user_id)
    .update(update_data)

  return usersRef
}

export const saveUserStats = async (
  payload: UserStatsPayload
) => {
  const { user_email, time_to_solve, user_level } = payload

  const newUserStatDocRef: FirebaseFirestore.DocumentReference = db
    .collection(COLLECTION.USER_STATS)
    .doc()

  const user_stat = {
    [USER_STATS_FIELDS.USER_EMAIL]: user_email,
    [USER_STATS_FIELDS.USER_LEVEL]: user_level,
    [USER_STATS_FIELDS.TIME_TO_SOLVE]: time_to_solve,
    [USER_FIELDS.CREATED_TS]: new Date()
  }

  // Add User Stat
  const newUserStatDoc = await newUserStatDocRef.set(user_stat)
  return newUserStatDoc
}

export const getUserLevel = async (user_email: string) => {
  if (!user_email || !user_email.length) {
    throw new CustomError(userError.validation.missingfield)
  }

  const usersRef: FirebaseFirestore.CollectionReference = db.collection(
    COLLECTION.USERS
  )
  const query: FirebaseFirestore.Query = usersRef.where(
    USER_FIELDS.USER_EMAIL,
    '==',
    user_email.toLowerCase().trim()
  )
  const snapshot: FirebaseFirestore.QuerySnapshot = await query.get()

  if (snapshot.empty) {
    console.log(`No matching document of USERS with email as ${user_email}`)
    return
  }

  const result: any[] = []
  snapshot.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());
    const data = doc.data()
    data.uid = doc.id
    result.push(data)
  })

  return result[0]
}

export const findUserByEmail = async (email_id: string) => {
  if (!email_id) {
    throw new CustomError(userError.validation.missingfield)
  }

  const usersRef: FirebaseFirestore.CollectionReference = db.collection(
    COLLECTION.USERS
  )
  const query: FirebaseFirestore.Query = usersRef.where(
    USER_FIELDS.USER_EMAIL,
    '==',
    email_id.toLowerCase().trim()
  )
  const snapshot: FirebaseFirestore.QuerySnapshot = await query.get()

  if (snapshot.empty) {
    console.log(`No matching document of USERS with email as ${email_id}`)
    return
  }

  const result: any[] = []
  snapshot.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());
    const data = doc.data()
    data.uid = doc.id
    result.push(data)
  })

  return result
}

export const findUserById = async (uid: string) => {
  if (!uid) {
    throw new CustomError(userError.validation.missingfield)
  }

  const usersRef: FirebaseFirestore.DocumentReference = db
    .collection(COLLECTION.USERS)
    .doc(uid.trim())
  const userDoc: FirebaseFirestore.DocumentData = await usersRef.get()

  if (!userDoc.exists) {
    console.log(`No matching document of USERS for id as ${uid}`)
    return
  }

  const user = userDoc.data()
  user.user_id = userDoc.id

  return user
}
