<template>
  <!-- Spinner -->
  <div v-if="loading_logout"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 duration-3000 z-[2]">
    <div class="bg-black p-6 rounded-lg shadow-lg">
      <div class="flex flex-col items-center">
        <div class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'SpinnerComponent',
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
    },
};
</script>

<style scoped>
/* Your component styles go here */
</style>