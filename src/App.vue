<script setup>
import AppNavbar from '../src/components/AppNavbar.vue'
</script>

<template>
  <div id="app">
    <AppNavbar />
    <RouterView />
  </div>
</template>

<style scoped>
/* Styling for App.vue */
#app {
  font-family: Arial, sans-serif;
}
</style>
