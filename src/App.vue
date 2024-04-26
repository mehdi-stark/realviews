<template>
  <div id="app" class="flex">
    <!-- Sidebar fixe sur le côté -->
    <Sidebar />

    <!-- Contenu principal qui change avec les routes -->
    <div class="flex-1 overflow-auto">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/SidebarPage.vue';

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
html, body {
  height: 100%;
  margin: 0;
}
</style>