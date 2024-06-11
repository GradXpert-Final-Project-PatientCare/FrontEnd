import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import apiClient from '../services/axios'

export const useDoctorStore = defineStore('doctor', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)
  const token = ref(localStorage.getItem('token') || null)
  const doctors = ref([])
  const totalDoctors = ref(0)
  const appointments = ref([])
  const messageError = ref('')
  const doctor = ref(null)
  const userProfile = ref(null)

  const handleApiError = (error) => {
    console.error(error)
    messageError.value = error.response?.data?.message || error.message || 'An error occurred'
  }

  const fetchDoctors = async (page = 1, search = '', category = '', sort = '') => {
    try {
      const response = await apiClient.get('/doctor', {
        params: { page, search, category, sort }
      })
      doctors.value = response.data.data.rows
      totalDoctors.value = response.data.data.count
    } catch (error) {
      handleApiError(error)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await apiClient.get('/appointments', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      appointments.value = response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/user/login', credentials)
      const data = response.data.data
      token.value = data.accessToken
      user.value = {
        email: data.email,
        username: data.username,
        rules: data.rules
      }
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))
      console.log('Login successful:', user.value)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const register = async (data) => {
    try {
      const response = await apiClient.post('/user/register', data)
      console.log('Registration successful:', response.data)
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isAuthenticated = computed(() => !!token.value)

  const fetchDoctorById = async (id) => {
    try {
      const response = await apiClient.get(`/doctor/${id}`)
      doctor.value = response.data.data
    } catch (error) {
      handleApiError(error)
      throw error
    }
  }

  const fetchUserProfile = async () => {
    try {
      const response = await apiClient.get('/user/profile', {
        headers: { Authorization: `Bearer ${token.value}` }
      })
      userProfile.value = response.data.data
    } catch (error) {
      handleApiError(error)
    }
  }

  return {
    user,
    token,
    doctors,
    totalDoctors,
    appointments,
    messageError,
    doctor,
    userProfile,
    fetchDoctors,
    fetchAppointments,
    login,
    register,
    logout,
    isAuthenticated,
    fetchDoctorById,
    fetchUserProfile
  }
})
