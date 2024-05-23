<template>
  <!-- SPINNER LOADING -->
  <div v-if="loading_login" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 duration-3000">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex flex-col items-center">
        <div class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
      </div>
    </div>
  </div>

  <div class="min-h-screen flex flex-col items-center justify-center bg-custom-purple">
    <!-- LOGO -->
    <div class="flex justify-center mb-12">
      <img src="../../assets/sidebar/C-7.png" alt="Realviews Logo" class="h-48">
    </div>
    
    <div class="max-w-md w-full bg-white rounded-lg p-10">
      <!-- Connexion par USERNAME -->
      <div v-if="!emailMethod">
        <h2 class="text-xl font-semibold mb-4">Connexion</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" class="mt-1 p-2 w-full border rounded-md" v-model="form.username"/>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md" v-model="form.password"/>
          </div>
          <button type="submit" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Se connecter
          </button>
        </form>
        <p class="mt-4 text-sm text-gray-600">
          Vous préférez vous connecter avec votre email : <a @click="showEmail()" class="cursor-pointer hover:bg-slate-100 text-blue-500" id="email_link">Cliquer ici</a><br/>
          Pas encore de compte ? <router-link to="/signup" class="text-blue-500" id="gettingStarted">S'inscrire</router-link>
        </p>
      </div>
      <!-- Connexion par EMAIL -->
      <div v-else>
        <h2 class="text-xl font-semibold mb-4">Connexion</h2>
        <form>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input type="email" id="email" class="mt-1 p-2 w-full border rounded-md" required/>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md"/>
          </div>
          <button @click="login" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Se connecter
          </button>
        </form>
        <p class="mt-4 text-sm text-gray-600">
          Vous préférez vous connecter avec votre username : <a @click="showUsername()" class="cursor-pointer text-blue-500 hover:bg-slate-200" id="username_link">Cliquer ici</a><br/>
          Pas encore de compte ? <router-link to="/signup" class="text-blue-500" id="gettingStarted">S'inscrire</router-link>
        </p>
      </div>
      <div v-if="error" class="mt-5 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import { mapState } from 'vuex';
import axios from "axios";
import api from "@/api";

    export default {

      data() { return {
        form: {
          username: "",
          password: ""
        },
        emailMethod: false,
        loading_login: false,
        spinner_text: "",
        error: null
        }
      },

      computed: {
        ...mapState(['user', 'isUserConnected']),
      },

      mounted() {
        if(this.isUserConnected) {
          console.log('User is already connected')
          router.push('/');
        }
      },

      methods: {
        async login(e) {
          this.spinner_text = "Connexion en cours.."
          this.loading_login = true
          e.preventDefault();

          api.post(process.env.VUE_APP_ROOT_API + "/api/auth/login", this.form)
          .then((response) => {
            console.log('response login -> ' + JSON.stringify(response));
            const reponse_data = response.data;
            const accessToken = reponse_data.access_token;
            console.log('login if(access_token) -> ' + accessToken);
            const userData = JSON.stringify({
                      id: reponse_data.id,
                      email: reponse_data.email,
                      username: reponse_data.username,
                      role: this.string
              })

              // get subscription
              console.log("Test id " + JSON.stringify(reponse_data.id));
              console.log("Access token " + accessToken);
              axios.get(process.env.VUE_APP_ROOT_API + '/api/v1/subscription-active' + '?userId=' + reponse_data.id, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response) => {
                console.log("Reponse get active subscription ==> " + JSON.stringify(response));
                // Appeler l'action 'login' définie dans le store
                this.$store.dispatch('login', { user: userData, accessToken, subscriptionPlan: response.data});
                // this.loading_login = false
                this.$router.push("/")

              }) 
              .catch((error) => {
                console.error("Error get active subscription : " + error.data);
                this.error = "Erreur lors de la recuperation de la subscription : " + error.data
                this.loading_login = false
                window.location.reload()
              });


          })
          .catch((error) => {
            console.error("Error login : " + error);
            this.error = "username ou mot de passe invalide"
            this.loading_login = false
          });
        },
        
        logout() {
          if (localStorage.getItem('access_token')) {
            console.log("storage item ==> " + localStorage.getItem('access_token'))
            localStorage.removeItem('access_token');
          }
          else {
            console.log("storage item not found ")
          }
        },

        showEmail() {
          this.emailMethod = true
        },
        showUsername() {
          this.emailMethod = false
        },
        wait(ms) {
          return new Promise((resolve) => setTimeout(resolve, ms));
        }
    }
  }
</script>

<style>
/* Aucun style personnalisé ici, utilisez uniquement Tailwind classes */
</style>
