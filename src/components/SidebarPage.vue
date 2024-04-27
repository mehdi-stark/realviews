<template>
    <!-- Sidebar -->
    <aside class="w-80 h-screen bg-custom-purple" aria-label="Sidebar" v-if="showBar">
      <div class="flex justify-end w-full">
        <button @click="showBar = false">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <!-- logo sidebar -->
      <div class="logo h-1/4">
        <img
        src="../assets/realview_logo.jpeg"
        class="object-fill" />
      </div>

      <div class="mt-10 py-4 px-3 bg-custom-purple rounded dark:bg-custom-purple space-between-10">
          <!-- Navigation element Sidebar -->
        <div class="navigation_element content-start">
          <h3 class="text-slate-200">Navigation</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"><router-link to="/" id="gettingStarted">Accueil</router-link></span>
              </a>
            </li>
            <!-- <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"><router-link to="/scrapper" id="gettingStarted">Scrapper</router-link></span>
              </a>
            </li> -->
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"><router-link to="/scrapper" id="gettingStarted">Generer</router-link></span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"><router-link to="/products" id="gettingStarted">Historique</router-link></span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Communaute element Sidebar -->
        <div class="communaute_element mt-8">
          <h3 class="text-slate-200">Communaute</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Affiliation</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Communaute</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Parametres element Sidebar -->
        <div class="parametre_element justify-items-end mt-8">
          <h3 class="text-slate-200">Parametres</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Reglages</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Dark Mode</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Aides & Tutoriels</span>
              </a>
            </li>
            <li @click="logout()" class="flex items-center">
                <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                  <img
                src="../assets/logout.png"
                class="object-fill mr-3 w-6 h-6"
                />
                  <span class="">Deconnexion</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    <button
    v-else
    class="text-white py-1 w-12 h-12 rounded flex items-center text-sm fixed mt-20 ml-5"
    @click="showBar = true"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-10 h-10"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  </button>
    <div
    v-if="loading_logout"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 duration-3000">
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="flex flex-col items-center">
        <div class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
        <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'App',
  mounted() {
    if (window.innerWidth < window.innerHeight) {
      this.showBar = false;
    }
  },

  data() {
    return {
      loading_logout: false,
      spinner_text: "",
      showBar: true,
    };
  },

  methods: {
    async logout() {
      console.log("test logout")
      this.spinner_text = "Deconnexion en cours..";
      this.loading_logout = true;
      await this.wait(1000)
      if (localStorage.getItem("access_token")) {
        console.log("storage item ==> " + localStorage.getItem("access_token"));
        localStorage.removeItem("access_token");
        this.loading_logout = false;
        router.push("/login");
        // alert("L'utilisateur a bien été déconnecté")
      } else {
        console.log("storage item not found");
      }
    },

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  }
};
</script>

<style>
/* ... styles Tailwind personnalisés ... */
</style>
