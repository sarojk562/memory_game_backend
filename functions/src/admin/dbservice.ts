import {
  db,
  COLLECTION
} from '../utils/firestore'

/*
 * ======
 * ADMIN
 * ======
 */

export const getUserLevel = async () => {
  const adminRef: FirebaseFirestore.CollectionReference = db.collection(
    COLLECTION.ADMIN
  )
  const query: FirebaseFirestore.Query = adminRef.where(
    'user_email',
    '==',
    'sarojpokkula@gmail.com'
  )
  const snapshot: FirebaseFirestore.QuerySnapshot = await query.get()

  if (snapshot.empty) {
    console.log(`No matching document of USERS with email as sarojpokkula@gmail.com`)
    return
  }

  const result: any[] = []
  snapshot.forEach((doc) => {
    // console.log(doc.id, '=>', doc.data());
    const data = doc.data()
    data.uid = doc.id
    result.push(data)
  })

  return result[0]
}
