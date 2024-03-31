/* Firestore database */

export let db: FirebaseFirestore.Firestore
export const init = (database: FirebaseFirestore.Firestore) => {
  db = database
}

/* DB Collections Name */
export const enum COLLECTION {
  USERS = 'Users',
  USER_STATS = 'User_stats'
}

// User Fields
export const enum USER_FIELDS {
  GUID = 'guid',
  USER_EMAIL = 'user_email',
  USER_NAME = 'user_name',
  FIRST_NAME = 'user_name_first',
  LAST_NAME = 'user_name_last',
  PASSWORD = 'user_pswd',
  LEVEL = 'user_level',
  CREATED_TS = 'created_ts'
}

// User Stats Fields
export const enum USER_STATS_FIELDS {
  USER_EMAIL = 'user_email',
  USER_GUID = 'user_guid',
  USER_LEVEL = 'user_level',
  TIME_TO_SOLVE = 'time_to_solve',
  CREATED_TS = 'created_ts',
}