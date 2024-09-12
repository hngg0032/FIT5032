<template>
  <div class="container">
    <h1>Manage Books</h1>

    <!-- Add Book Form -->
    <form @submit.prevent="addBook">
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>

      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>

      <button type="submit" class="btn btn-primary mt-2">Add Book</button>
    </form>

    <!-- Update Book Section -->
    <h2>Update Book</h2>
    <div class="form-group">
      <label for="update-book-id">Book ID (for update):</label>
      <input type="text" v-model="updateBookId" id="update-book-id" class="form-control" required />
    </div>

    <div class="form-group">
      <label for="new-book-name">New Book Name:</label>
      <input type="text" v-model="newBookName" id="new-book-name" class="form-control" required />
    </div>

    <button @click="updateBook(updateBookId, { name: newBookName })" class="btn btn-warning mt-2">
      Update Book
    </button>

    <!-- Delete Book Section -->
    <h2>Delete Book</h2>
    <div class="form-group">
      <label for="delete-book-id">Book ID (for delete):</label>
      <input type="text" v-model="deleteBookId" id="delete-book-id" class="form-control" required />
    </div>
    <button @click="deleteBook(deleteBookId)" class="btn btn-danger mt-2">Delete Book</button>

    <BookList />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import db from '../firebase/init.js'
import { collection, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore'

import BookList from '../components/BookList.vue'

const isbn = ref('')
const name = ref('')
const newBookName = ref('')
const updateBookId = ref('')
const deleteBookId = ref('')

const addBook = async () => {
  try {
    const isbnNumber = Number(isbn.value)
    if (isNaN(isbnNumber)) {
      alert('ISBN must be a valid number')
      return
    }

    await addDoc(collection(db, 'books'), {
      isbn: isbnNumber,
      name: name.value
    })

    isbn.value = ''
    name.value = ''
    alert('Book added successfully!')
  } catch (error) {
    console.error('Error adding book: ', error)
  }
}

const updateBook = async (bookId, updatedData) => {
  try {
    const bookRef = doc(db, 'books', bookId)
    await updateDoc(bookRef, updatedData)
    alert('Book updated successfully!')
    updateBookId.value = null
    newBookName.value = null
  } catch (error) {
    console.error('Error updating book:', error)
  }
}

const deleteBook = async (bookId) => {
  try {
    const bookRef = doc(db, 'books', bookId)
    await deleteDoc(bookRef)
    alert('Book deleted successfully!')
    deleteBookId.value = null
  } catch (error) {
    console.error('Error deleting book:', error)
  }
}
</script>
