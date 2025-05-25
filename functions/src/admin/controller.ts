import { Request, Response } from 'express'
import * as constants from '../utils/constants'
import { AppError, AppSuccess } from '../utils/response'
import * as service from './service'

/*
 * ======
 * ADMIN
 * ======
 */

export const getUserLevel = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ getUserLevel +++++++++++++++++++')
  try {
    const result = await service.getUserLevel()
    
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

export const getUserStats = async (req: Request, res: Response) => {
  console.log('+++++++++++++++++++ getUserStats +++++++++++++++++++')

  const user_level = req.query.user_level
  if (typeof user_level !== 'string') {
    return handleError(res, { message: 'Invalid or missing user_level parameter', code: 400 })
  }

  try {
    const result = await service.getUserStats(user_level)
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
