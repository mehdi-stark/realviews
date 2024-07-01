<template>
    <div>
      <button class="bg-slate-500" @click="handleCheckout">Checkout</button>
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import api from '@/api';
import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    data() {
      return {
        stripe: null,
        errorMessage: '',
      };
    },
    async mounted() {        
        this.stripe = await loadStripe('pk_test_51JJLrVLuuLlzGggwHEMY3LCJSNgXrZM0Pm7QAaQAzRlIXSyhgKCe0Zh6grex7wZJZZRmeHzZQNxzBENMReUekQJw00jZKm6N5e');
    },
    methods: {
      async handleCheckout() {
        this.errorMessage = '';
        try {
          const response = api.post('/api/v1/stripe/create-checkout-session', {});
          const session = await response.json();
          
          if (session.error) {
            this.errorMessage = session.error.message;
          } else {
            const { error } = await this.stripe.redirectToCheckout({ sessionId: session.id });
            if (error) {
              this.errorMessage = error.message;
            }
          }
        } catch (error) {
          this.errorMessage = error.message;
        }
      },
    },
  };
  </script>
  
  <!-- <template>
    <div>
      <form @submit.prevent="handleSubmit">
        <div id="card-element"></div>
        <button type="submit">Payer</button>
      </form>
      <div v-if="paymentMethodId">Payment Method ID: {{ paymentMethodId }}</div>
    </div>
  </template> -->
  <!-- <script>
  import api from '@/api';
import { loadStripe } from '@stripe/stripe-js';
  
  export default {
    data() {
      return {
        stripe: null,
        elements: null,
        card: null,
        paymentMethodId: null,
      };
    },
    async mounted() {
      this.stripe = await loadStripe('pk_test_51JJLrVLuuLlzGggwHEMY3LCJSNgXrZM0Pm7QAaQAzRlIXSyhgKCe0Zh6grex7wZJZZRmeHzZQNxzBENMReUekQJw00jZKm6N5e');
      this.elements = this.stripe.elements();
      this.card = this.elements.create('card');
      this.card.mount('#card-element');
    },
    methods: {
        async handleSubmit() {
      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.card,
      });
      
      if (error) {
        console.error(error);
      } else {
        this.paymentMethodId = paymentMethod.id;
        this.sendPaymentMethodToServer(paymentMethod.id);
      }
    },
    async sendPaymentMethodToServer(paymentMethodId) {
      try {
        const response = await api.post('/api/v1/stripe/payment-intent', {
            paymentMethodId: paymentMethodId,
            amount: 1000,
            currency: 'eur',
            });
        const result = response.data;
        
        if (result.error) {
          console.error(result.error);
        } else {
          const { clientSecret } = result;
          const { error: confirmError } = await this.stripe.confirmCardPayment(clientSecret);
          if (confirmError) {
            console.error(confirmError);
          } else {
            console.log('Payment successful');
          }
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
   -->
  <style scoped>
  /* Ajoutez votre style ici */
  </style>
  