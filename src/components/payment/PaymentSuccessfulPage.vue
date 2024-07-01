<template>
    <div class="min-h-screen flex flex-col items-center 
      md:justify-center">
        <h1 class="text-4xl text-green-800">Payment Successful</h1>
        <p class="text-lg">Thank you for your purchase!</p>
        <p class="text-lg">You will be redirected to the pricing page in a few seconds...</p>
        <div v-if="isLoading" class="loader"></div>
    </div>
</template>

<script>
import api from '@/api';
import router from '@/router';
import { mapState } from 'vuex';

export default {
    name: 'PaymentSuccessful',
    
    data() {
        return {
            isLoading: true,
        };
    },

    computed: {
        ...mapState(['user', 'accessToken', 'isUserConnected', 'selectedPlanTitle']),
    },

    mounted() {
        setTimeout(() => {
            this.isLoading = false;
            this.updateSubscription();
            // Redirect to the pricing page
            window.location.href = '/pricing';
        }, 3000); // 3 seconds timeout
    },

    methods: {
        updateSubscription() {
            // Call the API to update the subscription
            console.log('Updating subscription...');
            console.log('Selected plan title: ' + this.selectedPlanTitle);

            // Subscribe
            api.post('/api/v1/subscribe' + '?userId=' + JSON.parse(this.user).id + '&planType=' + this.selectedPlanTitle, {})
            .then((response) => {
                  console.log("Subscribe success : " + response.data);
                  router.push('/');
                })
            .catch((error) => {
                  console.error("Error subscribe : " + error);
                  this.error = "Erreur lors de la souscription";
                });
        },
    }
}
</script>

<style scoped>
</style>
