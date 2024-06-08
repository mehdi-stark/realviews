<template>
  <div class="flex h-screen bg-white text-white">
    <!-- Content -->
    <div class="flex-1 bg-white text-black">
      <!-- Header -->
      <HeaderComponent title="Acceuil" />

      <!-- ... contenu supplémentaire ... -->
      <div class="flex flex-col justify-center items-center h-screen p-3">
        <h1 class="text-4xl justify-center text-center font-bold mb-10">Donner du Trust à votre boutique <span class="text-purple-600">EN <br/> UN CLIC</span> grâce à l’IA</h1>
        <div class="video-container">
        <iframe 
        src="https://www.youtube.com/embed/i4in66EBF9Y?si=pAG1q-7zxUmyzSP4" 
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
import HeaderComponent from './HeaderComponent.vue';


export default {
  name: 'App',
  data() {
    return {
      player: null,
    };
  },

  components: {
    HeaderComponent,
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