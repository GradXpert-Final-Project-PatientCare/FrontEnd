import { defineStore } from 'pinia'
import axios from 'axios'

export const useAppointmentStore = defineStore('appointmentStore', {
  state: () => ({
    appointments: []
  }),
  actions: {
    async fetchAppointments() {
      try {
        const response = await axios.get('http://localhost:3000/appointments')
        this.appointments = response.data
      } catch (error) {
        console.error('Failed to fetch appointments:', error)
      }
    },
    async createAppointment(appointment) {
      try {
        const response = await axios.post('http://localhost:3000/appointments', appointment)
        this.appointments.push(response.data)
      } catch (error) {
        console.error('Failed to create appointment:', error)
        throw error
      }
    },
    async updateAppointment(appointment) {
      try {
        const response = await axios.put(
          `http://localhost:3000/appointments/${appointment.id}`,
          appointment
        )
        const index = this.appointments.findIndex((a) => a.id === appointment.id)
        if (index !== -1) {
          this.appointments[index] = response.data
        }
      } catch (error) {
        console.error('Failed to update appointment:', error)
        throw error
      }
    },
    async deleteAppointment(appointmentId) {
      try {
        await axios.delete(`http://localhost:3000/appointments/${appointmentId}`)
        this.appointments = this.appointments.filter((a) => a.id !== appointmentId)
      } catch (error) {
        console.error('Failed to delete appointment:', error)
        throw error
      }
    }
  }
})
