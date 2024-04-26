<template>
  <div class="flex h-screen bg-white text-white">
    <!-- Sidebar -->
    <aside class="w-80 h-screen bg-gray-800" aria-label="Sidebar">
      <!-- logo sidebar -->
      <div class="logo max-h-35">
        <img
        src="../assets/logo-transp.png"
        alt="SprintPro Logo"
        class="place-items-center"
      />
      </div>

      <div class="overflow-y-auto py-4 px-3 bg-gray-800 rounded dark:bg-gray-800 space-between-10 h-screen">
          <!-- Navigation element Sidebar -->
        <div class="navigation_element content-start">
          <h3 class="text-slate-200">Navigation</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"> Accueil</span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3"><router-link to="/scrapper" id="gettingStarted">Scrapper</router-link></span>
              </a>
            </li>
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
                <span class="ml-3">Generer</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Communaute element Sidebar -->
        <div class="communaute_element">
          <h3 class="text-slate-200">Communaute</h3>
          <ul class="space-y-2">
            <li>
              <a href="#" class="flex items-center p-2 text-base font-normal text-white rounded-lg dark:text-white hover:bg-gray-700">
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
        <div class="parametre_element justify-items-end">
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
          </ul>
        </div>
      </div>
    </aside>
    <!-- Content -->
    <div id="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import videojs from "video.js";
import 'videojs-youtube'

export default {
  name: 'App',
  data() {
    return {
      player: null,
    };
  },

  mounted() {
    this.player = videojs(this.$refs.videoPlayer, {
      techOrder: ['youtube'],
      sources: [{
        type: 'video/youtube',
        src: 'https://www.youtube.com/embed/moQtMet7F7w'
      }],
      youtube: {
        ytControls: 2
      },
      controls: true,
      autoplay: false,
      preload: 'auto'
    });
  },

  beforeUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style>
/* ... styles Tailwind personnalisés ... */
</style>
