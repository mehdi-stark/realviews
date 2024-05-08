<template>
  <!-- <div id="app" :class="isMobile ? 'flex flex-col' : 'flex'"> -->
  <div id="app" class="h-full relative">
    <!-- Mobile -->
    <div class="hidden h-full md:flex 
    md:w-80
    md:flex-col 
    md:fixed 
    md:inset-y-0 
    z-[80] 
    bg-custom-purple">
    <Sidebar/>
    </div>
  </div>
  
  <!-- Contenu principal qui change avec les routes -->
  <div id="main_content" class="md:pl-80">
    <Navbar />

    <!-- Contenu principal -->
    <!-- ... -->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import router from "@/router";
import { ref, onMounted } from 'vue';
import { mapState } from 'vuex';
// import Sidebar from "./components/SidebarPage.vue";

export default {
  name: 'App',

  components: {
    // Sidebar,
    Navbar
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
      router.push("/");
    },

    redirectLogin() {
      this.isOpen.value = !this.isOpen.value;
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
  z-index: 20; /* Higher z-index */
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