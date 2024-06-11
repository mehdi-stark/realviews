<template>
  <!-- Header -->
  <HeaderComponent title="Generer"/>
  
  <div class="flex flex-col items-center justify-center min-h-screen bg-white 
  px-3
  mb-5
  space-y-5
  mt-[80px]
  md:mt-0
  md:px-6 
  lg:px-8">
    <h1 class="text-4xl md:text-5xl font-bold mb-1">Génèrer* des avis <span class="text-purple-600">EN UN CLIC</span> grâce à l’IA</h1>
    <p class="text-lg italic mb-4">*Mettre en ligne des faux avis est illégal, cette section est présentée uniquement à titre éducatif.</p>

    <!-- section 1 -->
    <div class="bg-custom-purple 
    rounded-xl
    mb-3 
    p-4 
    w-full
    md:px-6 
    md:w-[950px]
    lg:px-8">

      <!-- Lien Amazon -->
      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-10 p-5 md:p-8">
        <h3 type="text" class="text-xl md:text-2xl text-white p-2 mb-2 font-bold">Depuis un lien Amazon</h3>
        <input type="text" class="bg-white border md:ml-4 border-gray-300 rounded-full p-4 w-full md:w-96" v-model="amazonLink" autocomplete="on">
        <button @click="generateAmazon()" class="bg-purple-600 text-white font-bold text-xl py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-full md:w-32 h-14">Générer</button>
      </div>

      <!-- Lien Aliexpress -->
      <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-10 p-8">
        <h3 type="text" class="text-xl md:text-2xl text-white p-2 mb-2 font-bold">Depuis un lien Aliexpress</h3>
        <input type="text" class="g-white border md:ml-4 border-gray-300 rounded-full p-4 w-full md:w-96" v-model="aliexpressLink">
        <button @click="generateAliexpress()" class="bg-purple-600 text-white text-xl font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-full md:w-32 h-14">Générer</button>
      </div>
    </div>

     <!-- section 2 -->
      <div id="description" 
      class="flex flex-col items-center justify-center 
      bg-custom-indigo 
      rounded-xl 
      mt-3 
      mb-5 
      p-5
      w-full 
      lg:w-950px" 
      style="max-width: 950px;">
    <!-- <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" style="width: 950px"> -->
      <h3 type="text" class="text-2xl
      md:text-3xl text-white p-2 font-bold">Depuis une description* produit</h3>
      <p class="text-md mb-6 text-white p-2">* Plus votre description sera précise, plus les avis seront pertinents</p>
      <textarea class="bg-white border-double border-8 border-gray-400 rounded-xl p-2 mb-2 
      md:max-w-[750px]
      md:max-h-[200px]
      h-48
      md:h-64 
      w-full" 
      v-model="productDescription"></textarea>
      <!-- <textarea class="bg-white border-double border-8 border-gray-400 rounded-lg p-2 mb-2 h-64" style="width: 750px; height: 200px;" v-model="productDescription"></textarea> -->
      <button @click="generate()" class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-full md:w-32 h-12 mt-2 mb-5">Générer</button>
    </div>
  </div>

  <!-- Modale  -->
  <GenerateModal v-if="showModal"></GenerateModal>

  <ProductSuggestion v-if="showSuggestion" :products="products"></ProductSuggestion>

  <!-- Spinner -->
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95">
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <iframe class="p-6" src="https://lottie.host/embed/ab95f673-b879-48e7-a7d1-6ae2d3425e4d/Pnh6UZfIwU.json"></iframe>
      <p class="text-blue-loader-animation mt-2 text-center text-lg" v-html="spinner_text"></p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GenerateModal from '@/components/modals/GenerateModal.vue';
import HeaderComponent from './HeaderComponent.vue';
import api from '@/api';
import ProductSuggestion from '@/components/modals/ProductSuggestionModal.vue';

export default {
  name: 'ScrapperPage',

  components: {
    GenerateModal,
    HeaderComponent,
    ProductSuggestion
  },

  data() {
    return {
      shopifyLink: 'Shopify',
      amazonLink: null,
      showModal: null,
      amazonLinkFilled: false,
      aliexpressLinkFilled: false,
      productDescription: "",
      form: {
        product_link: "",
        description: "",
      },
      current_user: null,
      access_token: "",
      spinner_text: null,
      loading: false,
      showSuggestion: false,
    };
  },

  computed: {
    ...mapState(['user', 'accessToken', 'isUserConnected']),
  },

  mounted() {
    this.showModal = false
    window.addEventListener('keydown', this.handleEsc);

    if (!this.user || !this.accessToken) {
      console.error("user or token not present ! Login is required !");
      this.$store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
    } else {
      this.current_user = JSON.parse(this.user);
      console.log("Current user in new generate product mounted: " + JSON.stringify(this.current_user));
      console.log("Current user ID in productlist mounted: " + this.current_user.id);
      console.log("Current access-token in productlist mounted: " + this.access_token);
    }
  },

  beforeUnmount() {
    // Nettoyez l'écouteur quand le composant va être détruit
    window.removeEventListener('keydown', this.handleEsc);
  },

  methods: {
    generateAmazon() {
      // if (!this.amazonLink || !this.amazonLink.includes('www.amazon.')) {
      //   alert("Veuillez entrer un lien Amazon valide avant de générer !");
      //   return;
      // }
      this.showModal = true
      this.form.product_link = this.amazonLink;
    },

    generateAliexpress() {
      if (!this.aliexpressLink) {
        alert("Veuillez entrer un lien Aliexpress valide avant de générer !");
        return;
      }
      this.showModal = true
      this.form.product_link = this.aliexpressLink;
    },

    generate() {
      if (!this.productDescription) {
        alert("Veuillez entrer une description de produit avant de générer !");
        return;
      }
      // this.showModal = true
      this.form.description = this.productDescription;
      api.post('/api/v1/generate', this.form)
        .then((response) => {
          // console.log(response.data);
          this.spinner_text = "Interrogation de l'IA pour générer des avis";
          this.loading = true;
          this.wait(1000).then(() => {
            this.loading = false;
            this.products = response.data;
            this.showSuggestion = true;
          });
        })
        .catch((error) => {
          console.error(error);
          this.spinner_text = "Une erreur s'est produite lors de la génération des avis";
          this.loading = true;
          this.wait(5000).then(() => {
            this.loading = false;
          });
        });

    },

    closeForm() {
      console.log("close form called");
      if (this.showSuggestion)
        this.showSuggestion = false;
      // else
      //   this.showModal = false
    },
    
    handleEsc(event) {
      // Fermez la modale si la touche Esc est pressée
      if (event.key === 'Escape') {
        this.closeForm();
      }
    },

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
  }

};
</script>

<style>
/* Ici, vous pouvez ajouter des styles globaux ou des styles spécifiques au composant */
@media (min-width: 1024px) { /* This is the breakpoint for 'lg' in Tailwind CSS */
.lg\:w-950px {
  width: 950px;
  }
}
</style>
