<template>
      <div class="inset-0 flex items-center justify-center h-full w-full mx-auto text-black p-3 mt-10 mb:mt-0">

        <div class="flex flex-col items-center justify-center  bg-custom-indigo rounded-lg 
        md:w-[500px]
        md:h-[650px]" 
        @click.stop>
      <h3 type="text" class="text-3xl text-white p-2 font-bold underline mt-8">Let's go !</h3>
      <form @submit.prevent="scrapProduct()" class="space-y-10 mt-10 p-5">
            <div class="form-group">
              <label for="amazon_link" class="text-white text-xl font-bold">URL {{ provider }}</label>
              <input
                type="link"
                id="amazon_link"
                v-model="form.product_link"
                required
                class="mt-1 p-2 border rounded-md w-full p-3"
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
              <label for="comments" class="text-white text-xl font-bold">Nombre d'avis (maximum {{ maxComments }})</label>
              <input
                type="number"
                id="comments"
                v-model="form.number"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
              />
              <p v-if="form.number > maxComments" class="text-red-500">Le nombre d'avis ne peut pas dépasser {{ maxComments }}.</p>
              <!-- <label for="comments" class="text-white text-xl font-bold">Nombre d'avis <span class="font-thin">(maximum {{ maxComments }})</span></label>
              <input
                type="number"
                id="comments"
                v-model="form.number"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
                :max="maxComments"
              />
              <p v-if="form.number > maxComments" class="text-red-500">Le nombre d'avis ne peut pas dépasser {{ maxComments }}.</p> -->
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
              <button 
                type="submit" 
                class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-12 mt-2 mb-8"
                :class="{
                  'bg-purple-600 hover:bg-purple-700': form.number && form.language && form.number <= maxComments,
                  'bg-gray-500 cursor-not-allowed': !form.number || !form.language || form.number > maxComments
                }"                
                :disabled="!form.number || !form.language || form.number > maxComments"
              >
              Générer
            </button>
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
  <ProductLimitExceededDialog ref="productLimitDialog" />
</template>

<script>
import router from '@/router'
import api from '@/api';
// import Vue3Lottie from 'vue3-lottie';
import yourAnimationData from '../assets/animation-loader.json';
import { mapState } from 'vuex';
import ProductLimitExceededDialog from "@/components/dialog/ProductLimitExceededDialog.vue";

export default {
  name: 'AmazonPage',
  
  components: {
    ProductLimitExceededDialog
  },
  computed: {
    ...mapState(['user', 'accessToken', 'isUserConnected', 'subscriptionPlan']),
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
      maxComments: null,
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
      console.log('Subscription plan in new generate product mounted: ' + this.subscriptionPlan.plan);

      switch (this.subscriptionPlan.plan) {
        case 'BASIC':
          this.maxComments = 25;
          break;
        case 'STANDARD':
          this.maxComments = 100;
          break;
        case 'PREMIUM':
          this.maxComments = 250;
          break;
        default:
          console.error('Invalid subscription plan');
          this.maxComments = 25;
          break;
      }
    }

    // Get the max number of comments
    
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
          const response = await api.post('/api/v1/scrapping-product', this.form, {
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
          link.download = this.form.product_handle.toLowerCase().replace(" ", "_") + "_comments.xlsx";

          link.click();
          this.loading = false;
          router.push("/products");
        }
        catch (error) {
        // Handle API error
        this.loading = false; // Set loading to false to hide the modal
        console.error('Error on scrapping : ' + error)
        console.error('Error data on scrapping : ' + JSON.stringify(error.response))
        if (error.response && error.response.status === 429) {
          // Show the dialog
          console.error('Erreur 429')

          this.$refs.productLimitDialog.openDialog()
        }
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
