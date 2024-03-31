import { USER_FIELDS } from '../utils/firestore'

/* USER */

export interface UserSignupPayLoad {
  [USER_FIELDS.FIRST_NAME]: string
  [USER_FIELDS.LAST_NAME]: string
  [USER_FIELDS.USER_EMAIL]: string
  [USER_FIELDS.PASSWORD]: string
  [USER_FIELDS.LEVEL]: number
  [USER_FIELDS.GUID]: string
}

export interface UserLevelUpdatePayload {
  user_id: string
  [USER_FIELDS.USER_EMAIL]: string
  [USER_FIELDS.LEVEL]: number
}

export interface FirebaseUserPayload {
  displayName: string
  password: string
  email: string
}
