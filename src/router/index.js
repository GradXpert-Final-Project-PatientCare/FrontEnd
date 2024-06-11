import { createRouter, createWebHistory } from 'vue-router'
import { useDoctorStore } from '../stores/doctorStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue')
    },
    {
      path: '/new-appointment',
      name: 'new-appointment',
      component: () => import('../views/AppointmentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: () => import('../views/InvoiceView.vue')
    },
    {
      path: '/appointment-history',
      name: 'appointment-history',
      component: () => import('../views/HistoryView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-appointment/:id',
      name: 'EditAppointment',
      component: () => import('../views/EditAppointmentView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

// Middleware untuk memeriksa otorisasi
router.beforeEach((to, from, next) => {
  const store = useDoctorStore()
  console.log('Navigating to:', to.path, 'Authenticated:', store.isAuthenticated)
  if (to.matched.some((record) => record.meta.requiresAuth) && !store.isAuthenticated) {
    // Jika rute memerlukan otorisasi dan user tidak terotentikasi, arahkan ke halaman login
    next({ name: 'login' })
  } else {
    next() // Lanjutkan ke rute yang diminta
  }
})

export default router
