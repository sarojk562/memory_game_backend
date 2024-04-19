import { Router, Request, Response } from 'express'
import {
  getUserLevel
} from './controller'

const router = Router()

router.use((req: Request, res: Response, next: Function) => {
  console.log('* Route : USERS')
  console.log(req.originalUrl)
  next()
})

/*
 * ===========
 * ADMIN ROUTES
 * ===========
 */

// get user level
router.get('/getUserLevel', [getUserLevel])

export default router
