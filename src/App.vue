<template>
  <div id="app" :class="isMobile ? 'flex flex-col' : 'flex'">

    <!-- Mobile -->
    <div id="sidebar" v-if="isMobile" class="fixed top-0 left-0 w-full h-12 bg-custom-purple text-white flex items-center px-2">
      <button @click="toggleDropdown" class="text-2xl bg-transparent border-none text-white">
      &#9776; <!-- Unicode character for the burger menu -->
    </button>
    <!-- <div v-if="isMobile" >
    <button @click="isOpen = !isOpen">Toggle Menu</button> -->
    <transition name="slide">
      <div v-if="isOpen" class="menu fixed top-0 left-0 w-full h-full bg-custom-purple text-white transition-transform transform translate-x-0 mr-4">
         <!-- Close menu button -->
         <button @click="toggleDropdown" class="text-2xl bg-transparent border-none text-white">
            &times; <!-- Unicode character for the close button -->
          </button>
      <!-- logo sidebar -->
      <div id="logo_sidebar" class="logo mt-5 flex items-center justify-center">
        <img
          src="../src/assets/sidebar/C.png"
          class="h-12 w-auto mx-auto mt-2"/>
      </div>
      <div class=" py-4 px-3 bg-custom-purple rounded dark:bg-custom-purple space-between-10">
          <!-- Navigation element Sidebar -->
        <div class="navigation_element content-start">
          <h3 class="text-slate-200">Navigation</h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/" id="gettingStarted">
                <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                  <img
                    src="../src/assets/sidebar/home-logo.png"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Accueil</span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link to="/scrapper" id="gettingStarted">
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/scraper-logo.png"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Scraper</span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link to="/generate" id="gettingStarted">
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/generer-logo.png"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Generer</span>
              </a>
              </router-link>
            </li>
            <li>
              <router-link to="/products" id="gettingStarted">
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/transparent-list-icon.jpg"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Historique</span>
              </a>
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Communaute element Sidebar -->
        <div class="communaute_element mt-8">
          <h3 class="text-slate-200">Communaute</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/affiliate-logo.png"
                    class="object-fill mr-2 w-6 h-6"/>
                <span class="ml-3">Affiliation</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/communaute-logo.png"
                    class="object-fill mr-2 w-6 h-6"/>
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
                <img
                    src="../src/assets/sidebar/reglages-logo.png"
                    class="object-fill mr-2 w-6 h-6"/>
                <span class="ml-3">Reglages</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/dark-mode-logo.png"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Dark Mode</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <img
                    src="../src/assets/sidebar/help-logo.png"
                    class="object-fill mr-2 w-5 h-5"/>
                <span class="ml-3">Aides & Tutoriels</span>
              </a>
            </li>
            <!-- <li @click="logout()" class="flex items-center">
                <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                  <img
                    src="../src/assets/sidebar/logout.png"
                    class="object-fill mr-3 w-6 h-6"/>
                  <span class="">Deconnexion</span>
              </a>
            </li> -->
            <!-- Menu user -->
            <li v-if="isUserConnected" class="place-content-end mb-10" style="position: absolute; bottom: 0; width: 296px;">
                <a href="#" @click="toggleDropdown" class="relative flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                  <img
                    src="../src/assets/sidebar/user-logo.png"
                    class="object-fill mr-2 w-6 h-6"/>
                  <span class="ml-3">{{ username }}</span>
                  <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bottom-10 bg-white rounded-lg shadow-xl transform origin-bottom">
                    <a @click="logout()" class="flex items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <img
                      src="../src/assets/sidebar/profile.png"
                      class="object-fill mr-3 w-6 h-6"/>
                      Mon profil</a>
                    <hr class="my-2">
                    <!-- <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Thème</a> -->
                    <!-- <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Conditions & politiques</a> -->
                    <!-- <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700"> -->
                    <a @click="logout2()" class="flex items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
                      <img
                      src="../src/assets/sidebar/logout.png"
                      class="object-fill mr-3 w-6 h-6"/>
                      Déconnexion</a>
                  </div>
                </a>
            </li>
            <li v-else class="place-content-end mb-10" style="position: absolute; bottom: 0; width: 296px;">
              <button @click="redirectLogin()" 
              class="bg-purple-600 text-sm text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-12 mt-2 mb-5 ml-15">Se Connecter</button>
            </li>

            <!-- Menu Utilisateur Dropdown -->
            <!-- <div class="relative">
              <button @click="toggleDropdown" class="p-2 border rounded absolute bottom-0">Menu</button>
              <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bottom-10 bg-white rounded-lg shadow-xl transform origin-bottom">
                <div class="px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer" @click="userAction">
                  {{ userName }}
                </div>
                <hr class="my-2">
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Thème</a>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Conditions & politiques</a>
                <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Déconnexion</a>
              </div>
            </div> -->
          </ul>
        </div>
      </div>
      </div>
    </transition>
  </div>

  <!-- Sidebar fixe sur le côté -->
  <Sidebar v-else class="h-screen overflow-hidden" />

    <!-- Contenu principal qui change avec les routes -->
    <div id="main_content" class="flex-1 overflow-auto">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { ref } from 'vue';
import { mapState } from 'vuex';
import Sidebar from "./components/SidebarPage.vue";

export default {
  name: 'App',

  components: {
    Sidebar
  },

  setup() {
    const isOpen = ref(false);

    function toggleDropdown() {
      isOpen.value = !isOpen.value;
    }
    return { isOpen, toggleDropdown };
  },

  computed: {
    ...mapState(['user', 'isUserConnected'])
  },

  watch: {
    // Ce watcher surveille les changements de la propriété calculée 'isUserConnected'
    isUserConnected(newValue) {
      if (newValue) {
        // Si l'utilisateur est connecté, effectuez les actions nécessaires
        this.reloadSidebar();
      }
    }
  },

  mounted() {
    window.addEventListener("resize", this.checkScreenSize);

    this.userItem = JSON.parse(this.user);
    if (this.userItem) {
      console.log("user on header exist");
      console.log("username on header ====> " + this.userItem.username);
      if (this.userItem.username) {
        this.username = this.userItem.username;
      } else console.error("No username found");
    } else {
      console.error("error user");
    }

    if (window.innerWidth < window.innerHeight) {
      this.showBar = false;
    }
 },

  created() {
    window.addEventListener('storage', this.handleStorageEvent);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener('storage', this.handleStorageEvent);
  },

  data() {
    return {
      isMobile: false,
      loading_logout: false,
      spinner_text: "",
      showBar: true,
      username: "",
    };
  },

  methods: {
    checkScreenSize() {
      console.log("check screen size");
      this.isMobile = window.innerWidth < 768;
    },

    handleStorageEvent(e) {
    if (e.key === 'isUserConnected' || e.key === 'user') {
      this.$forceUpdate();
      this.reloadSidebar // Force Vue.js à re-révaluer les propriétés qui dépendent de localStorage.
    }
  },

    reloadSidebar() {
      // Méthode pour recharger la barre latérale
      // Vous pouvez forcer la mise à jour du composant ou effectuer des actions spécifiques ici
      location.reload();
    },

    async logout2() {
      console.log("test logout")
      this.spinner_text = "Deconnexion en cours..";
      this.loading_logout = true;
      await this.wait(1000);
      this.loading_logout = false;
      this.$store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
      router.push("/");
    },

    async logout() {
      console.log("test logout")
      this.spinner_text = "Deconnexion en cours..";
      this.loading_logout = true;
      await this.wait(1000)
      if (localStorage.getItem("access_token")) {
        console.log("storage item ==> " + localStorage.getItem("access_token"));
        localStorage.removeItem("isUserConnected");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
        // alert("L'utilisateur a bien été déconnecté")
      } else {
        console.log("storage item not found");
      }
      this.loading_logout = false;
      this.isOpen = false;
      this.isUserConnected = false
      router.push("/");
    },

    redirectLogin() {
      router.push("/login");
    },

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  }
};
</script>

<style>
/* Styliser la sidebar pour qu'elle soit fixe */
.sidebar {
  position: fixed;
  /* autres styles */
}

/* Styliser le contenu principal pour qu'il ne soit pas caché par la sidebar */
.main-content {
  margin-left: 200px; /* ajustez en fonction de la largeur de votre sidebar */
  /* autres styles */
}

/* Assurez-vous que le html et le body prennent toute la hauteur */
/* html, body {
  height: 100%;
  margin: 0;
} */

/* Ajoutez ce style pour fixer la hauteur de la page et de la sidebar */
#app {
  height: 100vh; /* Hauteur complète de la fenêtre de visualisation */
}

#main_content {
  height: 100vh; /* Hauteur complète de la fenêtre de visualisation */
  overflow-y: scroll; /* Permet le défilement vertical si le contenu dépasse */
}

Sidebar {
  height: 100vh; /* Hauteur complète de la fenêtre de visualisation */
  overflow-y: hidden; /* Empêche le défilement de la sidebar */
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>