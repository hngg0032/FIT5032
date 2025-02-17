<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">W5. Library Registration Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- Update this to sm size instead of md -->
            <div class="col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- Gender options -->
            <div class="col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                @change="validateGender"
              >
                <option value="" disabled selected>Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <!-- New Row for password and confirm password-->
          <div class="row mb-3">
            <!-- Password field -->
            <div class="col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <!-- Confirm password field -->
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                v-model="formData.confirmPassword"
                @blur="() => validateConfirmPassword(true)"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <!-- isAustralian radio button -->
            <div class="col-sm-6">
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="residentYes"
                  value="true"
                  v-model="formData.isAustralian"
                  @change="validateResident"
                />
                <label class="form-check-label" for="residentYes">Yes I'm Australian</label>
              </div>
              <div class="form-check">
                <input
                  type="radio"
                  class="form-check-input"
                  id="residentNo"
                  value="false"
                  v-model="formData.isAustralian"
                  @change="validateResident"
                />
                <label class="form-check-label" for="residentNo">No I'm not Australian</label>
              </div>
              <div v-if="errors.isAustralian" class="text-danger">{{ errors.isAustralian }}</div>
            </div>
          </div>
          <div class="mb-3">
            <!-- Reason for joining -->
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @input="validateReason"
            ></textarea>
            <div
              v-if="errors.reason"
              v-bind:class="
                errors.reason === 'Great to have a friend!' ? 'text-success' : 'text-danger'
              "
            >
              {{ errors.reason }}
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Suburb</label>
            <input type="text" class="form-control" id="suburb" v-bind:value="formData.suburb" />
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
        <div class="row mt-5" v-if="submittedCards.length">
          <DataTable :value="submittedCards">
            <Column field="username" header="Username"></Column>
            <Column field="password" header="Password"></Column>
            <Column field="isAustralian" header="Australian Resident"></Column>
            <Column field="gender" header="Gender"></Column>
            <Column field="reason" header="Reason"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: null,
  reason: '',
  gender: '',
  confirmPassword: '',
  suburb: ''
})

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
  isAustralian: null,
  confirmPassword: null
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)
  validateConfirmPassword(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.isAustralian &&
    !errors.value.gender &&
    !errors.value.reason &&
    !errors.value.confirmPassword
  ) {
    submittedCards.value.push({
      ...formData.value
    })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: null,
    reason: '',
    gender: null,
    confirmPassword: '',
    suburb: ''
  }
}

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateResident = () => {
  if (formData.value.isAustralian === null) {
    errors.value.isAustralian = 'Please select if you are an Australian resident.'
  } else {
    errors.value.isAustralian = null
  }
}

const validateGender = () => {
  if (formData.value.gender === '') {
    errors.value.gender = 'Please select your gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = () => {
  if (formData.value.reason.trim().length < 10) {
    errors.value.reason = 'Please provide a reason for joining with at least 10 characters.'
  } else if (formData.value.reason.trim().toLowerCase().includes('friend')) {
    errors.value.reason = 'Great to have a friend!'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
