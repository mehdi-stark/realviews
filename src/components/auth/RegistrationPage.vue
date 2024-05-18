<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-custom-purple">
        <!-- LOGO -->
    <div>
      <img src="../../assets/sidebar/realview-logo-big.png" alt="Realviews Logo" class="h-64">
    </div>

    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-xl">
      <!-- <div class="flex items-center ml-4">
        <img src="../../assets/sidebar/C.png" alt="SprintPro Logo" class="w-full mr-2 mt-2" />
      </div> -->
      <h2 class="text-xl font-semibold mb-4 mt-10">Inscription</h2>
      <form>
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <v-icon icon="mdi:email-outline"
          color="green-darken-2">
        </v-icon>
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

          // Register
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
          const accessToken = test.access_token;
          console.log("Reponse signup ==> " + JSON.stringify(test));
          console.log("User on signup ==> " + JSON.stringify(test.user));

          if(test.access_token && test.user) {
            const userTmp = JSON.stringify({
              id: test.user.id,
              email: test.user.email,
              username: test.user.name,
              role: test.user.string
            })
            // Appeler l'action 'login' définie dans le store
            this.$store.dispatch('login', { user: userTmp, accessToken });

            console.log("User on signup ==> " + JSON.stringify(userTmp));
            console.log("User ID on signup ==> " + JSON.parse(userTmp).id);

            // Subscribe
            axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/subscribe' 
            + '?userId=' + JSON.parse(userTmp).id + '&planType=Basic', {}, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then((response) => {
              console.log("Reponse subscribe ==> " + JSON.stringify(response));
              this.$router.push("/")
            }).catch((error) => {
              console.error("Error subscribe : " + error);
            });
          }
          else {
            console.error("Access token or user is null");
          }
        },
  }
}
</script>

<style>
/* Aucun style personnalisé ici, utilisez uniquement les classes Tailwind */
</style>
