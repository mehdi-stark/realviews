<template>
  <div v-if="loading_login" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 duration-3000">
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex flex-col items-center">
        <div class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
     </div>
    </div>
  </div>
  <div class="min-h-screen flex items-center justify-center bg-white" v-if="!emailMethod">
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md ">
      <div class="flex items-center ml-4">
        <img src="../assets/logo-principal-tranparent.png" alt="SprintPro Logo" class="w-full mr-2 mt-2" />
      </div>
      <h2 class="text-xl font-semibold mb-4 mt-10">Connexion</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
          <input type="username" id="username" class="mt-1 p-2 w-full border rounded-md" v-model="username"/>
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" id="password" class="mt-1 p-2 w-full border rounded-md" v-model="password"/>
        </div>
        <button type="submit" @click="login" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Se connecter
        </button>
        <!-- <button @click="logout" class="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Se deconnecter
        </button>
         -->
      </form>
      <p class="mt-4 text-sm text-gray-600">
        Vousp preferez vous connecter avec votre email: <a @click="showEmail()" class="text-blue-500" id="email_link">Cliquer ici</a> <br/>
        Pas encore de compte ? <router-link to="/signup" class="text-blue-500" id="gettingStarted">S'inscrire</router-link>
      </p>
    </div>
  </div>

  <!-- Connexion par email -->
  <div class="min-h-screen flex items-center justify-center bg-gray-100" v-else>
    <div class="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <div class="flex items-center ml-4">
        <img src="../assets/logo-principal-tranparent.png" alt="SprintPro Logo" class="w-full mr-2 mt-2" />
      </div>
      <h2 class="text-xl font-semibold mb-4 mt-10">Connexion</h2>
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
        Vous preferez vous connecter avec votre username: <a @click="showUsername()" class="text-blue-500" id="username_link">Cliquer ici</a> <br/>
        Pas encore de compte ? <router-link to="/signup" class="text-blue-500" id="gettingStarted">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script>
    export default {

      data() { return {
        form: {
          username: "",
          password: ""
        },
        emailMethod: false,
        loading_login: false,
        spinner_text: ""
        }
      },

      methods: {
        async login(e) {
          this.spinner_text = "Connexion en cours.."
          this.loading_login = true
          e.preventDefault();
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
          if(test.access_token) {
            localStorage.setItem('access_token', test.access_token);
            const user = JSON.stringify({
              id: test.id,
              email: test.email,
              username: test.username,
              role: this.string
            })
            localStorage.setItem('user', user);
            localStorage.setItem('isUserConnected', true);
            this.loading_login = false
            this.$router.push("/products")
          }
          else {
            console.error("Access token is null");
          }
          this.loading_login = false
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
