<template>
  <div>
    <CustomNavbar />
    <div class="container mt-4">
      <h2>{{ isEdit ? 'Edit Janji Temu' : 'Buat Janji Temu' }}</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="doctor" class="form-label">Pilih Dokter</label>
          <select
            class="form-select"
            v-model="selectedDoctorId"
            :disabled="!!doctorIdFromQuery"
            required
          >
            <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }} - {{ doctor.specialty }}
            </option>
          </select>
        </div>
        <DateAndTimePicker
          v-if="selectedDoctor"
          :selectedDoctor="selectedDoctor"
          @onTimeSelected="handleDateAndTimeSelected"
        />
        <div class="mb-3">
          <label for="complaint" class="form-label">Keluhan</label>
          <textarea class="form-control" v-model="complaint" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          {{ isEdit ? 'Simpan Perubahan' : 'Buat Janji' }}
        </button>
      </form>
      <div class="mt-3">
        <router-link to="/appointment-history" class="btn btn-secondary"
          >Lihat Riwayat Janji Temu</router-link
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'
import { useAppointmentStore } from '../stores/appointmentStore'
import { toast } from 'vue3-toastify'
import CustomNavbar from './CustomNavbar.vue'
import DateAndTimePicker from './DateAndTimePicker.vue'

const doctorStore = useDoctorStore()
const appointmentStore = useAppointmentStore()

const route = useRoute()
const router = useRouter()

const selectedDoctorId = ref('')
const selectedDate = ref('')
const selectedTime = ref('')
const complaint = ref('')
const doctors = ref([])
const doctorIdFromQuery = route.query.doctorId || ''
const isEdit = ref(false)
const appointmentId = ref(null)

onMounted(async () => {
  await doctorStore.fetchDoctors()
  doctors.value = doctorStore.doctors
  if (doctorIdFromQuery) {
    selectedDoctorId.value = doctorIdFromQuery
  }
  const id = route.query.id
  if (id) {
    isEdit.value = true
    appointmentId.value = id
    const appointment = await appointmentStore.getAppointmentById(id)
    if (appointment) {
      selectedDoctorId.value = appointment.doctorId
      selectedDate.value = appointment.date
      selectedTime.value = appointment.time
      complaint.value = appointment.complaint
    }
  }
})

const selectedDoctor = computed(() => {
  return doctors.value.find((doctor) => doctor.id === selectedDoctorId.value) || null
})

const handleDateAndTimeSelected = (date, time) => {
  selectedDate.value = date
  selectedTime.value = time
}

const handleSubmit = async () => {
  try {
    const appointment = {
      doctorId: selectedDoctorId.value,
      date: selectedDate.value,
      time: selectedTime.value,
      complaint: complaint.value
    }
    if (isEdit.value && appointmentId.value) {
      await appointmentStore.updateAppointment(appointmentId.value, appointment)
      toast.success('Appointment updated successfully!')
    } else {
      await appointmentStore.createAppointment(appointment)
      toast.success('Appointment created successfully!')
    }
    router.push('/appointment-history')
  } catch (error) {
    toast.error('Failed to create appointment')
  }
}
</script>
