<template>
  <!-- Header -->
  <div id="header">
    <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
      <span class="ml-3 flex justify-start font-bold p-3">Generer</span>
      <div class="logo h-6 w-6 flex justify-end">
        <img
          src="../assets/question.png"
          class="place-items-center mr-8"
        />
      </div>
    </header>
  </div>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <h1 class="text-5xl font-bold mb-1">Génèrer* des avis <span class="text-purple-600">EN UN CLIC</span> grâce à l’IA</h1>
    <div class="text-lg italic mb-4">*Mettre en ligne des faux avis est illégal, cette section est présentée uniquement à titre éducatif.</div>
    <!-- section 1 -->
    <div class="bg-custom-purple rounded-xl mb-3">
      <div class="flex items-center justify-center space-x-10 p-8">
        <h3 type="text" class="text-2xl text-white p-2 mb-2 font-bold">Depuis un lien Amazon</h3>
        <input type="text" class="bg-white border ml-4 border-gray-300 rounded-full p-4 placeholder-gray-500 w-96" v-model="amazonLink">
        <button @click="generate('amazon')" class="bg-purple-600 text-white font-bold text-xl py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-14">Générer</button>
      </div>
      <div class="flex items-center justify-center space-x-10 p-8">
        <h3 type="text" class="text-2xl text-white p-2 mb-2 font-bold">Depuis un lien Aliexpress</h3>
        <input type="text" class="bg-white border border-gray-300 rounded-full p-4 placeholder-gray-500 w-96" v-model="aliexpressLink">
        <button @click="generate('aliexpress')" class="bg-purple-600 text-white text-xl font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-14">Générer</button>
      </div>
    </div>
     <!-- section 2 -->
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" style="width: 950px">
      <h3 type="text" class="text-3xl text-white p-2 font-bold">Depuis une description* produit</h3>
      <div class="text-md mb-6 text-white">*Plus votre description sera précise, plus les avis seront pertinents</div>
      <textarea class="bg-white border-double border-8 border-gray-400 rounded-lg p-2 mb-2 h-64" style="width: 750px" v-model="productDescription"></textarea>
      <button @click="generate('description')" class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-12 mt-2 mb-5">Générer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScrapperPage',
  // Vous pouvez ajouter ici la logique de composant nécessaire pour le scraping
  data() {
    return {
      shopifyLink: 'Shopify'
    };
  }
};
</script>

<style>
/* Ici, vous pouvez ajouter des styles globaux ou des styles spécifiques au composant */
</style>
