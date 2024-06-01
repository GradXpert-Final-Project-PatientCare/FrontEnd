<template>
  <div>
    <CustomNavbar />

    <div class="container mt-4">
      <div class="row">
        <!-- Bagian kiri -->
        <div class="col-lg-6 col-md-12 mb-4">
          <h2 class="text-center">Bagaimana membuat janji di PatientCare</h2>
          <img
            src="../assets/poster_dokter.png"
            class="img-fluid rounded mx-auto d-block mt-3"
            alt="Gambar"
          />
          <div class="mt-4">
            <div class="d-flex align-items-center mb-3">
              <img
                src="../assets/Pencarian_Icon.jpg"
                class="me-3"
                alt="Icon"
                width="40"
                height="32"
              />
              <p class="mb-0">Cari Dokter Sesuai Kebutuhan Anda</p>
            </div>
            <div class="d-flex align-items-center mb-3">
              <img src="../assets/note_icon.png" class="me-3" alt="Icon" width="40" height="32" />
              <p class="mb-0">Pilih Dokter dengan jadwal yang telah disepakati</p>
            </div>
            <div class="d-flex align-items-center mb-3">
              <img src="../assets/form.png" class="me-3" alt="Icon" width="40" height="32" />
              <p class="mb-0">Isi Form Pasien (Isi Formulir dengan benar)</p>
            </div>
            <!-- Tambahkan ikon dan teks lainnya di sini -->
          </div>
        </div>
        <!-- Bagian kanan -->
        <div class="col-lg-6 col-md-12">
          <div v-if="doctor" class="text-center">
            <img
              :src="doctor.image_url"
              class="img-thumbnail mx-auto d-block"
              style="max-width: 300px; height: auto"
              alt="Gambar Dokter"
            />
            <div class="mt-3">
              <p><strong>Nama Dokter:</strong> {{ doctor.nama }}</p>
              <p><strong>Spesialis:</strong> {{ doctor.spesialis }}</p>
              <p><strong>Alamat Praktek:</strong> {{ doctor.alamatPraktek }}</p>
              <p><strong>Jadwal Praktek:</strong></p>
              <ul class="list-unstyled">
                <li v-for="(schedule, index) in doctor.schedule" :key="index">
                  {{ schedule.hari }}: {{ schedule.waktu }}
                </li>
              </ul>
              <p><strong>Phone Number:</strong> {{ doctor.telepon }}</p>
              <p><strong>Email:</strong> {{ doctor.email }}</p>
            </div>
            <div class="text-center mt-4">
              <router-link
                :to="{ name: 'new-appointment', query: { doctorId: doctor.id } }"
                class="btn btn-primary"
              >
                Buat Janji Temu
              </router-link>
            </div>
          </div>
          <div v-else class="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDetailStore } from '../stores/detailStore'
import CustomNavbar from './CustomNavbar.vue'

const route = useRoute()
const store = useDetailStore()
const doctor = ref(null)

onMounted(async () => {
  const doctorId = route.params.id
  try {
    await store.fetchDoctorById(doctorId)
    doctor.value = store.doctor
  } catch (error) {
    console.error('Failed to fetch doctor details:', error)
  }
})
</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}

.img-thumbnail {
  max-width: 300px;
  height: auto;
}

.d-flex {
  align-items: center;
}

.me-3 {
  margin-right: 0.75rem;
}

@media (max-width: 768px) {
  .d-flex {
    flex-direction: column;
    text-align: center;
  }

  .me-3 {
    margin-right: 0;
    margin-bottom: 1rem;
  }
}
</style>
