import { createRouter, createWebHistory } from 'vue-router'
import AcceuilPage from '@/components/AcceuilPage.vue'
import ScrapperPage from '@/components/ScrapperPage.vue'
import ProductListPage from '@/components/ProductListPage.vue'
import GenereratePage from '@/components/GenereratePage.vue'
import LoginPage from '@/components/auth/LoginPage.vue'
import RegistrationPage from '@/components/auth/RegistrationPage.vue'
import NewGenerateFormPage from '@/components/NewGenerateFormPage.vue'
import store from '../store/store'

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
  { path: '/amazon', component: NewGenerateFormPage, name: 'Generate Amazon' },

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
      store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
      console.error('No token')
      next('/login');
    }
  } else {
    // Non-protected route, allow access
    next();
  }
});

export default router
