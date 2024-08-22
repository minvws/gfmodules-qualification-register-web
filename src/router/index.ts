import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'qualifications' }
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
      name: 'applications',
      component: () => import('../views/Applications.vue')
    },
    {
      path: '/applicaties/:id',
      name: 'application',
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
      path: '/zorgaanbieders/:id',
      name: 'healthcare-provider',
      component: () => import('../views/HealthcareProvider.vue')
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
    {
      path: '/kwalificaties',
      name: 'qualifications',
      component: () => import('../views/Qualifications.vue')
    },
    {
      path: '/leveranciers-kwalificaties',
      name: 'vendor-qualifications',
      component: () => import('../views/VendorQualifications.vue')
    },
    {
      path: '/Zorgaanbieder-kwalificaties',
      name: 'healthcare-provider-qualifications',
      component: () => import('../views/HealthcareProviderQualifications.vue')
    }
  ]
})

export default router
