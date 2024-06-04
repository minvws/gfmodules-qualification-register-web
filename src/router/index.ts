import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
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
      path: '/applicaties',
      name: 'applicaties',
      component: () => import('../views/Applications.vue')
    },
    {
      path: '/applicaties/:id',
      name: 'applicatie',
      component: () => import('../views/Application.vue')
    },
    {
      path: '/leveranciers',
      name: 'vendors',
      component: () => import('../views/Vendors.vue')
    },
    {
      path: '/leveranciers/:id',
      name: 'vendor',
      component: () => import('../views/Vendor.vue')
    },
    {
      path: '/systeem-types',
      name: 'system-types',
      component: () => import('../views/SystemTypes.vue')
    },
    {
      path: '/systeem-types/:id',
      name: 'system-type',
      component: () => import('../views/SystemType.vue')
    },
    {
      path: '/rollen',
      name: 'roles',
      component: () => import('../views/Roles.vue')
    },
    {
      path: '/rollen/:id',
      name: 'role',
      component: () => import('../views/Role.vue')
    },
  ]
})

export default router
