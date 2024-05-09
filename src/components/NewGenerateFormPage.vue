<template>
      <div class="inset-0 flex items-center justify-center h-full w-full mx-auto text-black">

        <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" 
        style="width: 500px; height: 650px;"
        @click.stop>
      <h3 type="text" class="text-3xl text-white p-2 font-bold underline mb-8">Let's go !</h3>
      <form @submit.prevent="scrapProduct()" class="space-y-10 mt-10">
            <div class="form-group">
              <label for="amazon_link" class="text-white text-xl font-bold">URL produit</label>
              <input
                type="link"
                id="amazon_link"
                v-model="form.product_link"
                required
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div class="form-group">
              <label for="amazon_link" class="text-white text-xl font-bold">Product handle</label>
              <input
                type="link"
                id="amazon_link"
                v-model="form.product_handle"
                required
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div class="form-group">
              <label for="comments" class="text-white text-xl font-bold">Nombre d'avis</label>
              <input
                type="number"
                id="comments"
                v-model="form.number"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
              />
            </div>
            <div class="form-group">
              <div class="mt-4">
                <label for="language" class="text-white text-xl font-bold">Langue des avis</label>
                <select
                  id="language"
                  v-model="form.language"
                  name="language"
                  class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="anglais">Anglais</option>
                  <option value="francais">Français</option>
                  <option value="espagnol">Espagnol</option>
                </select>
              </div>
            </div>

            <div class="form-group flex flex-col items-center space-y-4">
              <button type="submit" class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-12 mt-2 mb-5">Générer</button>
              <!-- <button
                @click="closeForm"
                class="mt-2 hover:text-gray-700 focus:outline-none mx-auto block submit-button bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 w-20 h-9 py-2 px-4 rounded-md"
                >
                Fermer
              </button> -->
            </div>
      </form>
    </div>
  </div>
    <!-- Spinner -->
    <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95">
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <iframe class="p-6" src="https://lottie.host/embed/ab95f673-b879-48e7-a7d1-6ae2d3425e4d/Pnh6UZfIwU.json"></iframe>
      <p class="text-blue-loader-animation mt-2 text-center text-lg" v-html="spinner_text"></p>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import api from '@/api';
// import Vue3Lottie from 'vue3-lottie';
import yourAnimationData from '../assets/animation-loader.json';
import { mapState } from 'vuex';

export default {
  name: 'AmazonPage',
  
  // components: {
  //   Vue3Lottie,
  // },
  computed: {
    ...mapState(['user', 'accessToken', 'isUserConnected']),
  },

  props: {
    maProp: {
      type: String, // Type attendu
      required: true // Rend la prop obligatoire
    },
    provider: {
      type: String, // Type attendu
      required: true // Rend la prop obligatoire
    }
  },

  data() {
    return {
      yourAnimationData,
      token: null,
      langue: "Français",
      product_id: null,
      file: "",
      spinner_text: null,
      selectedImage: null,
      products: [],
      form: {
        user_id: "",
        product_name: "",
        description: "",
        product_link: "",
        language: "francais",
        number: null,
        provider: "",
      },
      loading: false,
      loading_products: false,
      result: null,
      showModal: false,
      current_user: null,
    };
  },

  mounted() {
    if (!this.user || !this.accessToken) {
      console.error("user or token not present ! Login is required !");
      this.$store.commit('logout'); // Utiliser une mutation pour déconnecter l'utilisateur
      router.push("/login");
    } else {
      this.current_user = JSON.parse(this.user);
      // Update provider in the form with the route param
      this.form.provider = this.$route.params.provider;

      console.log("Current user in new generate product mounted: " + JSON.stringify(this.current_user));
      console.log("Current user ID in productlist mounted: " + this.current_user.id);
      console.log("Current access-token in productlist mounted: " + this.accessToken);
      console.log("Provider: " + this.form.provider)
    }
  },

  methods: {
      // API Call to insert a new product on the DB
      async scrapProduct() {
        this.spinner_text = 'Recuperation des commentaires .. <br/>Veuillez patientez cela peut prendre plusieurs minutes';
        this.loading = true;

        // construct request object
        console.log('Current User id dans submit: ' + this.current_user.id);
        this.form.user_id = this.current_user.id
        try {
          const response = await api.post(process.env.VUE_APP_ROOT_API + '/api/v1/scrapping-product', this.form, {
            responseType: 'arraybuffer', // Définir le type de réponse sur 'arraybuffer'
          })
 
          this.spinner_text = 'Generation du fichier Excel ..';
          await this.wait(1000);
          const excelArrayBuffer = response.data; // Utiliser response.data au lieu de response.arrayBuffer()
          const blob = new Blob([excelArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;

          link.target = '_blank'; // Ouvre le lien dans une nouvelle fenêtre
          link.download = 'comments_gen.xlsx';
          link.click();
          this.loading = false;
          router.push("/products");
        }
        catch (error) {
        // Handle API error
        this.loading = false; // Set loading to false to hide the modal
        console.error('Error on scrapping : ' + error)
      }
    },

    closeForm() {
      router.push('/scrapper')
    },
    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

};
</script>

<style>
/* Ici, vous pouvez ajouter des styles globaux ou des styles spécifiques au composant */
</style>
