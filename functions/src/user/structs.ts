import { USER_FIELDS, USER_STATS_FIELDS } from '../utils/firestore'

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

export interface UserStatsPayload {
  [USER_STATS_FIELDS.USER_EMAIL]: string
  [USER_STATS_FIELDS.USER_LEVEL]: number
  [USER_STATS_FIELDS.TIME_TO_SOLVE]: number
}

export interface FirebaseUserPayload {
  displayName: string
  password: string
  email: string
}
