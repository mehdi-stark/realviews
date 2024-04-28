<template>
      <div class="inset-0 flex items-center justify-center h-full w-full mx-auto text-black">
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <form @submit.prevent="scrapProduct" class="space-y-4">
            <div class="form-group">
              <label for="amazon_link" class="text-gray-600">Lien produit {{ maProp }}</label>
              <input
                type="link"
                id="amazon_link"
                v-model="form.amazon_link"
                required
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div class="form-group">
              <label for="product_name" class="text-gray-600">Product Handle</label>
              <input
                type="text"
                id="product_name"
                v-model="form.product_name"
                required
                class="mt-1 p-2 border rounded-md w-full"
              />
            </div>
            <div class="form-group">
              <label for="description" class="text-gray-600 bold"
                >Description du produit</label
              >
              <textarea
                id="description"
                v-model="form.description"
                class="mt-1 p-2 border rounded-md w-full"
              ></textarea>
            </div>

            <div class="form-group">
              <div class="mt-4">
                <label for="language" class="text-gray-600">Langue</label>
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
            <div class="form-group">
              <label for="comments" class="text-gray-600">Nombre de Commentaires</label>
              <input
                type="number"
                id="comments"
                v-model="form.number"
                required
                class="mt-1 p-2 border rounded-md w-full"
                min="1"
              />
            </div>
            <div class="form-group justify-center space-y-4">
              <button
                type="submit"
                class="w-full bg-cyan-500 text-white hover:bg-purple-600 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 py-2 px-4 rounded-md"
              >
                Generer
              </button>
              <button
                @click="closeForm"
                class="mt-4 text-gray-500 hover:text-gray-700 focus:outline-none mx-auto block submit-button bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:border-purple-700 focus:ring focus:ring-purple-200 w-20 h-9 py-2 px-4 rounded-md mt-2"
                >
                Fermer
              </button>
            </div>
          </form>
          <div
            v-if="loading"
            class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
          >
            <div class="bg-white p-6 rounded-lg shadow-lg">
              <div class="flex flex-col items-center">
                <div
                  class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"
                ></div>
                <!-- <p class="text-gray-600 mt-2">Récupération des commentaires...</p> -->
                <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>

<script>
import axios from 'axios'
import router from '@/router'

export default {
  name: 'AmazonPage',

  props: {
    maProp: {
      type: String, // Type attendu
      required: true // Rend la prop obligatoire
    }
  },

  data() {
    return {
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
        amazon_link: "",
        language: "francais",
        number: null,
      },
      loading: false,
      loading_products: false,
      result: null,
      showModal: false,
      current_user: null,
      access_token: "",
    };
  },

  mounted() {
    if (!localStorage.getItem("user") || !localStorage.getItem("access_token")) {
      console.error("user or token not present ! Login is required !");
      router.push("/login");
    } else {
      this.current_user = JSON.parse(localStorage.getItem("user"));
      this.access_token = localStorage.getItem("access_token");

      console.log(
        "Current user in productlist mounted: " + JSON.stringify(this.current_user)
      );
      console.log("Current user ID in productlist mounted: " + this.current_user.id);
      console.log("Current access-token in productlist mounted: " + this.access_token);
    }
  },

  methods: {
      // API Call to insert a new product on the DB
      async scrapProduct() {
        console.log('URL to call : ' + process.env.VUE_APP_ROOT_API);

        this.spinner_text = 'Recuperation des commentaires ..';
        this.loading = true;
        console.log('URL called : ' + process.env.VUE_APP_ROOT_API);

        // construct request object
        console.log('Current User id dans submit: ' + this.current_user.id);
        this.form.user_id = this.current_user.id
        try {
          const response = await axios.post(process.env.VUE_APP_ROOT_API + '/api/v1/scrapping-product', this.form, {
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          },
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
