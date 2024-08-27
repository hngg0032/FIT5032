<template>
  <div class="container mt-5">
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-sm-6">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" id="username" v-model="formData.username" />
          <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
        </div>
        <div class="col-sm-6">
          <!-- Password field -->
          <div class="col-sm-6">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="formData.password" />
          </div>
        </div>
      </div>
      <div class="row mb-3"></div>
      <div class="text-center">
        <button
          v-if="isAuthenticated"
          type="button"
          class="btn btn-primary me-2"
          @click="handleLogout"
        >
          Logout
        </button>
        <button v-else type="submit" class="btn btn-primary me-2">Login</button>
        <p v-if="errors.login" class="text-danger">{{ errors.login }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, login, logout } from '../auth/auth.js' // Import the login function

const router = useRouter()

const formData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  login: null
})

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
}

const submitForm = () => {
  handleLogin()
  clearForm()
}

const handleLogin = () => {
  console.log('login username', formData.value.username)
  console.log('login password', formData.value.password)

  let isLoginSuccessful = login(formData.value.username, formData.value.password)
  console.log('isloginsuccess', isLoginSuccessful)
  if (isLoginSuccessful) {
    errors.value.login = null
    router.push('/about') // Redirect to the About page after successful login
  } else {
    errors.value.login = 'Invalid username or password'
  }
}

const handleLogout = () => {
  console.log('Logout...')
  logout()
}
</script>
