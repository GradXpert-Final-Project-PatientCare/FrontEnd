<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">Patient Care</router-link>
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
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/">Home</router-link>
          </li>
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success" type="submit">Search</button>
          <button class="btn btn-outline-primary ms-2" @click="addPatient">
            <img src="../assets/Plus_icon.png" alt="Add" width="30" height="24" />
          </button>
          <button class="btn btn-outline-danger ms-2" @click="logout">
            <img src="../assets/logout_icon.png" alt="" width="30" height="24" />
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar-brand {
  margin-right: 2rem; /* Sesuaikan jarak brand dengan link */
}
</style>
