// src/stores/detailStore.js
import { defineStore } from 'pinia'
import apiClient from '../services/axios'

export const useDetailStore = defineStore('detail', {
  state: () => ({
    doctor: null
  }),
  actions: {
    async fetchDoctorById(id) {
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
