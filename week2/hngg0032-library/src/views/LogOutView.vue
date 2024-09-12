<template>
  <div>
    <h1>Logout</h1>
    <p>Are you sure you want to log out?</p>
    <button @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { currentUser, logoutWithFirebase } from '@/auth/auth'

// Initialize router
const router = useRouter()

// Logout function
const logoutUser = async () => {
  try {
    // Call the logout function from auth.js
    await logoutWithFirebase()

    // Redirect to login page after logout
    router.push('/')
    console.log(currentUser)
  } catch (error) {
    console.error('Error during logout:', error)
  }
}
</script>
