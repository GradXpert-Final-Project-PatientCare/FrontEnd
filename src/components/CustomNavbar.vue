<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-teal shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold d-flex align-items-center" to="/home">
        <img src="@/assets/Logo_Patient_Care.png" alt="Logo" class="me-2" style="height: 40px" />
        PatientCare
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/appointment-history"
              >Appointment History</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new-appointment">Buat Janji</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <span class="nav-link">Welcome, {{ user.username }}</span>
            </li>
            <li class="nav-item">
              <button class="btn btn-outline-light me-2" @click="handleLogout">Logout</button>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link class="btn btn-outline-light me-2" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="btn btn-outline-light" to="/register">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'

const store = useDoctorStore()
const router = useRouter()

const isAuthenticated = computed(() => store.isAuthenticated)
const user = computed(() => store.user)

const handleLogout = () => {
  store.logout()
  router.push('/login')
}
</script>

<style scoped>
.nav-link {
  cursor: pointer;
}

.navbar {
  background-color: #20c997; /* Contoh warna teal */
}

.btn-outline-light {
  color: #f8f9fa;
  border-color: #f8f9fa;
}

.btn-outline-light:hover {
  color: #0d6efd;
  background-color: #f8f9fa;
  border-color: #f8f9fa;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>
