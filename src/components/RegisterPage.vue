<template>
  <div>
    <NavbarLogReg />

    <div class="wrapper">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="text-center mt-4 name">Register</div>
      <form class="p-3 mt-3" @submit.prevent="register">
        <div class="form-field d-flex align-items-center">
          <span class="far fa-user"></span>
          <input
            type="text"
            v-model="formData.username"
            id="username"
            placeholder="Username"
            required
          />
        </div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-envelope"></span>
          <input
            type="email"
            v-model="formData.email"
            id="email"
            placeholder="Email Address"
            required
          />
        </div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-key"></span>
          <input
            type="password"
            v-model="formData.password"
            id="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-key"></span>
          <input
            type="password"
            v-model="formData.confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div class="form-field d-flex align-items-center">
          <span class="fas fa-phone"></span>
          <input
            type="text"
            v-model="formData.phoneNumber"
            id="phone"
            placeholder="Phone Number"
            required
          />
        </div>
        <button class="btn mt-3">Register</button>
      </form>
      <div class="text-center fs-6">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'
import { toast } from 'vue3-toastify'
import NavbarLogReg from './NavbarLogReg.vue'

const router = useRouter()
const store = useDoctorStore()

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: ''
})

const register = async () => {
  if (formData.value.password !== formData.value.confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  try {
    await store.register(formData.value)
    toast.success('Registration successful')
    router.push('/home')
  } catch (error) {
    toast.error('Registration failed: ' + error.response.data.message)
  }
}
</script>

<style scoped>
/* Importing fonts from Google */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

/* Reseting */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  background: #ecf0f3;
}

.wrapper {
  max-width: 350px;
  min-height: 500px;
  margin: 80px auto;
  padding: 40px 30px 30px 30px;
  background-color: #ecf0f3;
  border-radius: 15px;
  box-shadow:
    13px 13px 20px #cbced1,
    -13px -13px 20px #fff;
}

.logo {
  width: 80px;
  margin: auto;
}

.logo img {
  width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow:
    0px 0px 3px #5f5f5f,
    0px 0px 0px 5px #ecf0f3,
    8px 8px 15px #a7aaa7,
    -8px -8px 15px #fff;
}

.wrapper .name {
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: 1.3px;
  padding-left: 10px;
  color: #555;
}

.wrapper .form-field input {
  width: 100%;
  display: block;
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
}

.wrapper .form-field select {
  width: calc(100% - 20px);
  border: none;
  outline: none;
  background: none;
  font-size: 1.2rem;
  color: #666;
  padding: 10px 15px 10px 10px;
}

.wrapper .form-field {
  padding-left: 10px;
  margin-bottom: 20px;
  border-radius: 20px;
  box-shadow:
    inset 8px 8px 8px #cbced1,
    inset -8px -8px 8px #fff;
}

.wrapper .form-field .fas {
  color: #555;
}

.wrapper .btn {
  box-shadow: none;
  width: 100%;
  height: 40px;
  background-color: #03a9f4;
  color: #fff;
  border-radius: 25px;
  box-shadow:
    3px 3px 3px #b1b1b1,
    -3px -3px 3px #fff;
  letter-spacing: 1.3px;
}

.wrapper .btn:hover {
  background-color: #039be5;
}

.wrapper a {
  text-decoration: none;
  font-size: 0.8rem;
  color: #03a9f4;
}

.wrapper a:hover {
  color: #039be5;
}

.wrapper .check-label {
  font-size: 0.8rem;
  color: #666;
  padding-left: 5px;
}

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}
</style>
