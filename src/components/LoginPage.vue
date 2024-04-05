<template>
  <div class="wrapper">
    <div class="logo">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div class="text-center mt-4 name">PatientCare App</div>
    <form class="p-3 mt-3" @submit.prevent="login">
      <div class="form-field d-flex align-items-center">
        <span class="far fa-user"></span>
        <input type="text" v-model="username" placeholder="Username" />
      </div>
      <div class="form-field d-flex align-items-center">
        <span class="fas fa-key"></span>
        <input type="password" v-model="password" placeholder="Password" />
      </div>
      <button class="btn mt-3">Login</button>
    </form>
    <div class="text-center fs-6">
      <router-link to="/forgot-password">Forget password?</router-link> or
      <router-link v-if="!isAuthenticated" to="/register">Sign up</router-link>
      <router-link v-else to="/home">Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const isAuthenticated = ref(false) // Tandai apakah pengguna telah terautentikasi
const username = ref('')
const password = ref('')

const login = () => {
  // Logic untuk proses login
  // Contoh sederhana: hanya menetapkan isAuthenticated menjadi true
  isAuthenticated.value = true
  // Redirect ke halaman dashboard jika login berhasil
  router.push('/home')
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
  /* border: 1px solid red; */
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

@media (max-width: 380px) {
  .wrapper {
    margin: 30px 20px;
    padding: 40px 15px 15px 15px;
  }
}
</style>
