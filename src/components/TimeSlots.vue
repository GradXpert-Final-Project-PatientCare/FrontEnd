<template>
  <div>
    <h4>Pilih Waktu</h4>
    <div v-if="timeSlots.length">
      <div class="time-slots">
        <div v-for="slot in timeSlots" :key="slot.time" class="time-slot">
          <button
            :class="['time-btn', { selected: selectedTime === slot.time }]"
            @click="selectTime(slot.time)"
            type="button"
          >
            {{ slot.time }} (Kuota: {{ slot.quota }})
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Tidak ada slot waktu yang tersedia.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  selectedDoctor: Object,
  selectedDate: String,
  onTimeSelected: Function
})

const timeSlots = ref([])
const selectedTime = ref('')

onMounted(() => {
  if (props.selectedDate) {
    fetchTimeSlots(props.selectedDate)
  }
})

watch(
  () => props.selectedDate,
  () => {
    if (props.selectedDate) {
      fetchTimeSlots(props.selectedDate)
    }
  }
)

const fetchTimeSlots = (date) => {
  const schedule = props.selectedDoctor.schedule[date] || {}
  timeSlots.value = Object.keys(schedule).map((time) => ({
    time,
    quota: schedule[time]
  }))
}

const selectTime = (time) => {
  selectedTime.value = time
  props.onTimeSelected(time)
}
</script>

<style scoped>
.time-slots {
  display: flex;
  flex-wrap: wrap;
}
.time-slot {
  margin: 5px;
}
.time-btn {
  padding: 10px;
  border: 1px solid #dee2e6;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f8f9fa;
}
.time-btn.selected {
  background-color: #e83e8c;
  color: white;
}
</style>
