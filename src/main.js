import { createApp } from 'vue'
import './globals.css'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct
// import App2 from './App2.vue'
import App from './App.vue';

createApp(App).use(router)
.use(store)
.use(Vue3Lottie)
.mount('#app')
