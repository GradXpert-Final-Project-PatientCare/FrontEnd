<!-- Homepage.vue -->
<template>
  <div>
    <Navbar />
    <div class="container mt-4">
      <div class="row justify-content-center mb-2">
        <!-- Search Bar -->
        <div class="col-md-8">
          <input
            type="text"
            v-model="searchQuery"
            class="form-control mb-3"
            placeholder="Search by name..."
          />
        </div>
        <!-- Filter and Sort Options -->
        <div class="col-md-8 d-flex justify-content-between mb-3">
          <select v-model="filterBySpecialty" class="form-select">
            <option value="">All Specialties</option>
            <option value="cardiology">Cardiology</option>
            <option value="neurology">Neurology</option>
            <option value="pediatrics">Pediatrics</option>
            <!-- Add more specialties as needed -->
          </select>
          <select v-model="sortBy" class="form-select">
            <option value="name">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-center mb-2">
        <div class="col-md-4" v-for="doctor in sortedAndFilteredDoctors" :key="doctor.id">
          <div
            class="card mx-auto my-3"
            style="
              width: 18rem;
              box-shadow:
                rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
                rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            "
          >
            <img :src="doctor.image" class="card-img-top" alt="Image" />
            <div class="card-body text-center">
              <h5 class="card-title">{{ doctor.name }}</h5>
              <p class="card-text">{{ doctor.specialty }}</p>
              <div class="d-block text-center mb-2">
                <p class="card-text badge bg-primary text-wrap" style="width: 6rem">
                  {{ doctor.experience }} Tahun
                </p>
              </div>
              <div class="d-block text-center">
                <router-link
                  :to="{ name: 'detail', params: { id: doctor.id } }"
                  class="btn btn-primary"
                  >Detail</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDoctorStore } from '../stores/doctorStore'
import { toast } from 'vue3-toastify'
import Navbar from '../components/CustomNavbar.vue' // Pastikan path ini sesuai dengan struktur proyek kamu

const store = useDoctorStore()

const searchQuery = ref('')
const sortBy = ref('name') // Default sorting by name
const filterBySpecialty = ref('')

// Fetch doctors on component mount
onMounted(() => {
  store.fetchDoctors().catch(() => {
    toast.error('Failed to fetch doctors')
  })
})

// Computed property for filtered and sorted doctors
const sortedAndFilteredDoctors = computed(() => {
  let filteredDoctors = store.doctors

  // Filter by specialty
  if (filterBySpecialty.value) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.specialty.toLowerCase().includes(filterBySpecialty.value.toLowerCase())
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Sort by selected criteria
  return filteredDoctors.sort((a, b) => {
    if (sortBy.value === 'name') {
      return a.name.localeCompare(b.name)
    } else if (sortBy.value === 'experience') {
      return b.experience - a.experience
    }
    return 0
  })
})
</script>

<style scoped>
/* Add any necessary styling here */
</style>
