<template>
  <div class="min-h-screen flex items-center justify-center bg-white">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <div class="flex items-center ml-4">
        <img src="../assets/logo-principal-tranparent.png" alt="SprintPro Logo" class="w-full mr-2 mt-2" />
      </div>
      <h2 class="text-xl font-semibold mb-4 mt-10">Inscription</h2>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="username" id="username" class="mt-1 p-2 w-full border rounded-md" v-model="username"/>
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700">Adresse e-mail</label>
          <input type="email" id="email" class="mt-1 p-2 w-full border rounded-md" v-model="email"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md" v-model="password"/>
        </div>
        <button type="submit" @click="signup" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          S'inscrire
        </button>
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Déjà un compte ? <router-link to="/login" class="text-blue-500">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InscriptionPage',

  data() {
    return {
      username: "",
      email: "",
      password: ""
    }
  },

  methods: {
    async signup(e) {
          e.preventDefault();
          const response = await fetch(process.env.VUE_APP_ROOT_API + "/api/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              username: this.username,
              password: this.password,
            }),
          });

          const test = await response.json();
          console.error("Reponse signup ==> " + JSON.stringify(test));
          console.error("User on signup ==> " + JSON.stringify(test.user));

          if(test.access_token && test.user) {
            const userTmp = JSON.stringify({
              id: test.user.id,
              email: test.user.email,
              username: test.user.name,
              role: test.user.string
            })
            localStorage.setItem('user', userTmp);
            localStorage.setItem('access_token', test.access_token);
            this.$router.push("/")
          }
          else {
            console.error("Access token or user is null");
          }
        },

    signu() {
      localStorage.clear(); // Supprime le token du localStorage

      const data = {
              "email": "med@med.com",
              "name": "med",
              "password": "123"
          }

          
          console.log('Signup called');
          axios.post(process.env.VUE_APP_ROOT_API + '/auth/signup', data) 
          .then((getResponse) => {
            console.log("reponse create user : " + getResponse);
          })
          .catch((error) =>  {
            console.error("Error while fetching market updates : " + error);
            return
          });

          axios.post(process.env.VUE_APP_ROOT_API + '/auth/login', data) 
              .then((getResponse) => {
              console.log("GET Response")
              console.log("TOKEN : " + getResponse.data.access_token);  
              // Save the access token in localStorage
              localStorage.setItem('access_token', getResponse.data.access_token);
            })
            .catch((error) =>  {
              console.error("Error while fetching market updates : " + error);
            });

          if (localStorage.getItem('access_token')) {
              this.$router.push("/")
          }
          else {
            console.error("Access token is null");
          }
        },
  }
}
</script>

<style>
/* Aucun style personnalisé ici, utilisez uniquement les classes Tailwind */
</style>
