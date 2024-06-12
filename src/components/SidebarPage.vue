<!-- <script setup>
import { SignInButton, UserButton, useAuth } from 'vue-clerk'
const { isSignedIn } = useAuth()
</script> -->

<template>
    <!-- Sidebar -->
    <!-- Laptop -->
    <aside class="w-80 h-screen bg-custom-purple z-[2]" aria-label="Sidebar">
      <!-- <div class="flex justify-end w-full">
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
      </div> -->
      <!-- logo sidebar -->
      <div id="logo_sidebar" class="logo h-24 mt-5" style="display: flex; align-items: center; justify-content: center; height: 120px;">
        <img
          src="../assets/sidebar/C.png"
          class="object-cover h-full w-full" />
      </div>
      <div class="mt-10 py-4 px-3 bg-custom-purple rounded dark:bg-custom-purple space-between-10">
          <!-- Navigation element Sidebar -->
        <div class="navigation_element content-start">
          <h3 class="text-slate-200">Navigation</h3>
          <ul class="space-y-2">
        <li>
          <router-link @click="$emit('close-sidebar')" to="/" id="gettingStarted">
            <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
          <img
            src="../assets/sidebar/home-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Accueil</span>
          </a>
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('close-sidebar')" to="/scrapper" id="gettingStarted">
          <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/scraper-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Scraper</span>
          </a>
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('close-sidebar')" to="/generate" id="gettingStarted">
          <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/generer-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Generer</span>
          </a>
          </router-link>
        </li>

        <li>
          <div class="bg-white md:p-3 rounded-xl text-black 
          w-[250px]
          md:w-full
          space-x-3
          md:space-x-0 
          md:space-y-2">   
            <div class="flex flex-col md:flex-row justify-between">
              <p class="text-lg"><span class="font-semibold">{{ subscriptionPlan.plan }}</span></p>
              <p @click="this.$router.push('/pricing') && $emit('close-sidebar')" 
              class="text-purple-500 font-semibold hover:text-purple-800 cursor-pointer ">
              Mettre a niveau
              </p>
            </div>       

            <p class="text-black text-lg md:mb-3 cursor-pointer" @click="this.$router.push('/products') && $emit('close-sidebar')"><span 
              class="font-semibold"
              :class="{'text-red-500': remainingProducts < 2 || remainingProducts === 0, 'text-green-500': remainingProducts > 2}"
              >{{ remainingProducts }}</span>/{{ maxProducts }} <br class="md:hidden"/> produits<br/>
            </p>
          </div>
        </li>
          </ul>
        </div>

        <!-- Communaute element Sidebar -->
        <div class="communaute_element mt-7">
          <h3 class="text-slate-200">Communaute</h3>
          <ul class="space-y-2">
        <li>
          <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/affiliate-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Affiliation</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/communaute-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Communaute</span>
          </a>
        </li>
          </ul>
        </div>

        <!-- Parametres element Sidebar -->
        <div class="parametre_element justify-items-end mt-7 flex flex-col h-full">
          <h3 class="text-slate-200">Parametres</h3>
          <ul class="space-y-2">
        <li>
          <a href="#" class="flex items-center p-2 mt-3 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/reglages-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Reglages</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/dark-mode-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <span class="ml-3">Dark Mode</span>
          </a>
        </li>
        <li>
          <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
            <img
            src="../assets/sidebar/help-logo.png"
            class="object-fill mr-2 w-5 h-5"/>
            <RouterLink to="/help" class="ml-3">Aides & Tutoriels</RouterLink>
          </a>
        </li>
        <!-- <li @click="logout()" class="flex items-center">
            <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
          <img
            src="../assets/sidebar/logout.png"
            class="object-fill mr-3 w-6 h-6"/>
          <span class="">Deconnexion</span>
          </a>
        </li> -->
        <!-- Menu user -->
        <li v-if="isUserConnected" class="mt-auto mb-3" style="width: 296px;">
            <a href="#" @click="toggleDropdown" class="relative flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
          <img
            src="../assets/sidebar/user-logo.png"
            class="object-fill mr-2 w-6 h-6"/>
          <span class="ml-3">{{ username }}</span>
          <div v-if="isOpen" class="absolute right-0 mt-2 py-2 w-48 bottom-10 bg-white rounded-lg shadow-xl transform origin-bottom">
            <router-link @click="$emit('close-sidebar')"  to="/profile" id="myprofile">
            <a href="#" class="flex items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
              <img
              src="../assets/sidebar/profile.png"
              class="object-fill mr-3 w-6 h-6"/>
              Mon profil</a>
            </router-link>
            <hr class="my-2">
            <!-- <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Thème</a> -->
            <!-- <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-200">Conditions & politiques</a> -->
            <!-- <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700"> -->
            <a @click="logout2()" class="flex items-center block px-4 py-2 text-gray-800 hover:bg-gray-200">
              <img
              src="../assets/sidebar/logout.png"
              class="object-fill mr-3 w-6 h-6"/>
              Déconnexion</a>
          </div>
            </a>
        </li>
        <li v-else class="mt-auto mb-3" style="width: 296px;">
          <button @click="redirectLogin()" 
          class="bg-purple-600 text-sm text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-10 mt-2 mb-5 ml-15">Se connecter</button>
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
    </aside>  
  <SpinnerComponent v-if="loading_logout" :text="spinner_text" />
</template>

<script>
import router from "@/router";
import { ref } from 'vue';
import { mapState } from 'vuex';
// import { useUser } from 'vue-clerk'
import SpinnerComponent from "@/components/SpinnerComponent.vue";
import api from "@/api";
export default {
  name: 'App',

  components: {
    // History,
    SpinnerComponent
  },

  setup() {
    const isOpen = ref(false);

    function toggleDropdown() {
      isOpen.value = !isOpen.value;
    }

    return { isOpen, toggleDropdown };
  },

  data() {
    return {
      // user: useUser(),
      userItem: {},
      isMobile: false,
      loading_logout: false,
      spinner_text: "",
      showBar: true,
      username: "",
      maxProducts: null,
      remainingProducts: null,
    };
  },

  computed: {
    ...mapState(['user', 'isUserConnected', 'subscriptionPlan'])
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
      } else {
        console.error("No username found");
        this.$store.commit('logout');
        this.$router.push("/login");
      } 
    } else {
      console.error("error user");
      this.$store.commit('logout');
      this.$router.push("/login");
    }

    if (window.innerWidth < window.innerHeight) {
      this.showBar = false;
    }

    this.getActiveSubscription();
 },

  created() {
    window.addEventListener('storage', this.handleStorageEvent);
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener('storage', this.handleStorageEvent);
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

    getActiveSubscription() {
          console.log('User sidebar  : ' + JSON.stringify(this.user));
          console.log('User id : ' + JSON.parse(this.user).id);
            // Code to get the active subscription goes here
            api.get('/api/v1/subscription-active' + '?userId=' + JSON.parse(this.user).id)
            .then((response) => {
                console.log('Subscription test plan : ' +  response.data.plan);
                switch (response.data.plan) {
                  case 'BASIC' || 'Basic':
                    console.log('Plan BASIC');
                    this.maxProducts = 5;
                    break;
                  case 'STANDARD' || 'Standard':
                    console.log('Plan STANDARD');
                    this.maxProducts = 25;
                    break;
                  case 'PREMIUM' || 'Premium':
                    console.log('Plan PREMIUM');
                    this.maxProducts = 100;
                    break;
                  default:
                    console.error('Plan inconnu');
                    break;
                }
                this.remainingProducts = this.maxProducts - response.data.apiCallsMade;
            })
            .catch((error) => {
              console.error("Error get active subscription : " + error);
            });
        },

    async logout2() {
      console.log("test logout")
      this.$emit('close-sidebar')
      this.spinner_text = "Deconnexion en cours..";
      this.loading_logout = true;
      await this.wait(1000);
      this.loading_logout = false;
      this.$store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
      router.push("/login");
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
      } else {
        console.log("storage item not found");
      }
      this.loading_logout = false;
      this.isOpen = false;
      this.isUserConnected = false
      router.push("/");
    },

    redirectLogin() {
      this.$emit('close-sidebar')
      router.push("/login");
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
