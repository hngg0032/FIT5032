<template>
  <div class="container">
    <h1>All Books (JSON Format)</h1>
    <pre>{{ booksJSON }}</pre>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import db from '../firebase/init.js'

const booksJSON = ref(null)
const books = ref([])

const fetchBooks = async () => {
  try {
    const requiredQuery = query(collection(db, 'books'), orderBy('isbn', 'asc'))
    const querySnapshot = await getDocs(requiredQuery)
    books.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    booksJSON.value = JSON.stringify(books.value, null, 2)
  } catch (error) {
    console.error('Error fetching books:', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>
