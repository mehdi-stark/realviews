<template>
  <!-- Header -->
  <div id="header">
    <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
      <span class="ml-3 flex justify-start font-bold p-3">Generer</span>
      <div class="logo h-6 w-6 flex justify-end">
        <img
          src="../assets/question.png"
          alt="SprintPro Logo"
          class="place-items-center mr-8"
        />
      </div>
    </header>
  </div>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <h1 class="text-4xl font-bold mb-5">Generez des avis <span class="text-purple-600">en <br/> un clic</span> grâce à l’IA</h1>
    <div class="text-center">
      <div class="bg-purple-600 text-white p-8 rounded-lg">
        <h2 class="text-lg underline">Selectionner la source</h2>
        <div class="flex flex-col justify-around mt-4">
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow mb-2">
            <router-link to="/amazon" id="gettingStarted">Lien Amazon</router-link> 
          </button>
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow mb-2">
            <router-link to="/amazon" id="gettingStarted">Lien Aliexpress</router-link> 
          </button>
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow mb-2">
            Site Shopify
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrapperPage',
  // Vous pouvez ajouter ici la logique de composant nécessaire pour le scraping
};
</script>

<style>
/* Ici, vous pouvez ajouter des styles globaux ou des styles spécifiques au composant */
</style>
