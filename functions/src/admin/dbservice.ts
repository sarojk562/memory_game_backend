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

export const getUserStats = async () => {
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

export const updateUserStats = async (entropyValue: number) => {
  const ref = db.collection(COLLECTION.ADMIN).doc('lXOgJqVGhsMWaioEBMPg');
  const snap = await ref.get();

  let stats = [];
  if (snap.exists) {
    const data = snap.data();
    if (Array.isArray(data?.entropy_stats)) {
      stats = data?.entropy_stats || [];
    }
  }

  // append the new reading
  stats.push(entropyValue);

  // write it back (merge in case you have other fields)
  await ref.set(
    { entropy_stats: stats },
    { merge: true }
  );

  return stats;
}