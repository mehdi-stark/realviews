<template>
  <div id="app" class="flex">
    <!-- Sidebar fixe sur le côté -->
    <Sidebar class="h-screen overflow-hidden" />

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
import SidebarPage from "./components/SidebarPage.vue";

export default {
  components: {
    Sidebar
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

</style>