// src/stores/appointmentStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import apiClient from '../services/axios'

export const useAppointmentStore = defineStore('appointmentStore', () => {
  const appointments = ref([])
  const timeslots = ref([])
  const messageError = ref('')

  const handleApiError = (error) => {
    console.error(error)
    messageError.value = error.response?.data?.message || error.message || 'An error occurred'
  }

  const fetchAppointments = async () => {
    try {
      const response = await apiClient.get('/appointment/list')
      appointments.value = response.data.data
      console.log(response, 'response Fetch Appointment')
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchUserAppointments = async () => {
    try {
      const response = await apiClient.get('/appointment/list')
      appointments.value = response.data.data
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchUserAppointmentHistory = async () => {
    try {
      const response = await apiClient.get('/appointment/history')
      appointments.value = response.data.data
      console.log('Fetched User Appointment History:', appointments.value)
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchAllAppointments = async () => {
    try {
      const [ongoingResponse, historyResponse] = await Promise.all([
        apiClient.get('/appointment/list'),
        apiClient.get('/appointment/history')
      ])
      appointments.value = [...ongoingResponse.data.data, ...historyResponse.data.data]
      console.log('Fetched All Appointments:', appointments.value)
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchTimeslots = async (doctorId) => {
    try {
      if (!doctorId) {
        throw new Error('Doctor ID is required to fetch timeslots')
      }
      const response = await apiClient.get(`/timeslot/${doctorId}`)
      timeslots.value = response.data.data
      console.log('Fetched timeslots:', timeslots.value)
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchAppointmentById = async (appointmentId) => {
    try {
      if (!appointmentId) {
        throw new Error('Appointment ID is required to fetch appointment')
      }
      const response = await apiClient.get('/appointment/list')
      const appointment = response.data.data.find((app) => app.id === Number(appointmentId))
      if (!appointment) {
        throw new Error('Appointment not found')
      }
      console.log('Fetched appointment:', appointment)
      return appointment
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const createAppointment = async (appointment) => {
    try {
      const response = await apiClient.post('/appointment/create', appointment)
      appointments.value.push(response.data.data)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const updateAppointment = async (appointment) => {
    try {
      const response = await apiClient.patch(`/appointment/update/${appointment.id}`, appointment)
      const index = appointments.value.findIndex((a) => a.id === appointment.id)
      if (index !== -1) {
        appointments.value[index] = response.data.data
      }
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await apiClient.patch(`/appointment/cancel/${appointmentId}`)
      console.log(response, 'response dari cancel')
      const index = appointments.value.findIndex((a) => a.id === appointmentId)
      if (index !== -1) {
        appointments.value[index].status = 'dibatalkan'
      }
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const completeAppointment = async (appointmentId) => {
    try {
      const response = await apiClient.patch(`/appointment/complete/${appointmentId}`)
      console.log(response, 'response dari complete')
      const index = appointments.value.findIndex((a) => a.id === appointmentId)
      if (index !== -1) {
        appointments.value[index].status = 'selesai'
      }
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  return {
    appointments,
    timeslots,
    messageError,
    fetchAppointments,
    fetchUserAppointments,
    fetchUserAppointmentHistory,
    fetchAllAppointments,
    fetchTimeslots,
    fetchAppointmentById,
    createAppointment,
    updateAppointment,
    cancelAppointment,
    completeAppointment
  }
})
