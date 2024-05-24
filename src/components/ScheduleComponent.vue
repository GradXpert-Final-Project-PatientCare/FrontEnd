<template>
  <div>
    <h3>Pilih Tanggal dan Jam</h3>
    <input type="date" v-model="selectedDate" @change="loadAvailableTimes" />
    <div v-if="selectedDate">
      <h4>Pilih Jam Praktek:</h4>
      <button
        v-for="time in availableTimes"
        :key="time"
        :class="{
          'btn btn-secondary': selectedTime === time,
          'btn btn-light': selectedTime !== time
        }"
        @click="selectTime(time)"
      >
        {{ time }}
      </button>
    </div>
    <router-link v-if="selectedTime" to="/invoice" @click="buttonClick"
      >Konfirmasi Janji</router-link
    >
    <InvoiceDetail v-if="isAppointmentConfirmed" :appointmentDetails="appointmentDetails" />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import InvoiceDetail from './InvoiceDetail.vue'

const props = defineProps(['doctor'])
const emit = defineEmits(['appointmentConfirmed'])

const selectedDate = ref('')
const selectedTime = ref('')
const availableTimes = ref(['09:00', '10:00', '11:00'])
const isAppointmentConfirmed = ref(false)
const appointmentDetails = ref({})

const loadAvailableTimes = async () => {
  // Implementasi logika untuk memuat waktu yang tersedia dari backend sesuai dengan tanggal yang dipilih
}

const selectTime = (time) => {
  selectedTime.value = time
}

const buttonClick = () => {
  if (!selectedDate.value || !selectedTime.value) {
    console.error('Pilih tanggal dan jam terlebih dahulu!')
    return
  }

  appointmentDetails.value = {
    doctor: props.doctor.name,
    date: selectedDate.value,
    time: selectedTime.value
  }

  emit('appointmentConfirmed', appointmentDetails.value)
  isAppointmentConfirmed.value = true
}
</script>
