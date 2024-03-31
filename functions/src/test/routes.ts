import { Router, Request, Response } from 'express'
const router = Router()

router.get('/serverstatus', async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      data: {
        message: 'Server is running from test route!!'
      }
    })
  } catch (err) {
    return res.status(500).json({
      data: {
        message: 'Server is not responding'
      }
    })
  }
})

export default router
