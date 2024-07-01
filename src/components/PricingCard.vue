<template>
  <div
    :class="[
      'md:h-[550px] bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center',
      current ? 'border-2 border-purple-500' : 'border border-gray-200'
    ]"
    class="md:h-[400px]"
  >
  <!-- <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center border border-gray-200"> -->
    <div id="title" class="md:h-[180px]">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <p class="mt-2 text-sm text-gray-500">{{ description }}</p>
      <p v-if="popular" class="text-purple-600 font-semibold mt-1">Populaire</p>
    </div>

    <div id="price"
    class="md:h-[150px]">
      <p class="text-black text-2xl font-extrabold">€{{ price }}<span class="text-base font-normal">/mois</span></p>
      <p v-if="current" class="mt-4 text-purple-600 font-semibold">Plan actuel</p>
      <button v-else-if="title === 'Custom'" class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800"
      ><a href="mailto:contact@realviews.ai?subject=RealViews - Demande custom abonnement">Contactez-nous</a></button>
      <!-- <RouterLink v-else to="/payment-intent" class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800">Choisir</RouterLink> -->
      <button v-else class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800" @click="handleCheckout">Choisir</button>
    </div>
    <div id="features" class="justify-end">
      <ul class="mt-8 space-y-2 text-left">
        <li v-for="(feature, index) in featureList" :key="index" class="text-gray-700">
          <span v-if="feature.startsWith('Everything listed')" class="font-semibold">{{ feature }}</span>
          <span v-else class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8 15.414l-4.707-4.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ feature }}
          </span>
        </li>
      </ul>
    </div>
  </div>

  <SpinnerComponent v-if="loading_price_card" :spinner_text="spinner_text" />
</template>

<script>
import api from '@/api';
import { loadStripe } from '@stripe/stripe-js';
import SpinnerComponent from './SpinnerComponent.vue';
// import router from '@/router';
  
export default {
  props: {
    title: String,
    price: String,
    description: String,
    features: String,
    popular: Boolean,
    current: Boolean,
  },

  components: {
    SpinnerComponent,
    // SpinnerComponent: () => import('./SpinnerComponent.vue'),
  },

  data() {
      return {
        stripe: null,
        errorMessage: '',
        sessionIdStripe: '',
        urlCheckout: '',
        loading_price_card: false,
        spinner_text: '',
      };
    },

  computed: {
    featureList() {
      return this.features.split(',');
    },
  },

  async mounted() {        
        this.stripe = await loadStripe('pk_test_51JJLrVLuuLlzGggwHEMY3LCJSNgXrZM0Pm7QAaQAzRlIXSyhgKCe0Zh6grex7wZJZZRmeHzZQNxzBENMReUekQJw00jZKm6N5e');
    },

  methods: {
      async handleCheckout() {
        this.loading_price_card = true;
        this.spinner_text = "Demande de paiement en cours ..."
        this.errorMessage = '';
        try {
          // this.spinner_text = "Ouverture de la \npage de paiement ..."
          const response = await api.post('/api/v1/stripe/create-checkout-session', {
            description: 'Souscription à l\'abonnement ' + this.title,
            amount: this.price,
            currency: 'eur',
          });
          const session = response.data;
          this.sessionIdStripe = session.id;
          this.urlCheckout = session.url;

          console.log('session', session);
          console.log('sessionIdStripe', this.sessionIdStripe);
          console.log('urlCheckout', this.urlCheckout);

          if (session.error) {
            this.errorMessage = session.error.message;
          } else {
            console.log('Opening checkout page... ' + this.title);
            this.$store.commit('setSelectedPlanTitle', this.title);
            window.open(this.urlCheckout, '_blank'); // Ouvre dans un nouvel onglet
            // const { error } = await this.stripe.redirectToCheckout({ sessionId: session.id });
            // if (error) {
            //   this.errorMessage = error.message;
            // }
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
};
</script>

<style>
</style>
