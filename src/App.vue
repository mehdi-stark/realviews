<template>
  <div id="app" :class="isMobile ? 'flex flex-col' : 'flex'">
    <!-- Sidebar Mobile -->
    <div id="sidebar" v-if="isMobile && $route.path !== '/subscribe' && $route.path !== '/thank-you' && $route.path !== '/login'
    && $route.path !== '/signup'" 
    class="fixed 
    top-0 left-0 w-full h-16 
    bg-custom-purple text-white flex items-center 
    px-2 z-[2]">
      <button @click="toggleSidebar" class="text-3xl bg-transparent border-none text-white">
        &#9776; <!-- Unicode character for the burger menu -->
      </button>
      <transition name="slide">
        <div v-if="isOpen" class="menu fixed overflow-hidden top-0 left-0 w-3/4 
        h-full bg-custom-purple text-white 
        mb-12
        overflow-y-auto">
          <Sidebar @close-sidebar="toggleSidebar"></Sidebar>
        </div>
      </transition>
      <!-- Close sidebar button -->
      <div v-if="isOpen" class="fixed top-0 right-0 w-1/4 h-full flex items-start justify-center bg-black bg-opacity-85">
          <button @click="toggleSidebar" class="text-4xl bg-transparent border-none text-white mt-5">
            &times; <!-- Unicode character for the close button -->
          </button>
      </div>
    </div>

    <!-- Sidebar Desktop -->
    <Sidebar v-else-if="$route.path !== '/subscribe' && $route.path !== '/thank-you' && $route.path !== '/login'
    && $route.path !== '/signup'" class="h-screen overflow-hidden" />

    <!-- Contenu principal qui change avec les routes -->
    <div id="main_content" class="flex-1 overflow-auto">
      <router-view :key="$route.fullPath"></router-view>
    </div>

    <SessionExpiredDialog v-if="$store.state.showSessionExpiredDialog" @close-session-expired="closeDialog"/>
  </div>
</template>

<script>
import SessionExpiredDialog from "@/components/dialog/SessionExpiredDialog.vue";
import router from "@/router";
import { ref, onMounted } from 'vue';
import { mapState } from 'vuex';
import Sidebar from "./components/SidebarPage.vue";
// import userService from "@/services/userService";

export default {
  name: 'App',

  components: {
    Sidebar,
    SessionExpiredDialog
  },

  data() {
    return {
      // isMobile: false,
      loading_logout: false,
      spinner_text: "",
      showBar: true,
      username: "",
    };
  },
  
  setup() {
    const isOpen = ref(false);
    const isMobile = ref(window.innerWidth < 768);
    const isDropdownOpen = ref(false);

    const checkScreenSize = () => {
      console.log("check screen size");
      isMobile.value = window.innerWidth < 768;
    };
 
    function toggleDropdown() {
      isDropdownOpen.value = !isDropdownOpen.value;
    }

    function toggleSidebar() {
      isOpen.value = !isOpen.value;
    }

    onMounted(() => {
      window.addEventListener('resize', checkScreenSize);
      checkScreenSize();
    });

    return {
      isOpen,
      isMobile,
      isDropdownOpen,
      toggleDropdown,
      toggleSidebar,
    };
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

  beforeMount() {
    window.addEventListener("resize", this.checkScreenSize);

    // this.userItem = JSON.parse(this.user);
    // this.username = userService.getUsername(this.userItem);

    if (window.innerWidth < window.innerHeight) {
      this.showBar = false;
    }
 },

 mounted() {
  },

  created() {
    window.addEventListener('storage', this.handleStorageEvent);

    setInterval(() => {
      console.log("Checking token expiration");
      this.$store.dispatch('checkTokenExpiration');
    }, 60000); // Vérifiez toutes les minutes
  },

  beforeUnmount() {
    window.removeEventListener("resize", this.checkScreenSize);
    window.removeEventListener('storage', this.handleStorageEvent);
  },

  methods: {
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

    async logout() {
      this.spinner_text = "Deconnexion en cours..";
      this.loading_logout = true;
      await this.wait(1000);
      this.loading_logout = false;
      this.$store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
      router.push("/login");
    },

    closeDialog() {
      this.$store.commit('closeSessionExpiredDialog');
    },

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  }
};
</script>

<style>
/* Styliser la sidebar pour qu'elle soit fixe */
.menu {
  overflow-y: auto; /* Permet le défilement vertical si le contenu dépasse */
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
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