import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import { routesConfig } from './routes'

const app: express.Application = express()

app.use(bodyParser.json())
app.use(cors({ origin: true }))
routesConfig(app)

export default app
