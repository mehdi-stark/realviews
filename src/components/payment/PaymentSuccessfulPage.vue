<template>
    <div class="min-h-screen flex flex-col items-center 
      md:justify-center bg-green-200">
        <h1 class="text-4xl text-green-800">Payment Successful</h1>
        <p class="text-lg">Thank you for your purchase!</p>
        <div v-if="isLoading" class="loader"></div>
    </div>
</template>

<script>
export default {
    name: 'PaymentSuccessful',
    data() {
        return {
            isLoading: true,
        };
    },
    mounted() {
        setTimeout(() => {
            this.isLoading = false;
            // Redirect to the pricing page
            window.location.href = '/pricing';
        }, 3000); // 3 seconds timeout
    },

    methods: {
        updateSubscription() {
            // Call the API to update the subscription
        
        },
    }
}
</script>

<style scoped>
</style>
