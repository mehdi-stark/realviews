import { createApp } from 'vue'
import './globals.css'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct
// import App2 from './App2.vue'
import App from './App.vue';
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App).use(router)
.use(store)
.use(vuetify)
.use(Vue3Lottie)
.mount('#app')
