import { createApp } from 'vue'
import './globals.css'
import router from './router'
import Vue3Lottie from 'vue3-lottie'
import store from './store/store'; // Assurez-vous que le chemin est correct
import App from './App.vue';
// import 'vuetify/styles'
// import { Vuetify, VBtn, VIcon, VAppBar, VDialog } from 'vuetify/lib/components'; // Importez les composants dont vous avez besoin

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    defaultAssets: false,
    components,
    directives,
  })

createApp(App).use(router)
.use(store)
// .use(Vuetify, {
//     components: {
//         VBtn,
//         VIcon,
//         VAppBar,
//         VDialog
//     }
// })
.use(vuetify)
.use(Vue3Lottie)
.mount('#app')
