<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-6">
        <!-- Bagian kiri -->
        <h2>Bagaimana membuat janji di PatientCare</h2>
        <img
          src="../assets/poster_dokter.png"
          class="img-fluid rounded mx-auto d-block mt-3"
          style="max-width: 300px; height: auto"
          alt="Gambar"
        />
        <div class="mt-3">
          <div class="d-flex align-items-center mb-2">
            <img
              src="../assets/Pencarian_Icon.jpg"
              class="me-2"
              alt="Icon"
              width="40"
              height="32"
            />
            <p style="white-space: nowrap; text-align: left">Cari Dokter Sesuai Kebutuhan Anda</p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <img src="../assets/note_icon.png" class="me-2" alt="Icon" width="40" height="32" />
            <p style="white-space: nowrap; text-align: left">
              Pilih Dokter dengan jadwal yang telah disepakati
            </p>
          </div>
          <div class="d-flex align-items-center mb-2">
            <img src="../assets/form.png" class="me-2" alt="Icon" width="40" height="32" />
            <p style="white-space: nowrap; text-align: left">
              Isi Form Pasien (Isi Formulir dengan benar)
            </p>
          </div>
          <!-- Tambahkan ikon dan teks lainnya di sini -->
        </div>
      </div>
      <div class="col-md-6">
        <!-- Bagian kanan -->
        <div class="text-center">
          <img
            src="../assets/dokter_random.jpg"
            class="img-thumbnail"
            style="max-width: 300px; height: auto"
            alt="Gambar Dokter"
          />
        </div>
        <div class="mt-3">
          <p><strong>Nama Dokter:</strong> Dr. John Doe</p>
          <p><strong>Spesialis:</strong> Dokter Umum</p>
          <p><strong>Alamat Praktek:</strong> Jl. Contoh No. 123</p>
          <p><strong>Jadwal Praktek:</strong> Senin - Jumat, 08:00 - 17:00</p>
          <p><strong>Phone Number:</strong> 08123456789</p>
          <p><strong>Email:</strong> johndoe@example.com</p>
        </div>
        <div class="text-end mt-3">
          <button class="btn btn-primary">Buat Janji</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Data dan logika dapat ditambahkan di sini jika diperlukan
</script>

<style scoped>
/* Gaya khusus untuk halaman DetailPage */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.row {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.col-md-6 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.img-fluid {
  max-width: 300px;
  height: auto;
}

.img-thumbnail {
  max-width: 300px;
  height: auto;
}

.d-flex {
  align-items: center;
}

.me-2 {
  margin-right: 0.5rem;
}
</style>
