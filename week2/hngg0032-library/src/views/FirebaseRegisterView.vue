<template>
  <h1>Create an Account</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>
  <p>
    <label for="role">Select Role:</label>
    <select id="role" v-model="selectedRole">
      <option value="user1">User Role 1</option>
      <option value="user2">User Role 2</option>
    </select>
  </p>
  <!-- Error message display -->
  <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
  <p><button @click="register">Save to Firebase</button></p>
</template>

<script setup>
import { ref } from 'vue'
import { registerWithFirebase } from '@/auth/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const selectedRole = ref('user1')
const errorMessage = ref('')

const register = async () => {
  try {
    console.log('email', email)

    let isFirebaseRegisterSuccess = await registerWithFirebase(
      email.value,
      password.value,
      selectedRole.value
    )
    if (isFirebaseRegisterSuccess) {
      console.log('Firebase Register Successful!')
      errorMessage.value = null
      if (selectedRole.value === 'user1') {
        router.push('/user1')
      } else {
        router.push('user2')
      }
    }
  } catch (error) {
    errorMessage.value = error
    console.log(error)
  }
}
</script>
