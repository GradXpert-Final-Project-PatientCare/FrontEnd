<template>
  <div>
    <div class="date-picker">
      <h3>Pilih tanggal dan waktu kunjungan</h3>
      <div class="dates">
        <button
          v-for="date in availableDates"
          :key="date"
          :class="['date-btn', { active: selectedDate === date }]"
          @click="selectDate(date)"
          type="button"
        >
          <div>{{ getDayName(date) }}</div>
          <div>{{ formatDate(date) }}</div>
        </button>
      </div>
    </div>
    <TimeSlots
      v-if="selectedDate"
      :selectedDoctor="selectedDoctor"
      :selectedDate="selectedDate"
      @onTimeSelected="handleTimeSelected"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import TimeSlots from './TimeSlots.vue'

const props = defineProps({
  selectedDoctor: {
    type: Object,
    default: () => ({})
  },
  onTimeSelected: {
    type: Function,
    default: () => {}
  }
})

const selectedDate = ref('')
const availableDates = ref([])

onMounted(() => {
  if (props.selectedDoctor) {
    fetchAvailableDates(props.selectedDoctor)
  }
})

watch(
  () => props.selectedDoctor,
  (newDoctor) => {
    if (newDoctor) {
      fetchAvailableDates(newDoctor)
    }
  }
)

const fetchAvailableDates = (doctor) => {
  availableDates.value = Object.keys(doctor.schedule || {})
}

const selectDate = (date) => {
  selectedDate.value = date
  props.onTimeSelected(selectedDate.value, null) // reset selected time
}

const handleTimeSelected = (time) => {
  props.onTimeSelected(selectedDate.value, time)
}

const getDayName = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { weekday: 'long' })
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })
}
</script>

<style scoped>
.date-picker {
  text-align: center;
}
.dates {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.date-btn {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  padding: 10px;
  margin: 0 5px;
  cursor: pointer;
}
.date-btn.active {
  background-color: #e83e8c;
  color: white;
}
</style>
