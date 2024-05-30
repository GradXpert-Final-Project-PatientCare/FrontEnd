<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2>Riwayat Janji Temu</h2>
      <div v-if="appointments.length">
        <div v-for="appointment in appointments" :key="appointment.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ appointment.dokter }}</h5>
            <p class="card-text">
              Tanggal: {{ new Date(appointment.tanggal).toLocaleDateString() }}
            </p>
            <p class="card-text">Waktu: {{ appointment.hari }} - {{ appointment.waktu }}</p>
            <p class="card-text">Keluhan: {{ appointment.keterangan }}</p>
            <p class="card-text">Status: {{ appointment.status }}</p>
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
      <div v-else>
        <p>Belum ada riwayat janji temu.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAppointmentStore } from '../stores/appointmentStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'

const appointmentStore = useAppointmentStore()
const router = useRouter()

const appointments = ref([])

onMounted(async () => {
  await appointmentStore.fetchAllAppointments()
  appointments.value = appointmentStore.appointments
  console.log('Appointments in HistoryPage:', appointments.value)
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
</script>
