<template>
    <div class="fixed inset-0 flex items-center justify-center bg-gray-800  bg-opacity-85 z-[20]"
    @click="closeForm">
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5 w-3/4 md:w-1/2 lg:w-1/3"
    @click.stop>
      <h3 type="text" class="text-2xl md:text-3xl text-white p-2 font-bold underline mb-8">Let's go !</h3>
      <form @submit.prevent="generateProduct()" class="space-y-10 mt-10 w-full px-3 md:px-6 lg:px-8">
        <div class="form-group">
              <label for="product_handle" class="text-white text-lg md:text-xl font-bold">Product handle</label>
              <input
                type="text"
                id="product_handle"
                v-model="form.product_handle"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
              />
              <p v-if="form.number > maxComments" class="text-red-500">Le nombre d'avis ne peut pas dépasser {{ maxComments }}.</p>
            </div>
        <div class="form-group">
              <label for="comments" class="text-white text-lg md:text-xl font-bold">Nombre d'avis (maximum {{ maxComments }})</label>
              <input
                type="number"
                id="comments"
                v-model="form.comments_number"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
              />
              <p v-if="form.comments_number > maxComments" class="text-red-500">Le nombre d'avis ne peut pas dépasser {{ maxComments }}.</p>
            </div>
            <div class="form-group">
              <div class="mt-4">
                <label for="language" class="text-white text-lg md:text-xl font-bold">Langue des avis</label>
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
              <button type="submit" class="bg-purple-600 
              text-lg
              md:text-xl text-white 
              font-bold 
              py-2 px-4 
              rounded-full 
              hover:bg-purple-700 cursor-pointer 
              w-full 
              md:w-32 
              h-12 mt-2 
              mb-5">Générer</button>
            </div>
      </form>
    </div>
  </div>

  <SpinnerLottieComponent v-if="loading" :spinner_text="spinner_text"></SpinnerLottieComponent>
</template>

<script>
import api from '@/api';
import router from '@/router';
import { mapState } from 'vuex';
import SpinnerLottieComponent from '@/components/SpinnerLottieComponent.vue';
import subscriptionService from '@/services/subscriptionService';

export default {
    name: 'MyComponent',

    computed: {
      ...mapState(['user', 'accessToken', 'isUserConnected', 'subscriptionPlan']),
    },

    components: {
      SpinnerLottieComponent,
    },

    props: {
        product: {
            type: Object,
            required: false,
        },

        productDescription: {
            type: String,
            required: false,
        },
    },

    data() {
        return {
            // Your data properties go here
            showModal: null,
            maxComments: 25,
            form: {
              user_id: "",
              product_handle: "",
              description: "",
              product_link: "",
              language: "francais",
              comments_number: null,
            },
            access_token: "",
            spinner_text: null,
            loading: false
        };
    },

    mounted() {
        // Code to run when the component is mounted goes here
        window.addEventListener('keydown', this.handleEsc);
        console.log("product on generate modal : " + JSON.stringify(this.product));
        console.log("description on generate modal : " + this.productDescription);

        // Set the maximum number of comments based on the subscription plan
        this.maxComments = subscriptionService.getMaxComments(this.subscriptionPlan);
    },

    beforeUnmount() {
        // Code to run before the component is unmounted goes here
        window.removeEventListener('keydown', this.handleEsc);
    },

    methods: {
    // Your methods go here
    // API Call to insert a new product on the DB
    async generateProduct() {
      console.log("Current user in generated mounted: " + this.user);
      console.log("Current user ID in generated mounted: " + JSON.parse(this.user).id);

      this.loading = true;
      this.spinner_text = 'Generation des commentaires .. <br/>Veuillez patientez cela peut prendre plusieurs minutes';

        // construct request object
        if (this.user) {
          console.log('Current User id dans submit: ' + JSON.parse(this.user).id);
          this.form.user_id = JSON.parse(this.user).id
        }
        this.form.product_name = 'unamed_product'
        this.form.provider = 'amazon'
        this.form.description = this.productDescription
        let response = null;
        try {

          // If the product link is not provided, generate comments without scrapping
          if (this.form.product_link === null || this.form.product_link === '' || this.form.product_link === undefined) {
            console.log('Generating comments without scrapping')
            console.log('Form data : ' + JSON.stringify(this.form))
            response = await api.post('/api/v1/generate', this.form, {
            responseType: 'arraybuffer', // Définir le type de réponse sur 'arraybuffer'
          })          
        }
        // If the product link is provided, generate comments by scrapping the product
        else {
           response = await api.post('/api/v1/scrapping-product', this.form, {
            responseType: 'arraybuffer', // Définir le type de réponse sur 'arraybuffer'
          })
        }
        
          this.spinner_text = 'Generation du fichier Excel ..';
          await this.wait(1000);

          const excelArrayBuffer = response.data; // Utiliser response.data au lieu de response.arrayBuffer()
          const blob = new Blob([excelArrayBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank'; // Ouvre le lien dans une nouvelle fenêtre
          link.download = this.form.product_handle !== "" ? this.form.product_handle + '.xlsx' : 'comments_gen.xlsx';
          link.click();
          this.showModal = false
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
      this.amazonLink = null
      this.aliexpressLink = null
      this.showModal = false
    },

    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    
    handleEsc(event) {
      // Fermez la modale si la touche Esc est pressée
      if (event.key === 'Escape') {
        this.closeForm();
      }
    },

  },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>