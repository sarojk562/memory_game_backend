import { Application } from 'express'
import testRouter from './test/routes'
import userRouter from './user/routes'
import adminRouter from './admin/routes'

export const routesConfig = (app: Application) => {
  app.use('/test', testRouter)
  app.use('/user', userRouter)
  app.use('/admin', adminRouter)
}
