import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
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
      component: () => import('../views/AppointmentView.vue')
    },
    {
      path: '/invoice',
      name: 'Invoice',
      component: () => import('../views/InvoiceView.vue')
    },
    {
      path: '/appointment-history',
      name: 'appointment-history',
      component: () => import('../views/HistoryView.vue')
    }
  ]
})

export default router
