<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2>Riwayat Janji Temu</h2>
      <div v-if="appointments.length">
        <div v-for="appointment in appointments" :key="appointment.id" class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">{{ getDoctorName(appointment.doctorId) }}</h5>
            <p class="card-text">Tanggal: {{ appointment.date }}</p>
            <p class="card-text">Waktu: {{ appointment.time }}</p>
            <p class="card-text">Keluhan: {{ appointment.complaint }}</p>
            <button class="btn btn-warning me-2" @click="editAppointment(appointment.id)">
              Edit
            </button>
            <button class="btn btn-danger" @click="cancelAppointment(appointment.id)">
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
import { useDoctorStore } from '../stores/doctorStore'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'

const appointmentStore = useAppointmentStore()
const doctorStore = useDoctorStore()
const router = useRouter()

const appointments = ref([])

onMounted(async () => {
  await appointmentStore.fetchAppointments()
  await doctorStore.fetchDoctors()
  appointments.value = appointmentStore.appointments
})

const getDoctorName = (doctorId) => {
  const doctor = doctorStore.doctors.find((doc) => doc.id === doctorId)
  return doctor ? doctor.name : 'Dokter tidak ditemukan'
}

const editAppointment = (appointmentId) => {
  router.push({ path: '/new-appointment', query: { appointmentId } })
}

const cancelAppointment = async (appointmentId) => {
  try {
    await appointmentStore.deleteAppointment(appointmentId)
    toast.success('Appointment canceled successfully!')
    appointments.value = appointments.value.filter((a) => a.id !== appointmentId)
  } catch (error) {
    toast.error('Failed to cancel appointment')
  }
}
</script>
