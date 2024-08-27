import { ref } from 'vue'
import credentialsData from './credentials.json'

export const isAuthenticated = ref(false)

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
