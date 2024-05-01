import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import router from './router'
import Vue3Lottie from 'vue3-lottie'

createApp(App).use(router)
.use(Vue3Lottie)
.mount('#app')
