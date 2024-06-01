<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2 class="mb-4 text-center">Riwayat Janji Temu</h2>
      <div class="row mb-3">
        <div class="col-md-4 mb-2">
          <input
            type="text"
            v-model="searchQuery"
            class="form-control"
            placeholder="Search by doctor name or date"
          />
        </div>
        <div class="col-md-3 mb-2">
          <select v-model="statusFilter" class="form-select">
            <option value="">All Status</option>
            <option value="dipesan">Dipesan</option>
            <option value="dibatalkan">Dibatalkan</option>
            <option value="selesai">Selesai</option>
          </select>
        </div>
        <div class="col-md-3 mb-2">
          <select v-model="sortOrder" class="form-select">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      <div v-if="filteredAppointments.length">
        <div v-for="appointment in filteredAppointments" :key="appointment.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ appointment.dokter }}</h5>
            <p class="card-text">
              <strong>Tanggal:</strong> {{ new Date(appointment.tanggal).toLocaleDateString() }}
            </p>
            <p class="card-text">
              <strong>Waktu:</strong> {{ appointment.hari }} - {{ appointment.waktu }}
            </p>
            <p class="card-text"><strong>Keluhan:</strong> {{ appointment.keterangan }}</p>
            <p class="card-text">
              <strong>Status:</strong>
              <span :class="statusClass(appointment.status)">{{ appointment.status }}</span>
            </p>
            <div class="d-flex justify-content-end">
              <button
                class="btn btn-warning me-2"
                @click="editAppointment(appointment)"
                v-if="appointment.status === 'dipesan'"
              >
                Edit
              </button>
              <button
                class="btn btn-danger"
                @click="cancelAppointment(appointment.id)"
                v-if="appointment.status === 'dipesan'"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Belum ada riwayat janji temu.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAppointmentStore } from '../stores/appointmentStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'

const appointmentStore = useAppointmentStore()
const router = useRouter()

const searchQuery = ref('')
const statusFilter = ref('')
const sortOrder = ref('newest')

const appointments = ref([])

onMounted(async () => {
  await appointmentStore.fetchAllAppointments()
  appointments.value = appointmentStore.appointments
})

const editAppointment = (appointment) => {
  router.push({ path: `/edit-appointment/${appointment.id}` })
}

const cancelAppointment = async (appointmentId) => {
  try {
    await appointmentStore.cancelAppointment(appointmentId)
    toast.success('Appointment canceled successfully!')
    appointments.value = appointments.value.filter((a) => a.id !== appointmentId)
  } catch (error) {
    toast.error('Failed to cancel appointment')
  }
}

const filteredAppointments = computed(() => {
  return appointments.value
    .filter(
      (appointment) =>
        (!statusFilter.value || appointment.status === statusFilter.value) &&
        (appointment.dokter.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          new Date(appointment.tanggal).toLocaleDateString().includes(searchQuery.value))
    )
    .sort((a, b) => {
      return sortOrder.value === 'newest'
        ? new Date(b.tanggal) - new Date(a.tanggal)
        : new Date(a.tanggal) - new Date(b.tanggal)
    })
})

const statusClass = (status) => {
  switch (status) {
    case 'dipesan':
      return 'badge bg-primary'
    case 'dibatalkan':
      return 'badge bg-danger'
    case 'selesai':
      return 'badge bg-success'
    default:
      return 'badge bg-secondary'
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: scale(1.02);
}
</style>
