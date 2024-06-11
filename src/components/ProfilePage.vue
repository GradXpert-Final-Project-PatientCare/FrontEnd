<template>
  <Navbar />
  <div class="container mt-5">
    <div class="card shadow-lg" style="border-radius: 10px; background-color: #e0f7fa">
      <div class="card-header text-white" style="background-color: #00796b">
        <h1 class="mb-0">User Profile</h1>
      </div>
      <div class="card-body">
        <div v-if="userProfile">
          <p class="mb-2">
            <strong>Username: </strong>
            <span :class="{ 'text-muted': !userProfile.username }">{{
              userProfile.username || 'Username Data Empty'
            }}</span>
          </p>
          <p class="mb-2">
            <strong>Email: </strong>
            <span :class="{ 'text-muted': !userProfile.email }">{{
              userProfile.email || 'Email Data Empty'
            }}</span>
          </p>
          <p class="mb-2">
            <strong>Phone Number: </strong>
            <span :class="{ 'text-muted': !userProfile.phoneNumber }">{{
              userProfile.phoneNumber || 'Phone Number Data Empty'
            }}</span>
          </p>
          <p class="mb-2">
            <strong>Role: </strong>
            <span :class="{ 'text-muted': !userProfile.role }">{{
              userProfile.role || 'Role Data Empty'
            }}</span>
          </p>
        </div>
        <div v-else>
          <p class="text-muted">Loading profile...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useDoctorStore } from '../stores/doctorStore'
import Navbar from '../components/CustomNavbar.vue'

const doctorStore = useDoctorStore()

onMounted(() => {
  doctorStore.fetchUserProfile()
})

const userProfile = computed(() => doctorStore.userProfile)
</script>

<style scoped>
.text-muted {
  color: #6c757d !important; /* Adjust the color to a lighter grey if needed */
}
</style>
