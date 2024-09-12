<template>
  <h1>Sign in</h1>
  <p><input type="text" placeholder="Email" v-model="email" /></p>
  <p><input type="password" placeholder="Password" v-model="password" /></p>

  <p><button @click="signin">Signin to Firebase</button></p>
  <p v-if="errorMessage" style="color: red">{{ errorMessage }}</p>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginWithFirebase, currentRole } from '@/auth/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const errorMessage = ref('')

const signin = async () => {
  try {
    console.log('email', email)

    let isFirebaseLoginSuccess = await loginWithFirebase(email.value, password.value)

    if (isFirebaseLoginSuccess) {
      console.log('Firebase Login Successful!')
      errorMessage.value = null
      if (currentRole === 'user1') {
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
