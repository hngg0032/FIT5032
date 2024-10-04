import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import { isAuthenticated, currentRole } from '../auth/auth.js'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import User1View from '@/views/User1View.vue'
import User2View from '@/views/User2View.vue'
import LogOutView from '@/views/LogOutView.vue'
import AddBookView from '@/views/AddBookView.vue'
import WeatherView from '@/views/WeatherView.vue'
import GetBookCountView from '@/views/GetBookCountView.vue'
import CountBookAPI from '@/views/CountBookAPI.vue'
import GetAllBookAPI from '@/views/GetAllBookAPI.vue'

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
  },
  {
    path: '/user1',
    name: 'User1',
    component: User1View,
    beforeEnter: (to, from, next) => {
      console.log('Trying to go to /user1', currentRole)
      if (currentRole.value === 'user1' || localStorage.getItem('currentRole') === 'user1') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/user2',
    name: 'User2',
    component: User2View,
    beforeEnter: (to, from, next) => {
      if (currentRole.value === 'user2' || localStorage.getItem('currentRole') === 'user2') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: LogOutView
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView
  },
  {
    path: '/WeatherCheck',
    name: 'WeatherCheck',
    component: WeatherView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
    path: '/CountBookAPI',
    name: 'CountBookAPI',
    component: CountBookAPI
  },
  {
    path: '/GetAllBookAPI',
    name: 'GetAllBookAPI',
    component: GetAllBookAPI
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
