<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/home">Patient Care</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/new-appointment">New Appointment</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <router-link class="btn btn-outline-danger d-flex align-items-center" to="/login">
            <span class="ms-2">Login</span>
          </router-link>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  background-color: #f8f9fa;
}

.navbar-brand {
  font-weight: bold;
  color: #007bff;
}

.navbar-brand:hover {
  color: #0056b3;
}

.nav-link {
  font-size: 1.1rem;
  margin-right: 1rem;
}

.nav-link.active {
  font-weight: bold;
  color: #0056b3;
}

.btn-outline-danger {
  display: flex;
  align-items: center;
}

.btn-outline-danger img {
  margin-right: 0.5rem;
}
</style>
