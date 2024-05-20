<template>
      <!-- Header -->
  <div id="header">
    <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
      <span class="ml-3 flex justify-start font-bold p-3">Mon Profile</span>
      <div class="logo h-6 w-6 flex justify-end">
        <img
          src="../assets/question.png"
          alt="SprintPro Logo"
          class="place-items-center mr-8"
        />
      </div>
    </header>
  </div>
  <div class="flex items-center justify-around min-h-screen p-5 space-x-10">
        <!-- Profile info -->
    <div class="w-1/2 rounded-lg shadow-xl bg-white p-4 space-y-5 border border-gray-200">
            <h2 class="text-2xl font-bold text-purple-600 mb-4">Mon profile</h2>

        <form @submit.prevent="handleSubmit" class="flex flex-col justify-between items-center h-full space-y-8">
          <div class="flex flex-col justify-center items-center flex-grow">
            <div class="mb-4">
              <label for="name" class="sr-only">Nom et prénom</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-4a4 4 0 100-8 4 4 0 000 8z" clip-rule="evenodd"/></svg>
                </span>
                <input type="text" id="name" v-model="name" class="pl-10 pr-4 py-2 border rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white" 
                disabled
                :placeholder="JSON.parse(this.$store.state.user).username">
              </div>
            </div>
            <div class="">
              <label for="email" class="sr-only">Adresse Email</label>
              <div class="relative">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 2.94A7.5 7.5 0 0117.06 17.06L10 10.07 2.94 2.94zM10 12.94L17.06 20A7.5 7.5 0 012.94 2.94L10 12.94z"/></svg>
                </span>
                <input type="email" id="email" v-model="email" class="pl-10 pr-4 py-2 border rounded-lg shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white text-black" 
                disabled 
                :placeholder="JSON.parse(this.$store.state.user).email">
              </div>
            </div>
          </div>
          <button type="submit" class="mb-5 bg-purple-600 text-white pl-3 pr-3 pt-1 pb-1 rounded-full 
          shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 
          font-semibold">Edit Profile
          </button>
          <div v-if="error" class="text-red-500">{{ error }}</div>
        </form>
        </div>

        <!-- Subscription info -->
        <div class="w-1/2 rounded-lg shadow-xl bg-white p-4 border border-gray-200">
            <h2 class="text-2xl font-bold text-purple-600 mb-4">Subscription</h2>
            <p class="text-gray-600 text-lg">You are currently subscribed to the 
                <span class="font-semibold">{{ subscriptionPlan }}</span> plan.</p>
            <p class="text-gray-600 text-lg">Your subscription will expire on <span class="font-semibold">{{ subscriptionExpiryDate }}</span>.</p>
            <p class="text-gray-600 text-lg">To upgrade your subscription, please visit the <router-link to="/subscription" class="text-blue-500 hover:underline">subscription page</router-link>.</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyProfile',
    data() {
        return {
            user: {
                name: 'John Doe',
                email: 'test'
            },
            subscriptionPlan: '',
            subscriptionExpiryDate: ''
        };
    },
    methods: {
        // Your methods go here
    },
    mounted() {
        const subscribe = this.$store.state.subscriptionPlan;
        // Code to run when the component is mounted goes here
        console.log('Store subscription value : ' + JSON.stringify(subscribe.plan));

        this.subscriptionPlan = subscribe.plan;
        this.subscriptionExpiryDate = subscribe.expiryDate;
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>