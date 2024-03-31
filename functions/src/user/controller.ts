import { Request, Response } from 'express'
import * as constants from '../utils/constants'
import { AppError, AppSuccess } from '../utils/response'
import CustomError from '../utils/customError'
import { userError } from './error'
import { UserLevelUpdatePayload, UserSignupPayLoad } from './structs'
import * as service from './service'
import * as admin from 'firebase-admin'

/*
 * ======
 * USERS
 * ======
 */

export const createUser = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ createUser +++++++++++++++++++')
  try {
    // Validation
    const payload: UserSignupPayLoad = req.body

    const { user_name_first, user_name_last, user_email, user_pswd } = payload

    if (!user_name_first || !user_name_last || !user_email || !user_pswd) {
      throw new CustomError(userError.auth.missingsignupdata)
    }

    const newuser_id = await service.createUser(payload)

    const result = { uid: newuser_id }

    const success_response: AppSuccess = {
      status: constants.SUCCESS_MSG,
      code: constants.CREATE_SUCCESS_CODE,
      data: result
    }
    return res.status(constants.CREATE_SUCCESS_CODE).json(success_response)
  } catch (err) {
    return handleError(res, err)
  }
}

export const all = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ all users +++++++++++++++++++')
  try {
    const users = await service.fetchAllUsers()

    const success_response: AppSuccess = {
      status: constants.SUCCESS_MSG,
      code: constants.SUCCESS_CODE,
      data: users
    }
    return res.status(constants.SUCCESS_CODE).json(success_response)
  } catch (err) {
    return handleError(res, err)
  }
}

// Hard delete all user data by superadmin
export async function deleteUser (req: Request, res: Response) {
  console.log(
    '+++++++++++++++++++ delete User (Hard delete) +++++++++++++++++++'
  )
  try {
    // user id Check
    const { user_id } = req.params
    if (!user_id) {
      throw new CustomError(userError.validation.missingfield)
    }

    await admin.auth().deleteUser(user_id)
    await service.deleteUser(user_id)
    console.log('Successfully deleted user from firebase auth')

    const result = {
      status: 'Successfully deleted from Firebase'
    }

    const success_response: AppSuccess = {
      status: constants.SUCCESS_MSG,
      code: constants.SUCCESS_CODE,
      data: result
    }
    return res.status(constants.SUCCESS_CODE).json(success_response)
  } catch (err) {
    return handleError(res, err)
  }
}

export async function updateUserLevel (req: Request, res: Response) {
  console.log(
    '+++++++++++++++++++ Update User Level +++++++++++++++++++'
  )
  try {
    const payload: UserLevelUpdatePayload = req.body
    
    const result = await service.updateUserLevel(payload)

    const success_response: AppSuccess = {
      status: constants.SUCCESS_MSG,
      code: constants.SUCCESS_CODE,
      data: result
    }
    return res.status(constants.SUCCESS_CODE).json(success_response)
  } catch(err) {
    return handleError(res, err)
  }
}

export const getUserLevel = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ getUserLevel +++++++++++++++++++')
  try {
    const { user_email } = req.params

    const result = await service.getUserLevel(user_email)

    return res.status(constants.SUCCESS_CODE).json({level: result})
  } catch (err) {
    return handleError(res, err)
  }
}

export const saveUserStats = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ saveUserStats +++++++++++++++++++')
  try {
    return res.status(constants.CREATE_SUCCESS_CODE).send({message : "Data Saved Successfully!"})
  } catch (err) {
    return handleError(res, err)
  }
}

/* Private Functions */

const handleError = async (res: Response, err: any) => {
  const err_response: AppError = {
    status: constants.ERROR_MSG,
    code: constants.SERVER_ERROR_CODE,
    message: constants.SERVER_ERROR_MSG,
    data: null,
    name: constants.APP_ERROR
  }

  if (err.code) {
    err_response.code = err.code
  }
  if (err.message) {
    err_response.message = err.message
  }
  if (err.data) {
    err_response.data = err.data
  }
  if (err.name) {
    err_response.name = err.name
  }

  console.error('USER : ERROR ERROR ERROR !!')
  console.error(err_response)

  return res.status(constants.SERVER_ERROR_CODE).json(err_response)
}
