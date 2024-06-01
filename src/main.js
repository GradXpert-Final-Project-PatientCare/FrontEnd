import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'vue3-toastify/dist/index.css'
import Vue3Toastify from 'vue3-toastify'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

app.use(createPinia())
app.use(Vue3Toastify, {
  autoClose: 3000
})
app.use(router)
app.config.globalProperties.$toast = Vue3Toastify.toast

app.mount('#app')
