<template>
  <div class="min-h-screen flex flex-col items-center p-3 
  md:justify-center bg-custom-purple mt-0 overflow-hidden md:overflow-auto">
    <!-- LOGO -->
    <div>
      <img src="../../assets/sidebar/C-7.png" alt="Realviews Logo" class="h-48">
    </div>

    <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-xl">
      <h2 class="text-xl font-semibold mb-4">Inscription</h2>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="username" id="username" class="mt-1 p-2 w-full border rounded-md" v-model="username" required/>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
          <input type="email" id="email" class="mt-1 p-2 w-full border rounded-md" v-model="email" required/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md" v-model="password" required/>
        </div>
        <button type="submit" @click="signup" class="w-full bg-custom-purple-container text-white py-2 rounded-md hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Déjà un compte ? <router-link to="/login" class="text-custom-purple-container">Se connecter</router-link>
      </p>
      <div v-if="error" class="justify-center mt-5 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import api from '@/api';
import axios from 'axios';
// import axios from 'axios';

export default {
  name: 'InscriptionPage',

  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: null
    }
  },

  methods: {
    async signup(e) {
          e.preventDefault();
          // Register
          axios.post(process.env.VUE_APP_ROOT_API + "/api/auth/signup", JSON.stringify({
              email: this.email,
              username: this.username,
              password: this.password,
            }),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => {
              console.log("Signup success");
              const data = response.data;
              const accessToken = data.access_token;
              if(accessToken && data.user) {
                const userTmp = JSON.stringify({
                  id: data.user.id,
                  email: data.user.email,
                  username: data.user.name,
                  role: data.user.string
                })

                // Subscribe
                api.post('/api/v1/subscribe' + '?userId=' + JSON.parse(userTmp).id + '&planType=Basic', {}, {
                  headers: {
                    Authorization: `Bearer ${accessToken}`
                  }
                }).then((response) => {
                  console.log("Subscribe success");
                  this.$store.dispatch('login', { user: userTmp, accessToken, subscriptionPlan: response.data});
                  router.push('/');
                }).catch((error) => {
                  console.error("Error subscribe : " + error);
                  this.error = "Erreur lors de la souscription";
                });
              }
              else {
                console.error("Access token or user is null");
              }
            }).catch((error) => {
              console.error("Error signup : " + error);
              this.error = error.response.data.message;
            });
        },
  }
}
</script>

<style>
/* Aucun style personnalisé ici, utilisez uniquement les classes Tailwind */
</style>
