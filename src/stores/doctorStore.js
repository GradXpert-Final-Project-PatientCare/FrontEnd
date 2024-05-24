import { defineStore } from 'pinia'
import axios from 'axios'

export const useDoctorStore = defineStore('main', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    doctors: [],
    appointments: []
  }),
  actions: {
    async fetchDoctors() {
      try {
        const response = await axios.get('http://localhost:3000/doctors', {
          // headers: { Authorization: `Bearer ${this.token}` }
        })
        this.doctors = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAppointments() {
      try {
        const response = await axios.get('/api/appointments', {
          // headers: { Authorization: `Bearer ${this.token}` }
        })
        this.appointments = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async login(credentials) {
      try {
        const response = await axios.post('/api/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        console.error(error)
      }
    },
    async register(data) {
      try {
        const response = await axios.post('/api/register', data)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        // axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        console.error(error)
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      // delete axios.defaults.headers.common['Authorization']
    },
    isAuthenticated() {
      return !!this.token
    }
  }
})
