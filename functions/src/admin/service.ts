import * as dbService from './dbservice'

/*
 * ======
 * ADMIN
 * ======
 */

export const getUserLevel = async () => {
  const result = await dbService.getUserLevel()
  
  return {
    user_level: result.user_level
  }
}