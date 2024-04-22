import { Router, Request, Response } from 'express'
import {
  all,
  createUser,
  deleteUser,
  getUserLevel,
  saveUserStats,
  updateUserLevel,
  getUserStats
} from './controller'

const router = Router()

router.use((req: Request, res: Response, next: Function) => {
  console.log('* Route : USERS')
  console.log(req.originalUrl)
  next()
})

/*
 * ===========
 * USER ROUTES
 * ===========
 */

// create user
router.post('/', [createUser])

router.post('/updateUserLevel', [updateUserLevel])

// User delete with all its corresponsding data
router.delete('/delete/:user_id', [deleteUser])

// lists all users
router.get('/all', [all])

// get user level
router.get('/getUserLevel/:user_email', [getUserLevel])

// save user level stats
router.post('/saveUserStats', [saveUserStats])

// get user level stats
router.get('/get_all', [getUserStats])

export default router
