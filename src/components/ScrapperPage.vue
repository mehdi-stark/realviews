<template>
  <!-- Header -->
  <HeaderComponent title="Scraper" />
  <div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <h1 class="text-5xl text-center font-bold mb-5">Scraper des avis <span class="text-custom-purple-container">en <br/> un clic</span> grâce à l’IA</h1>
    <div class="flex items-center justify-center" style="width: 450px; height: 400px;">
      <!-- <div class="text-center"> -->
        <div class="bg-custom-purple-container text-black p-8 rounded-lg w-full h-full flex flex-col justify-center items-center">
        <h2 class="text-4xl font-bold underline mb-10">Selectionner la source</h2>
        <div class="flex flex-col justify-around mt-4">
          <button class="bg-custom-purple-button text-white font-semibold py-2 px-4 text-2xl border border-purple-600 rounded-full 
          shadow mb-2 flex justify-start items-center" style="max-width: 350px">
            <img src="../assets/Amazon-icon.svg" alt="Logo Amazon" class="mr-3" width="24" height="24"> <!-- Ajoutez le chemin vers votre logo Amazon -->
            <router-link :to="{ name: 'amazon', params: { provider: 'amazon' } }">Lien Amazon</router-link> 
          </button>
          <button class="bg-custom-purple-button text-white font-semibold py-2 px-4 text-2xl border border-purple-600 rounded-full 
          shadow mb-2 flex justify-center items-center">
            <img src="../assets/aliexpress-logo.png" alt="Logo Aliexpress" class="mr-3" width="24" height="24">
            <router-link :to="{ name: 'amazon', params: { provider: 'aliexpress' } }">Lien Aliexpress</router-link> 
          </button>
          <button class="bg-custom-purple-button text-white font-semibold py-2 px-4 text-2xl border border-purple-600 rounded-full 
          shadow mb-2 flex justify-start items-center">
            <img src="../assets/shoping.png" alt="Logo shopify" class="mr-3" width="24" height="24">
            <router-link :to="{ name: 'amazon', params: { provider: 'shopify' } }">Site Shopify</router-link> 
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';

export default {
  name: 'ScrapperPage',
  // Vous pouvez ajouter ici la logique de composant nécessaire pour le scraping
  data() {
    return {
      shopifyLink: 'Shopify'
    };
  },

  components: {
    HeaderComponent,
  },  
};
</script>

<style>
/* Ici, vous pouvez ajouter des styles globaux ou des styles spécifiques au composant */
</style>
