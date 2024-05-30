// src/stores/doctorStore.js
import { defineStore } from 'pinia'
import apiClient from '../services/axios'

export const useDoctorStore = defineStore('doctor', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    doctors: [],
    totalDoctors: 0, // for pagination
    appointments: [],
    messageError: '',
    doctor: null // Tambahkan state untuk detail dokter
  }),
  actions: {
    async fetchDoctors(page = 1, search = '') {
      try {
        const response = await apiClient.get('/doctor', {
          params: { page, search }
        })
        this.doctors = response.data.data.rows
        this.totalDoctors = response.data.data.count
      } catch (error) {
        console.error(error)
      }
    },
    async fetchAppointments() {
      try {
        const response = await apiClient.get('/appointments', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.appointments = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async login(credentials) {
      try {
        const response = await apiClient.post('/user/login', credentials)
        const data = response.data.data // Mengambil data dari respons
        this.token = data.accessToken
        this.user = {
          email: data.email,
          username: data.username,
          rules: data.rules
        }
        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user)) // Menyimpan user ke localStorage
        console.log('Login successful:', this.user)
      } catch (error) {
        console.error(error)
        this.messageError = error.response.data.message || 'Login failed'
        throw error
      }
    },
    async register(data) {
      try {
        const response = await apiClient.post('/user/register', data)
        console.log('Registration successful:', response.data)
      } catch (error) {
        console.error(error)
        throw error
      }
    },
    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('user') // Menghapus user dari localStorage
    },
    isAuthenticated() {
      return !!this.token
    },
    async fetchDoctorById(id) {
      // Tambahkan metode ini
      try {
        const response = await apiClient.get(`/doctor/${id}`)
        this.doctor = response.data.data
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
})
