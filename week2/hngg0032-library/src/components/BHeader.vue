<template>
  <!-- Using Bootstrap's Header template (starter code) -->
  <!-- https://getbootstrap.com/docs/5.0/examples/headers/ -->
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home (Week 5)</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <!-- Logout option for authenticated users -->
        <!-- <li class="nav-item">
          <router-link v-if="!isAuthenticated" to="/login" class="nav-link" active-class="active">
            Login
          </router-link>
          <a v-else href="#" class="nav-link" @click="handleLogout"> Logout </a>
        </li> -->
        <li class="nav-item">
          <router-link to="/firelogin" class="nav-link" active-class="active">
            Firebase Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/fireregister" class="nav-link" active-class="active">
            Firebase Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            v-if="currentRole === 'user1'"
            to="/user1"
            class="nav-link"
            active-class="active"
          >
            User1
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            v-if="currentRole === 'user2'"
            to="/user2"
            class="nav-link"
            active-class="active"
          >
            User2
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/logout" class="nav-link" active-class="active"
            >Firebase Logout</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/addbook" class="nav-link" active-class="active"> Add Book </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { currentRole } from '@/auth/auth'

onMounted(() => {
  const storedRole = localStorage.getItem('userRole')
  if (storedRole) {
    currentRole.value = storedRole
  }
})
</script>
