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
        <input type="text" class="bg-white border ml-4 border-gray-300 rounded-full p-4 w-96" v-model="amazonLink" autocomplete="on">
        <button @click="generateAmazon()" class="bg-purple-600 text-white font-bold text-xl py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-14">Générer</button>
      </div>
      <div class="flex items-center justify-center space-x-10 p-8">
        <h3 type="text" class="text-2xl text-white p-2 mb-2 font-bold">Depuis un lien Aliexpress</h3>
        <input type="text" class="bg-white border border-gray-300 rounded-full p-4 w-96" v-model="aliexpressLink">
        <button @click="generateAliexpress()" class="bg-purple-600 text-white text-xl font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-14">Générer</button>
      </div>
    </div>
     <!-- section 2 -->
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" style="width: 950px">
      <h3 type="text" class="text-3xl text-white p-2 font-bold">Depuis une description* produit</h3>
      <div class="text-md mb-6 text-white">*Plus votre description sera précise, plus les avis seront pertinents</div>
      <textarea class="bg-white border-double border-8 border-gray-400 rounded-lg p-2 mb-2 h-64" style="width: 750px; height: 200px;" v-model="productDescription"></textarea>
      <button @click="generate()" class="bg-purple-600 text-xl text-white font-bold py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer w-32 h-12 mt-2 mb-5">Générer</button>
    </div>
  </div>

  <!-- Modale  -->
  <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85"
    @click="closeForm">
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5" style="width: 500px; height: 650px;"
    @click.stop>
      <h3 type="text" class="text-3xl text-white p-2 font-bold underline mb-8">Let's go !</h3>
      <form @submit.prevent="generateProduct()" class="space-y-10 mt-10">
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
  <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90">
    <div class="flex flex-col bg-white p-6 rounded-lg shadow-lg">
      <iframe class="p-6" src="https://lottie.host/embed/ab95f673-b879-48e7-a7d1-6ae2d3425e4d/Pnh6UZfIwU.json"></iframe>
      <p class="text-blue-loader-animation mt-2 text-center text-lg" v-html="spinner_text"></p>
    </div>
  </div>
</template>

<script>
import api from '@/api';
import router from '@/router';

export default {
  name: 'ScrapperPage',
  // Vous pouvez ajouter ici la logique de composant nécessaire pour le scraping
  data() {
    return {
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
      },
      current_user: null,
      access_token: "",
      spinner_text: null,
      loading: false
    };
  },

  mounted() {
    this.showModal = false
    this.current_user = JSON.parse(localStorage.getItem("user"));
    this.access_token = localStorage.getItem("access_token");
    window.addEventListener('keydown', this.handleEsc);
  },

  beforeUnmount() {
    // Nettoyez l'écouteur quand le composant va être détruit
    window.removeEventListener('keydown', this.handleEsc);
  },

  methods: {

    generateAmazon() {
      if (!this.amazonLink) {
        alert("Veuillez entrer un lien Amazon valide avant de générer !");
        return;
      }
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

    // API Call to insert a new product on the DB
    async generateProduct() {
        this.spinner_text = 'Recuperation des commentaires .. <br/>Veuillez patientez cela peut prendre plusieurs minutes';
        this.loading = true;

        // construct request object
        console.log('Current User id dans submit: ' + this.current_user.id);
        this.form.user_id = this.current_user.id
        this.form.product_name = 'unamed_product'
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

    closeForm() {
      this.amazonLink = null
      this.aliexpressLink = null
      this.showModal = false
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
</style>
