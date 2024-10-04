<template>
  <pre>{{ jsondata }}</pre>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const error = ref(null)
const jsondata = ref(null)

onMounted(() => {
  getBookCountAPI()
})

const getBookCountAPI = async () => {
  try {
    const response = await axios.get('https://countbooks-kgpzfdsq4a-uc.a.run.app')
    jsondata.value = response.data
    error.value = null
  } catch (error) {
    console.log(error)
    error.value = error
  }
}
</script>
