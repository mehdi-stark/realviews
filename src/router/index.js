import { createRouter, createWebHistory } from 'vue-router'
import AcceuilPage from '@/components/AcceuilPage.vue'
import ScrapperPage from '@/components/ScrapperPage.vue'
import ProductListPage from '@/components/ProductListPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import GenerateFormPage from '@/components/GenerateFormPage.vue'
import RegistrationPage from '@/components/RegistrationPage.vue'
import GenereratePage from '@/components/GenereratePage.vue'
// import RegistrationPage from '@/views/RegistrationPage.vue'
// import LoginView from '@/views/LoginView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AcceuilPage
  },
  { path: '/scrapper', component: ScrapperPage, name: 'Scraper' },
  { path: '/generate', component: GenereratePage, name: 'Generer' },
  { 
    path: '/products', 
    component: ProductListPage, 
    name: 'Products',
    meta: {
      requiresAuth: true
    }
  },
  { path: '/login', component: LoginPage, name: 'Login' },
  { path: '/signup', component: RegistrationPage, name: 'Signup' },
  { path: '/amazon', component: GenerateFormPage, name: 'Generate Amazon' },

  // { 
  //   path: '/login', 
  //   name: 'login', 
  //   component: LoginView
  // },
  // { 
  //   path: '/signup', 
  //   name: 'signup', 
  //   component: RegistrationPage,
  // },
  // { 
  //   path: '/products', 
  //   name: 'products', 
  //   component: ProductListVue,
  //   meta: {
  //     requiresAuth: true
  //   }
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem('access_token');
    if (token) {
      // User is authenticated, proceed to the route
      next();
    } else {
      // User is not authenticated, redirect to login
      console.error('No token')
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
