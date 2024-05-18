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
      <img src="../../assets/sidebar/realview-logo-big.png" alt="Realviews Logo" class="h-64">
    </div>
    
    <div class="max-w-md w-full bg-white rounded-lg p-10">
      <!-- Connexion par USERNAME -->
      <div v-if="!emailMethod">
        <h2 class="text-xl font-semibold mb-4">Connexion</h2>
        <form @submit.prevent="login">
          <div class="mb-4">
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input type="text" id="username" class="mt-1 p-2 w-full border rounded-md" v-model="username"/>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md" v-model="password"/>
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
    </div>
  </div>
</template>


<script>
import router from "@/router";
import { mapState } from 'vuex';
import CryptoJS from 'crypto-js';

    export default {

      data() { return {
        form: {
          username: "",
          password: ""
        },
        emailMethod: false,
        loading_login: false,
        spinner_text: "",
        secret: ""
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

        this.secret = process.env.VUE_APP_SECRET_KEY;
      },

      methods: {
        encryptPassword() {
          if (this.form.password) {
            // hash the name with any algorithm
            this.form.password = CryptoJS.AES.encrypt(this.form.password, this.secret).toString();
          }
        },

        decryptData() {
          // get data from localStorage
          const secretData = localStorage.getItem("secretData");

          // decrypt the data and convert to string
          const decryptData = CryptoJS.AES.decrypt(
            secretData,
            this.secret
          ).toString(CryptoJS.enc.Utf8);

          alert("Decrypted private data: " + decryptData);
        },

        async login(e) {
          this.spinner_text = "Connexion en cours.."
          this.loading_login = true
          e.preventDefault();
          this.encryptPassword();
          const response = await fetch(process.env.VUE_APP_ROOT_API + "/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              password: this.password,
            }),
          });

          const test = await response.json();
          const accessToken = test.access_token;
          console.log('login if(access_token) -> ' + accessToken);
            const userData = JSON.stringify({
              id: test.id,
              email: test.email,
              username: test.username,
              role: this.string
            })
            // Appeler l'action 'login' définie dans le store
            this.$store.dispatch('login', { user: userData, accessToken });
            // this.loading_login = false
            this.$router.push("/")
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
