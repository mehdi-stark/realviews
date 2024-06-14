<template>
  <!-- Spinner -->
    <div 
    class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-[99]">
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <iframe class="p-6" src="https://lottie.host/embed/ab95f673-b879-48e7-a7d1-6ae2d3425e4d/Pnh6UZfIwU.json"></iframe>
      <p class="text-blue-loader-animation mt-2 text-center text-lg" v-html="spinner_text"></p>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SpinnerLottieComponent',
    props: {
        // Your component props go here
        spinner_text: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            // Your component data goes here
        };
    },
    methods: {
        // Your component methods go here
    },
    mounted() {
        // Code to run when the component is mounted goes here
        console.log('SpinnerLottieComponent mounted');
    },
};
</script>

<style scoped>
/* Your component styles go here */
</style>