import { ref } from 'vue'
import credentialsData from './credentials.json'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'

export const isAuthenticated = ref(false)

export const currentUser = ref({})

export const currentRole = ref({})

// Login function to validate credentials
export const login = (inputUsername, inputPassword) => {
  console.log('json', credentialsData)
  console.log('username login', inputUsername)
  console.log('username password', inputPassword)

  console.log('credentialsData user', credentialsData['username'])

  console.log('credentialsData password', credentialsData['password'])

  if (
    inputUsername === credentialsData['username'] &&
    inputPassword === credentialsData['password']
  ) {
    isAuthenticated.value = true
    return true
  } else {
    isAuthenticated.value = false
    return false
  }
}

// Logout function
export const logout = () => {
  isAuthenticated.value = false
  return true
}

// Login with Firebase
export const loginWithFirebase = async (email, password) => {
  const db = getFirestore()
  const auth = getAuth()

  try {
    console.log('Logging in with firebase...')
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log(user)

    // Fetch the user's role from Firestore using their UID
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      currentRole.value = userData.role
    }

    // Save user role to local storage
    localStorage.setItem('userRole', currentRole.value)

    // Save local values
    isAuthenticated.value = true
    currentUser.value = user
    return true
  } catch (error) {
    isAuthenticated.value = false
    currentUser.value = null
    throw error
  }
}

// Register with Firebase
export const registerWithFirebase = async (email, password, role) => {
  const db = getFirestore()
  const auth = getAuth()

  try {
    console.log('Registering with firebase...')
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    console.log(user)
    // Save the user’s role in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: email,
      role: role
    })

    // Save user role to local storage
    localStorage.setItem('userRole', role)
    currentRole.value = role

    // Save local values
    isAuthenticated.value = true
    currentUser.value = user
    return true
  } catch (error) {
    isAuthenticated.value = false
    currentUser.value = null
    throw error
  }
}

// Logout with Firebase
export const logoutWithFirebase = async () => {
  const auth = getAuth()

  try {
    await signOut(auth)
    console.log('User signed out successfully.')

    // Clear any local storage related to user
    localStorage.removeItem('userRole')
    isAuthenticated.value = false
    currentUser.value = null
    currentRole.value = null
  } catch (error) {
    console.error('Error during logout:', error)
    isAuthenticated.value = false
  }
}
