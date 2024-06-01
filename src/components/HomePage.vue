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
            @input="fetchDoctors"
            class="form-control mb-3"
            placeholder="Search by name..."
          />
        </div>
        <!-- Filter and Sort Options -->
        <div class="col-md-8 d-flex justify-content-between mb-3">
          <select v-model="filterBySpecialty" class="form-select" @change="fetchDoctors">
            <option value="">All Specialties</option>
            <option value="Sp. Mata">Sp. Mata</option>
            <option value="Sp. Jantung">Sp. Jantung</option>
            <option value="Sp. Jiwa">Sp. Jiwa</option>
            <!-- Add more specialties as needed -->
          </select>
          <select v-model="sortBy" class="form-select" @change="fetchDoctors">
            <option value="nama">Sort by Name</option>
            <option value="experience">Sort by Experience</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-center mb-2">
        <div
          class="col-lg-4 col-md-6 col-sm-12"
          v-for="doctor in sortedAndFilteredDoctors"
          :key="doctor.id"
        >
          <div
            class="card mx-auto my-3"
            style="
              width: 100%;
              box-shadow:
                rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
                rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
            "
          >
            <div
              class="img-container"
              :style="{ backgroundImage: `url(${doctor.image_url})` }"
            ></div>
            <div class="card-body text-center">
              <h5 class="card-title">{{ doctor.nama }}</h5>
              <p class="card-text">{{ doctor.spesialis }}</p>
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
      <!-- Pagination Controls -->
      <div class="row justify-content-center mb-4">
        <div class="col-md-8 d-flex justify-content-center">
          <button
            class="btn btn-secondary me-2"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
          >
            Previous
          </button>
          <span class="align-self-center">{{ currentPage }} / {{ totalPages }}</span>
          <button
            class="btn btn-secondary ms-2"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDoctorStore } from '../stores/doctorStore'
import { toast } from 'vue3-toastify'
import Navbar from '../components/CustomNavbar.vue'

const store = useDoctorStore()

const searchQuery = ref('')
const sortBy = ref('nama') // Default sorting by name
const filterBySpecialty = ref('')
const currentPage = ref(1)
const pageSize = 5

const fetchDoctors = async () => {
  try {
    await store.fetchDoctors(currentPage.value, searchQuery.value)
  } catch (error) {
    toast.error('Failed to fetch doctors')
  }
}

// Fetch doctors on component mount
onMounted(() => {
  fetchDoctors()
})

// Computed property for filtered and sorted doctors
const sortedAndFilteredDoctors = computed(() => {
  let filteredDoctors = store.doctors

  // Filter by specialty
  if (filterBySpecialty.value) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.spesialis.toLowerCase().includes(filterBySpecialty.value.toLowerCase())
    )
  }

  // Filter by search query
  if (searchQuery.value) {
    filteredDoctors = filteredDoctors.filter((doctor) =>
      doctor.nama.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Ensure filteredDoctors is an array before sorting
  if (Array.isArray(filteredDoctors)) {
    // Sort by selected criteria
    return filteredDoctors.sort((a, b) => {
      if (sortBy.value === 'nama') {
        return a.nama.localeCompare(b.nama)
      } else if (sortBy.value === 'experience') {
        return b.experience - a.experience
      }
      return 0
    })
  } else {
    return []
  }
})

const totalPages = computed(() => Math.ceil(store.totalDoctors / pageSize))

const changePage = (page) => {
  currentPage.value = page
  fetchDoctors()
}
</script>

<style scoped>
.img-container {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
}

.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}
</style>
