<template>  
    <!-- Header -->
  <HeaderComponent title="Mon profil" />
  <div class="flex md:flex-row flex-col items-center 
  space-y-8
  justify-center
  md:justify-around 
  min-h-screen p-5 
  md:space-x-10 
  grow
  md:mt-0
  overflow-y-hidden 
  md:overflow-auto">

    <!-- Profile info -->
    <div class="w-full md:w-1/2 rounded-lg shadow-xl bg-white p-8 space-y-5 border border-gray-200">
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
                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent bg-white w-full text-black" 
                disabled
                :placeholder="placeholderUsername">
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
                :placeholder="placeholderEmail">
              </div>
            </div>
          </div>
          <div class="flex flex-1 space-x-5">
            <!-- <button type="submit" class="mb-5 bg-purple-600 text-white pl-3 pr-3 pt-1 pb-1 rounded-lg 
          shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 
          font-semibold">Modifier profil
          </button> -->
          <button @click="showUdpatePassword" class="mt-5 bg-purple-600 text-white text-lg 
          pl-3 pr-3 pt-2 pb-2 
          rounded-xl w-full shadow-md hover:bg-purple-700 
          focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 
          font-semibold">Modifier mot de passe</button>
          <!-- <button type="submit" class="w-full mb-5 
          bg-purple-600 text-white 
          pl-3 pr-3 pt-1 pb-1 
          rounded-lg 
          shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 
          font-semibold">Modifier mot de passe
          </button> -->
          </div>
          <div v-if="error" class="text-red-500">{{ error }}</div>
        </form>
        </div>

        <!-- Subscription info -->
        <div class="w-full md:w-1/2 rounded-lg shadow-xl bg-white p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-purple-600 mb-4">Abonnement</h2>
            <!-- <div class="rounded-lg shadow-xl bg-white p-4 border border-gray-200 mb-3">
            </div> -->
            <p class="text-gray-600 text-lg mb-3">Il vous reste <span 
              class="font-semibold"
              :class="{'text-red-500': remainingProducts < 2 || remainingProducts === 0, 'text-green-500': remainingProducts > 2}"
              >{{ remainingProducts }}</span>/{{ maxProducts }} produits.<br/></p>
            <p class="text-gray-600 text-lg">Vous avez souscrit au plan <span class="font-semibold">{{ subscriptionPlan }}</span>.</p>
            <p class="text-gray-600 text-lg">Depuis le <span class="font-semibold">{{ subscriptionCreationDate }}</span>.</p>

            <router-link to="/pricing">
            <button class="mt-5 bg-purple-600 text-white text-lg 
            pl-3 pr-3 pt-2 pb-2 
            rounded-xl w-full shadow-md hover:bg-purple-700 
            focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 
            font-semibold">Modifier abonnement</button></router-link>
        </div>
    </div>

    <UpdatePasswordModal v-if="updatePassword" @close-udpate-password="closeDialog"></UpdatePasswordModal>
</template>

<script>
import api from '@/api';
import dateUtils from '../utils/dateUtils';
import { mapState } from 'vuex';
import HeaderComponent from './HeaderComponent.vue';
import UpdatePasswordModal from './modals/UpdatePasswordModal.vue';
import subscribeService from '@/services/subscriptionService';

export default {
    name: 'MyProfile',
    data() {
        return {
          // plan
            subscriptionPlan: '',
            subscriptionExpiryDate: '',
            placeholderUsername: '',
            placeholderEmail: '',
            maxProducts: '',
            updatePassword: false,
        };
    },

    components: {
      // Your components go here
      HeaderComponent,
      UpdatePasswordModal,
    },

    computed: {
      ...mapState(['user', 'accessToken', 'isUserConnected']),
    },
    methods: {
        // Your methods go here
        getActiveSubscription() {
          console.log('User  : ' + JSON.stringify(this.user));
          console.log('User id : ' + JSON.parse(this.user).id);
            // Code to get the active subscription goes here
            api.get('/api/v1/subscription-active' + '?userId=' + JSON.parse(this.user).id)
            .then((response) => {
                const subscription = response.data;
                this.subscriptionPlan = response.data.plan;
                this.subscriptionCreationDate = dateUtils.formatDate(response.data.creationDate);
                this.maxProducts = subscribeService.getMaxProducts(subscription);
                this.remainingProducts = this.maxProducts - response.data.apiCallsMade;
            })
        },

        showUdpatePassword() {
          console.log('Update password');
          this.updatePassword = true;
        },

        closeDialog() {
          this.updatePassword = false;
        },
    },
    beforeMount() {
      this.getActiveSubscription();
    },
    mounted() {
      document.title = 'RealViews - Mon profil';
      JSON.parse(this.$store.state.user)? this.placeholderUsername = JSON.parse(this.$store.state.user).username : this.placeholderUsername
      JSON.parse(this.$store.state.user)? this.placeholderEmail = JSON.parse(this.$store.state.user).email : this.placeholderEmail = 'Email non renseigné';
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>