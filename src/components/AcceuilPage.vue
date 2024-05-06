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
        <div class="video-container">
        <iframe 
        src="https://www.youtube.com/embed/Y2Dps_AMLsQ?si=6DppwumiuH7OjWj8" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>
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
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* Aspect ratio for 16:9 videos */
  overflow: hidden;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (min-width: 860px) { /* Apply these styles on screens larger than 1024px */
  .video-container {
    width: 860px;
    height: 515px;
    padding-bottom: 0;
  }

  .video-container iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
