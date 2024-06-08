import { createApp } from 'vue'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct
import App from './App.vue';
import { clerkPlugin } from 'vue-clerk'
import './globals.css'


console.log('key ===> ' + process.env.VUE_APP_CLERK_PUBLISHABLE_KEY)
const app = createApp(App);

app.use(router)
app.use(store)
app.use(Vue3Lottie)
app.use(clerkPlugin, {
  publishableKey: process.env.VUE_APP_CLERK_PUBLISHABLE_KEY,
  // clerkJSVariant: 'headless'
})

app.mount('#app')
