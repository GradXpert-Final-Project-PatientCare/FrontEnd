<template>
  <div class="container">
    <div class="row justify-content-center mb-2">
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="#" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="#" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="#" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="#" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="#" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card mx-auto my-3" style="width: 18rem">
          <img src="https://picsum.photos/600/300/?image=25" class="card-img-top" alt="Image" />
          <div class="card-body text-center">
            <h5 class="card-title">Dr. A</h5>
            <p class="card-text">Dokter Umum</p>
            <div class="d-block text-center mb-2">
              <p class="card-text badge bg-primary text-wrap" style="width: 6rem">5 Tahun</p>
            </div>
            <div class="d-block text-center">
              <router-link to="/detail" class="btn btn-primary">Detail</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const isAuthenticated = ref(true) // Tandai apakah pengguna telah terautentikasi
const router = useRouter()

// Periksa apakah pengguna telah terautentikasi saat komponen dimuat
onMounted(() => {
  if (!isAuthenticated.value) {
    // Jika pengguna belum terautentikasi, arahkan kembali ke halaman login
    router.push('/login')
  }
})
</script>

<style scoped></style>
