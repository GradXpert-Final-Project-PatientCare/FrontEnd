<template>
  <div v-if="appointmentDetails">
    <h2>Rincian Janji</h2>
    <p><strong>Dokter:</strong> {{ appointmentDetails.doctor }}</p>
    <p><strong>Tanggal:</strong> {{ appointmentDetails.date }}</p>
    <p><strong>Jam:</strong> {{ appointmentDetails.time }}</p>
    <!-- Tambahan rincian lainnya sesuai kebutuhan -->
  </div>
  <div v-else>
    <p>Rincian janji tidak tersedia.</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps(['appointmentDetails'])

const appointmentDetails = props.appointmentDetails
</script>
