<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85"
    @click="closeForm">
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5 w-3/4 md:w-1/2 lg:w-1/3"
    @click.stop>
    <!-- <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" style="width: 500px; height: 650px;" -->
    <!-- @click.stop> -->
      <h3 type="text" class="text-3xl text-white p-2 font-bold underline mb-8">Let's go !</h3>
      <form @submit.prevent="generateProduct()" class="space-y-10 mt-10 w-full px-3 md:px-6 lg:px-8">
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
              <button type="submit" class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-full md:w-32 h-12 mt-2 mb-5">Générer</button>
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
</template>

<script>
import api from '@/api';
import router from '@/router';
export default {
    name: 'MyComponent',
    data() {
        return {
            // Your data properties go here
            shopifyLink: 'Shopify',
            amazonLink: null,
            showModal: null,
            amazonLinkFilled: false,
            aliexpressLinkFilled: false,
            productDescription: "",
            form: {
              user_id: "",
              product_name: "",
              description: "",
              product_link: "",
              language: "francais",
              number: null,
              provider: ""
            },
            current_user: null,
            access_token: "",
            spinner_text: null,
            loading: false
        };
    },
    methods: {
        // Your methods go here
            // API Call to insert a new product on the DB
    async generateProduct() {
        this.spinner_text = 'Recuperation des commentaires .. <br/>Veuillez patientez cela peut prendre plusieurs minutes';
        this.loading = true;

        // construct request object
        if (this.current_user) {
          console.log('Current User id dans submit: ' + this.current_user.id);
          this.form.user_id = this.current_user.id
        }
        this.form.product_name = 'unamed_product'
        this.form.provider = 'amazon'
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
    },
    mounted() {
        // Code to run when the component is mounted goes here
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>