import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
// import './style.css'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import { initializeApp } from 'firebase/app'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})
app.use(router)
app.mount('#app')

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
