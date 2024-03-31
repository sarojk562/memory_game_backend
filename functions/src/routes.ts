import { Application } from 'express'
import testRouter from './test/routes'
import userRouter from './user/routes'

export const routesConfig = (app: Application) => {
  app.use('/test', testRouter)
  app.use('/user', userRouter)
}
