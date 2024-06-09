<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2>Edit Janji Temu</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="doctor" class="form-label">Dokter</label>
          <input type="text" class="form-control" v-model="doctorName" readonly required />
        </div>
        <div class="mb-3">
          <label for="date" class="form-label">Tanggal Janji Temu</label>
          <select class="form-select" v-model="selectedDate" @change="filterTimeslots" required>
            <option v-for="date in uniqueDates" :key="date" :value="date">
              {{
                new Date(date).toLocaleDateString('id-ID', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })
              }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="timeslot" class="form-label">Pilih Waktu</label>
          <select class="form-select" v-model="selectedTimeslotId" required>
            <option
              v-for="timeslot in filteredTimeslots"
              :key="timeslot.id"
              :value="timeslot.id"
              :disabled="timeslot.kuota === 0"
            >
              {{ formatTime(timeslot.waktu) }} (Kuota: {{ timeslot.kuota }})
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label for="complaint" class="form-label">Keluhan</label>
          <textarea class="form-control" v-model="complaint" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
      </form>
      <div class="mt-3">
        <router-link to="/appointment-history" class="btn btn-secondary">
          Lihat Riwayat Janji Temu
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAppointmentStore } from '../stores/appointmentStore'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'

const appointmentStore = useAppointmentStore()

const route = useRoute()
const router = useRouter()

const selectedDoctorId = ref('')
const selectedDate = ref('')
const selectedTimeslotId = ref('')
const complaint = ref('')
const timeslots = ref([])
const doctorName = ref('')
const appointmentId = route.params.id || ''

onMounted(async () => {
  try {
    if (appointmentId) {
      const appointment = await appointmentStore.fetchAppointmentById(appointmentId)
      if (appointment) {
        console.log('Fetched appointment:', appointment) // Log data untuk verifikasi
        selectedDoctorId.value = appointment.dokterId // Pastikan doctorId digunakan dengan benar
        console.log('Doctor ID:', selectedDoctorId.value) // Log untuk verifikasi
        selectedDate.value = appointment.tanggal
        selectedTimeslotId.value = appointment.TimeslotId
        complaint.value = appointment.keterangan
        doctorName.value = appointment.dokter
        await fetchTimeslots()
      } else {
        throw new Error('Appointment not found')
      }
    }
  } catch (error) {
    console.error('Error fetching appointment:', error)
    toast.error('Failed to fetch appointment details')
  }
})

watch(selectedDoctorId, async (newVal) => {
  if (newVal) {
    await fetchTimeslots()
  }
})

const fetchTimeslots = async () => {
  if (selectedDoctorId.value) {
    await appointmentStore.fetchTimeslots(selectedDoctorId.value)
    timeslots.value = appointmentStore.timeslots
    console.log('Timeslots:', timeslots.value)
  } else {
    console.error('Selected Doctor ID is undefined')
  }
}

const uniqueDates = computed(() => {
  const dates = timeslots.value.map((timeslot) => timeslot.tanggal)
  return [...new Set(dates)]
})

const filteredTimeslots = computed(() => {
  return timeslots.value.filter((timeslot) => timeslot.tanggal === selectedDate.value)
})

const formatTime = (waktu) => {
  // Pastikan format waktu adalah HH:mm:ss
  const timeParts = waktu.split(':')
  return `${timeParts[0]}:${timeParts[1]}`
}

const handleSubmit = async () => {
  try {
    const appointment = {
      id: appointmentId,
      DoctorId: selectedDoctorId.value,
      TimeslotId: selectedTimeslotId.value,
      keterangan: complaint.value
    }
    await appointmentStore.updateAppointment(appointment)
    toast.success('Appointment updated successfully!')
    setTimeout(() => {
      router.push('/appointment-history')
    }, 4000)
  } catch (error) {
    toast.error('Failed to save appointment')
  }
}
</script>
