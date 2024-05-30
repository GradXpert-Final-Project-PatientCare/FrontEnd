import { defineStore } from 'pinia'
import apiClient from '../services/axios'

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    appointments: [],
    timeslots: [],
    messageError: ''
  }),
  actions: {
    async fetchAppointments() {
      try {
        const response = await apiClient.get('/appointment/list')
        this.appointments = response.data.data
        console.log(response, 'response Fetch Appointment')
      } catch (error) {
        this.messageError = error.message
        console.error('Failed to fetch appointments:', error)
      }
    },
    async fetchUserAppointments() {
      try {
        const response = await apiClient.get('/appointment/list')
        this.appointments = response.data.data
      } catch (error) {
        this.messageError = error.message
        console.error('Failed to fetch user appointments:', error)
      }
    },
    async fetchUserAppointmentHistory() {
      try {
        const response = await apiClient.get('/appointment/history')
        this.appointments = response.data.data
        console.log('Fetched User Appointment History:', this.appointments)
      } catch (error) {
        this.messageError = error.message
        console.error('Failed to fetch user appointment history:', error)
      }
    },
    async fetchAllAppointments() {
      try {
        const [ongoingResponse, historyResponse] = await Promise.all([
          apiClient.get('/appointment/list'),
          apiClient.get('/appointment/history')
        ])
        this.appointments = [...ongoingResponse.data.data, ...historyResponse.data.data]
        console.log('Fetched All Appointments:', this.appointments)
      } catch (error) {
        this.messageError = error.message
        console.error('Failed to fetch all appointments:', error)
      }
    },
    async fetchTimeslots(doctorId) {
      try {
        if (!doctorId) {
          throw new Error('Doctor ID is required to fetch timeslots')
        }
        const response = await apiClient.get(`/timeslot/${doctorId}`)
        this.timeslots = response.data.data
        console.log('Fetched timeslots:', this.timeslots)
      } catch (error) {
        this.messageError = error.message
        console.error('Failed to fetch timeslots:', error)
      }
    },
    async fetchAppointmentById(appointmentId) {
      try {
        if (!appointmentId) {
          throw new Error('Appointment ID is required to fetch appointment')
        }
        // Ambil semua janji temu dari endpoint /list
        const response = await apiClient.get('/appointment/list')
        const appointment = response.data.data.find((app) => app.id === Number(appointmentId))
        if (!appointment) {
          throw new Error('Appointment not found')
        }
        console.log('Fetched appointment:', appointment) // Log data untuk verifikasi
        return appointment
      } catch (error) {
        console.error('Failed to fetch appointment by ID:', error)
        throw error
      }
    },
    async createAppointment(appointment) {
      try {
        const response = await apiClient.post('/appointment/create', appointment)
        this.appointments.push(response.data.data)
      } catch (error) {
        console.error('Failed to create appointment:', error)
        throw error
      }
    },
    async updateAppointment(appointment) {
      try {
        const response = await apiClient.patch(`/appointment/update/${appointment.id}`, appointment)
        const index = this.appointments.findIndex((a) => a.id === appointment.id)
        if (index !== -1) {
          this.appointments[index] = response.data.data
        }
      } catch (error) {
        console.error('Failed to update appointment:', error)
        throw error
      }
    },
    async cancelAppointment(appointmentId) {
      try {
        const response = await apiClient.patch(`/appointment/cancel/${appointmentId}`)
        console.log(response, 'response dari cancel')
        const index = this.appointments.findIndex((a) => a.id === appointmentId)
        if (index !== -1) {
          this.appointments[index].status = 'dibatalkan'
        }
      } catch (error) {
        console.error('Failed to cancel appointment:', error)
        throw error
      }
    },
    async completeAppointment(appointmentId) {
      try {
        const response = await apiClient.patch(`/appointment/complete/${appointmentId}`)
        console.log(response, 'response dari complete')
        const index = this.appointments.findIndex((a) => a.id === appointmentId)
        if (index !== -1) {
          this.appointments[index].status = 'selesai'
        }
      } catch (error) {
        console.error('Failed to complete appointment:', error)
        throw error
      }
    }
  }
})
