import { createApp } from 'vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct
import App from './App.vue';
import { clerkPlugin } from 'vue-clerk'
import './globals.css'
import axios from 'axios';

const app = createApp(App);

app.use(router)
app.use(store)
app.use(Vue3Lottie)
app.use(clerkPlugin, {
  publishableKey: process.env.VUE_APP_CLERK_PUBLISHABLE_KEY,
  // clerkJSVariant: 'headless'
})

router.beforeEach(async (to, from, next) => {
  console.log('beforeEach path = ' + to.path);
  const token = localStorage.getItem('access_token');
  if (to.path !== '/login' && to.path !== '/signup') { // Ajouter cette condition
    if (token) {
      console.log('token found');
      try {
        // Endpoint pour vérifier le token
        await axios.get(process.env.VUE_APP_ROOT_API + '/api/auth/verify-token', {
          headers: {
            'Authorization': `Bearer ${token}`
          }       
        }); 
        console.log('token verified');
      } catch (error) {
        console.error('token verification failed');
        localStorage.removeItem('access_token'); // Supprimer le token
        next('/login');
        return;
      }
    }
    else {
      console.log('no token found');
      next('/login');
    }
  }
  next();
});

app.mount('#app')
