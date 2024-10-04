<template>
  <div>
    <h1>Books with ISBN > 1000</h1>

    <ul>
      <li v-for="book in books" :key="book.id">
        {{ book.name }} - ISBN: {{ book.isbn }} - Book id: {{ book.id }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import db from '../firebase/init.js'

const books = ref([])

// const fetchBooks = async () => {
//   try {
//     // Define the query: filter ISBN > 1000, order by ISBN, and limit to 5 results
//     const requiredQuery = query(
//       collection(db, 'books'),
//       where('isbn', '>', 1000),
//       orderBy('isbn', 'asc')
//     )

//     const querySnapshot = await getDocs(requiredQuery)
//     const booksArray = []
//     querySnapshot.forEach((doc) => {
//       booksArray.push({ id: doc.id, ...doc.data() })
//     })

//     books.value = booksArray
//   } catch (error) {
//     console.error('Error fetching books: ', error)
//   }
// }

const fetchBooks = async () => {
  try {
    const requiredQuery = query(collection(db, 'books'), orderBy('isbn', 'asc'))

    const querySnapshot = await getDocs(requiredQuery)
    const booksArray = []
    querySnapshot.forEach((doc) => {
      booksArray.push({ id: doc.id, ...doc.data() })
    })

    books.value = booksArray
  } catch (error) {
    console.error('Error fetching books: ', error)
  }
}

onMounted(() => {
  fetchBooks()
})
</script>
