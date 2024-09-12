import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDys1Qo54GanZRgiI61Y_grspelW2wSjaA',
  authDomain: 'fit5032-library.firebaseapp.com',
  projectId: 'fit5032-library',
  storageBucket: 'fit5032-library.appspot.com',
  messagingSenderId: '1032924671368',
  appId: '1:1032924671368:web:6b1da3e1935a1d2ea25e3d'
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()
export default db
