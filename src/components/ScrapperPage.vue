<template>
  <!-- Header -->
  <div id="header">
    <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
      <span class="ml-3 flex justify-start font-bold p-3">Scrapper</span>
      <div class="logo h-6 w-6 flex justify-end">
        <img
          src="../assets/question.png"
          alt="SprintPro Logo"
          class="place-items-center mr-8"
        />
      </div>
    </header>
  </div>
  <h1 class="text-4xl font-bold mt-10">Scrappez des avis <span class="text-purple-600">en <br/> un clic</span> grâce à l’IA</h1>
  <div class="flex items-center justify-center min-h-screen bg-white">
    <div class="text-center">
      <div class="bg-purple-600 text-white p-4 rounded-lg">
        <h2 class="text-lg">Selectionner la source</h2>
        <div class="flex justify-around mt-4">
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow">
            Lien Amazon
          </button>
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow">
            Lien Aliexpress
          </button>
          <button class="bg-white text-purple-600 font-semibold py-2 px-4 border border-purple-600 rounded shadow">
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
