import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import application from './app'
import { init } from './utils/firestore'

// Initialise App
admin.initializeApp()
const db: FirebaseFirestore.Firestore = admin.firestore()
init(db)

const runtimeOpts: any = {
  timeoutSeconds: 540,
  memory: '2GB'
}

// HTTP Requests (Trigger)
export const app = functions.runWith(runtimeOpts).https.onRequest(application)
