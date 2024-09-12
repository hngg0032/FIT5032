import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { isAuthenticated } from '../auth/auth.js'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: AboutView,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated.value || localStorage.getItem('isAuthenticated') === 'true') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/firelogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/fireregister',
    name: 'FireRegister',
    component: FirebaseRegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
