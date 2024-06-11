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
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link class="nav-link" to="/home">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/appointment-history"
                >Appointment History</router-link
              >
            </li>
          </template>
        </ul>
        <ul class="navbar-nav ms-auto">
          <template v-if="isAuthenticated">
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Welcome, {{ user.username }}
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <router-link class="dropdown-item dropdown-item-pointer" to="/profile"
                    >Profile Settings</router-link
                  >
                </li>
                <li><hr class="dropdown-divider" /></li>
                <li>
                  <button class="dropdown-item dropdown-item-pointer" @click="handleLogout">
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li v-if="isLoginPage" class="nav-item">
              <router-link class="btn btn-outline-light me-2" to="/register">Register</router-link>
            </li>
            <li v-if="isRegisterPage" class="nav-item">
              <router-link class="btn btn-outline-light me-2" to="/login">Login</router-link>
            </li>
            <li v-if="!isLoginPage && !isRegisterPage" class="nav-item">
              <router-link class="btn btn-outline-light me-2" to="/login">Login</router-link>
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
import { useRouter, useRoute } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'

const store = useDoctorStore()
const router = useRouter()
const route = useRoute()

const isAuthenticated = computed(() => store.isAuthenticated)
const user = computed(() => store.user)

const isLoginPage = computed(() => route.path === '/login')
const isRegisterPage = computed(() => route.path === '/register')

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

.dropdown-item-pointer {
  cursor: pointer;
}

.dropdown-item-pointer:hover {
  background-color: #f8f9fa;
  color: #20c997;
}
</style>
