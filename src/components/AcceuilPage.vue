<template>
  <div class="flex h-screen bg-white text-white">
    <!-- Content -->
    <div class="flex-1 bg-white text-black">
      <!-- Header -->
      <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
        <span class="ml-3 flex justify-start font-bold p-3">Accueil</span>
        <div class="logo h-6 w-6 flex justify-end">
          <img
          src="../assets/question.png"
          alt="SprintPro Logo"
          class="place-items-center mr-8"
          />
        </div>
     </header>
      <!-- ... contenu supplémentaire ... -->
      <div class="flex flex-col justify-center items-center h-screen">
        <h1 class="text-4xl justify-center items-center font-bold mb-10">Donner du Trust à votre boutique <span class="text-purple-600">EN <br/> UN CLIC</span> grâce à l’IA</h1>
        <!-- <iframe
          class="w-3/4 h-auto md:w-1/2 lg:w-2/3 xl:w-3/4"
          src="https://www.youtube.com/embed?v=Y2Dps_AMLsQ"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen>
        </iframe> -->
        <iframe width="860" height="515" 
        src="https://www.youtube.com/embed/Y2Dps_AMLsQ?si=6DppwumiuH7OjWj8" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      player: null,
    };
  },

  mounted() {
  },

  beforeUnmount() {
  },
};
</script>

<style>
/* ... styles Tailwind personnalisés ... */
</style>
