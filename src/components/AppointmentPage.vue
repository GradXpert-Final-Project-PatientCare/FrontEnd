<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2>Buat Janji Temu</h2>
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
        <!-- Informasi Biaya -->
        <div class="alert alert-info" role="alert">
          Membuat janji temu akan dikenakan biaya sebesar 50.000 IDR.
        </div>
        <button type="submit" class="btn btn-primary">Buat Janji</button>
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
import { useDoctorStore } from '../stores/doctorStore'
import { useAppointmentStore } from '../stores/appointmentStore'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'

const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()

const route = useRoute()
const router = useRouter()

const selectedDoctorId = ref('')
const selectedDate = ref('')
const selectedTimeslotId = ref('')
const complaint = ref('')
const timeslots = ref([])
const doctorName = ref('')
const doctorIdFromQuery = route.query.doctorId || ''

onMounted(async () => {
  if (doctorIdFromQuery) {
    await doctorStore.fetchDoctorById(doctorIdFromQuery)
    const doctor = doctorStore.doctor
    if (doctor) {
      selectedDoctorId.value = doctor.id
      doctorName.value = doctor.nama
      await fetchTimeslots()
    } else {
      console.error('Doctor not found')
    }
  }
})

watch([selectedDoctorId], async () => {
  if (selectedDoctorId.value) {
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
      DoctorId: selectedDoctorId.value,
      TimeslotId: selectedTimeslotId.value,
      keterangan: complaint.value
    }
    await appointmentStore.createAppointment(appointment)
    // setTimeout(() => {
    //   router.push('/appointment-history')
    // }, 4000)
  } catch (error) {
    console.log(error)
    toast.error('Failed to create appointment')
  }
}
</script>
