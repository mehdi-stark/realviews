import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct

createApp(App).use(router)
.use(store)
.use(Vue3Lottie)
.mount('#app')
