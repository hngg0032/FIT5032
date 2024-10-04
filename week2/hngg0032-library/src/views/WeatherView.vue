<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
      </div>
      <button @click="searchByCity" class="search-button">Search</button>
    </div>
  </div>
  <main>
    <div v-if="weatherData">
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const apikey = 'c44d1fff4ca3ad479eae4cbd52ad54ea'

const city = ref('')
const weatherData = ref(null)

// Computed properties for temperature and weather icon URL
const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null
})

// Method to fetch current location weather
const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      await fetchWeatherData(url)
    })
  }
}

// Method to fetch weather data from the API
const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data // Store the API response data
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

// Fetch the weather data on component mount
onMounted(() => {
  fetchCurrentLocationWeather()
})

const searchByCity = async () => {
  if (city.value.trim()) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
    await fetchWeatherData(url)
  }
}
</script>
