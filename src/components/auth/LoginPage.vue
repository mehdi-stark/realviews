<template>
  <!-- SPINNER LOADING -->
   <SpinnerComponent v-if="loading_login" :spinner_text="spinner_text"></SpinnerComponent>

  <div class="min-h-screen flex flex-col items-center 
  md:justify-center bg-custom-purple p-3">
    <!-- LOGO -->
    <div class="flex justify-center mb-12">
      <img src="../../assets/sidebar/C-7.png" alt="Realviews Logo" class="h-48">
    </div>
    
    <div class="max-w-md w-full bg-white rounded-lg p-8">
      <!-- Connexion par USERNAME -->
      <div v-if="!emailMethod">
        <h2 class="text-xl font-semibold mb-4">Connexion</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" class="mt-1 p-2 w-full border rounded-md dark:text-white" v-model="form.username"/>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md dark:text-white" v-model="form.password"/>
          </div>
          <button type="submit" class="w-full bg-custom-purple-container text-white py-2 rounded-md hover:bg-blue-600">
            Se connecter
          </button>
        </form>
        <p class="mt-4 text-sm text-gray-600">
          <!-- Vous préférez vous connecter avec votre email : <a @click="showEmail()" class="cursor-pointer hover:bg-slate-100 text-blue-500" id="email_link">Cliquer ici</a><br/> -->
          Pas encore de compte ? <router-link to="/signup" class="text-custom-purple-container" id="gettingStarted">S'inscrire</router-link>
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
          <button @click="login" class="w-full bg-custom-purple-container text-white py-2 rounded-md hover:bg-blue-600">
            Se connecter
          </button>
        </form>
        <p class="mt-4 text-sm text-gray-600">
          Vous préférez vous connecter avec votre username : <a @click="showUsername()" class="cursor-pointer text-blue-500 hover:bg-slate-200" id="username_link">Cliquer ici</a><br/>
          Pas encore de compte ? <router-link to="/signup" class="text-custom-purple-container" id="gettingStarted">S'inscrire</router-link>
        </p>
      </div>
      <div v-if="error" class="mt-5 text-red-500">{{ error }}</div>
    </div>
  </div>
</template>


<script>
import router from "@/router";
import { mapState } from 'vuex';
import authService from "@/services/authService";
import SpinnerComponent from "../SpinnerComponent.vue";

    export default {

      components: {
        SpinnerComponent
      },

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
          // Vérifier la connexion Internet avant de tenter de se connecter
          if (!navigator.onLine) {
            this.errorMessage = "Pas de connexion Internet. Veuillez vérifier votre connexion et réessayer.";
            return; // Arrêter l'exécution de la fonction si pas de connexion
          }

          this.spinner_text = "Connexion en cours.."
          this.loading_login = true
          e.preventDefault();
          
          try {
            await this.wait(1000);
            
            // Remplacer par l'appel réel à authService.login et son traitement
            await authService.login(this.form);
            // Gestion de la réussite de la connexion ici, par exemple :
            // router.push('/dashboard');
          } catch (error) {
            this.error = error; // Affichez le message d'erreur sur la page
          } finally {
            this.loading_login = false; // Assurez-vous que cela s'exécute que la requête réussisse ou échoue
          }
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
