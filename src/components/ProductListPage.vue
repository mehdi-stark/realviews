<template>
  <HeaderComponent title="Historique"/>
  <div class="bg-white rounded-md mt-16 md:mt-10">
    <div class="bg-white p-6 rounded-t-xl p-3">

      <!-- Spinner de chargement -->
    <div
        v-if="loading_products"
        class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
      >
        <div class="bg-white p-6 rounded-lg shadow-lg">
          <div class="flex flex-col items-center">
            <div
              class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"
            ></div>
            <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
          </div>
        </div>
      </div>

      <!-- Product List Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Produits</h2>
        <div class="flex space-x-4">
          <div class="flex items-center mt-2 hidden md:block relative">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              class="bg-slate-100 text-black rounded-md px-2 py-1 w-80 h-10 pl-11"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6 absolute top-2 left-3 opacity-50"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
          <button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 h-10">
            Filtres
          </button>
        </div>
      </div>

      <!-- Line of separation -->
      <div class="border-b border-gray-700 border-1 my-4"></div>

      <!-- Product Items -->
      <div class="bg-white rounded-md overflow-x-auto">
        <!-- Product Item Header -->
        <div style="min-width: 1000px">
          <div class="flex text-gray-40">
            <span class="w-20"></span>

            <div class="w-1/4 flex justify-start">NOM PRODUIT</div>
            <div class="w-1/6 text-right flex justify-end ml-16">NOTE</div>
            <div class="w-1/6 text-right flex justify-around ml-5">
              <div></div>
              <div>DATE CREATION</div>
            </div>
            <div class="w-1/4 text-right flex justify-end mr-20">ACTIONS</div>
          </div>

          <!-- Line of separation -->
          <div class="border-b border-gray-700 border-1 my-4"></div>

          <!-- Product Items (loop through API data) -->
          <div class="space-y-6">
            <div class="text-xl my-10" v-if="!products.length">No product to see</div>
            <div
              v-for="product in products"
              :key="product.id"
              class="product-item flex items-center mt-5"
            >
              <img
                v-if="product.logo"
                :src="product.logo"
                @click="onPickFile(product)"
                :alt="product.name"
                class="w-20 h-14 object-cover rounded-md mr-4 flex justify-start hover:cursor-pointer"
              />
              <button
                v-else
                @click="onPickFile(product)"
                class="btn btn-info h-14 w-20 bg-slate-200 text-white rounded-md hover:bg-slate-300 flex items-center justify-center mr-4"
              >
              <span class="text-xl w-20">+</span>

                <!-- <img
                src="../assets/excel-logo.png"
                  class="btn btn-info h-14 rounded-md flex items-center justify-center mr-4"
                /> -->
              </button>
              <input
                id="fileInput"
                type="file"
                ref="file"
                style="display: none"
                @change="onFilePicked"
              />
              <div
                v-if="loading"
                class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75"
              >
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <div class="flex flex-col items-center">
                    <div
                      class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"
                    ></div>
                    <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
                  </div>
                </div>
              </div>

              <div class="w-1/4 text-right flex justify-start">
                {{ product.productName && product.productName !== "unamed_product" ? product.productName : product.productHandle }}
              </div>
              <div class="w-1/6 text-right flex justify-end">
                {{ product.averageRating.toFixed(2) }}
              </div>
              <div class="w-1/6 text-right flex justify-end">
                {{ formatDate(product.requestDate) }}
              </div>
              <div class="w-1/4 text-right space-x-2 flex justify-end">
                <!-- <button @click="generateExcel(product)" class="text-blue-500 hover:text-blue-600">
                <img src="../assets/excel.png" class="w-8 h-7" alt="buttonpng"/>
              </button> -->
                <button
                  @click="generateExcel(product)"
                  class="bg-emerald-700 text-white px-2 py-1 rounded flex items-center text-sm w-28"
                >
                  <img
                    src="../assets/excel-logo.png"
                    alt="Logo Excel"
                    class="w-4 h-4 mr-2"
                  />
                  <span class="">Download</span>
                </button>
                <button
                  @click="deleteProduct(product)"
                  class="bg-red-700 text-white px-2 py-1 rounded items-center text-sm w-28 text-center flex justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 mr-1"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                  <div>Delete</div>
                </button>
                <!-- <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 duration-3000">
                <div class="bg-white p-6 rounded-lg shadow-lg">
                  <div class="flex flex-col items-center">
                    <div class="border-t-4 border-blue-500 w-16 h-16 rounded-full animate-spin"></div>
                    <p class="text-gray-600 mt-2">{{ spinner_text }}</p>
                  </div>
                </div>
              </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import dayjs from "dayjs";
import api from '../api'
import { mapState } from 'vuex';
import HeaderComponent from "./HeaderComponent.vue";

export default {
  // Component logic here
  components: { 
    HeaderComponent
   },
  
  computed: {
    ...mapState(['user', 'accessToken', 'isUserConnected']),
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
    };
  },

  mounted() {
    console.log('API calls made on product list : ' + this.$store.state.subscriptionPlan.apiCallsMade);

    if (!this.user || !this.accessToken) {
      console.error("user or token not present ! Login is required !");
      router.push("/login");
    } else {
      this.current_user = JSON.parse(this.user);
      // this.access_token = localStorage.getItem("access_token");
      console.log(
        "Current user in productlist mounted: " + JSON.stringify(this.user)
      );
      console.log("Current user ID in productlist mounted: " + JSON.parse(this.user).id);
      console.log("Current access-token in productlist mounted: " + this.accessToken);

      this.fetchProducts();
    }
  },

  methods: {
    async doDelete() {
      const ok = await this.$refs.confirmDialogue.show({
        title: "Delete Page",
        message: "Are you sure you want to delete this page? It cannot be undone.",
        okButton: "Delete Forever",
      });
      // If you throw an error, the method will terminate here unless you surround it wil try/catch
      if (ok) {
        alert("You have successfully delete this page.");
      } else {
        alert("You chose not to delete this page. Doing nothing now.");
      }
    },

    onPickFile(product) {
      this.product_id = product.id;
      let fileUpload = document.getElementById("fileInput");
      if (fileUpload != null) {
        fileUpload.click();
      }
    },

    onFilePicked(event) {
      this.spinner_text = "Enregistrement du logo..";
      this.loading = true;
      const files = event.target.files;
      // console.log("files ==> " + files)
      // const fileReader = new FileReader()
      // fileReader.addEventListener('load', () => {
      //   this.imageUrl = fileReader.result
      // })
      // fileReader.readAsDataURL(files[0])
      console.log("files[0] ==> " + files[0]);
      this.selectedImage = files[0];
      this.uploadImage(this.product_id);
    },

    onFileChange(product) {
      this.selectedImage = this.$refs.file.files[0];
      // this.selectedImage = event.target.files[0];
      this.uploadImage(product);
    },

    async uploadImage(product_id) {
      const formData = new FormData();
      formData.append("file", this.selectedImage);
      api
        .post("/api/v1/product-logo?product_id=" + product_id, formData)
        .then((res) => {
          res.data.files; // binary representation of the file
          res.status; // HTTP status
          this.loading = false;
          location.reload();
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });

      this.loading = false;
    },

    formatDate(dateString) {
      const date = dayjs(dateString);
      // Then specify how you want your dates to be formatted
      return date.format("YYYY-MM-DD");
    },

    //
    // MODAL FUNCTIONS
    //
    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },

    // ------------------------------------------------------------------------------------------------------------------------------

    // API Call to insert a new product on the DB
    async submitForm() {
      this.spinner_text = "Recuperation des commentaires ..";
      this.loading = true;
      console.log("URL called : " + process.env.VUE_APP_ROOT_API);
      // Appelez l'endpoint Spring Boot pour générer le fichier Excel

      // construct request object
      console.log("Current User id dans submit: " + this.current_user.id);
      this.form.user_id = this.current_user.id;
      try {
        // const response = await axios.post(
        //   process.env.VUE_APP_ROOT_API + "/api/v1/product",
        //   this.form,
        //   {
        //     headers: {
        //       Authorization: "Bearer " + localStorage.getItem("access_token"),
        //     },
        //     responseType: "arraybuffer", // Définir le type de réponse sur 'arraybuffer'
        //   }
        const response = await api.post("/api/v1/product",
          this.form,
          {
            responseType: "arraybuffer", // Définir le type de réponse sur 'arraybuffer'
          }
        );

        this.spinner_text = "Generation du fichier Excel ..";
        await this.wait(1000);
        const excelArrayBuffer = response.data; // Utiliser response.data au lieu de response.arrayBuffer()
        const blob = new Blob([excelArrayBuffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.target = "_blank"; // Ouvre le lien dans une nouvelle fenêtre
        link.download = "comments_gen.xlsx";
        link.click();
        this.loading = false;
        this.showModal = false; // Ferme le popup après soumission
        location.reload();
      } catch (error) {
        // Handle API error
        this.loading = false; // Set loading to false to hide the modal
      }
    },

    // API Call to retrieve a product on the DB from the product ID
    async fetchProducts() {
      console.log("fetchProducts called");
      console.log('current token fecthproducts : ' + localStorage.getItem('access_token'));
      console.log("Current User id dans fetchproduct: " + this.current_user.id);

      this.spinner_text = "Recuperation des produits..";
      this.loading_products = true;
      await api.get("/api/v1/products?user_id=" + this.current_user.id)
        .then((res) => {
          this.products = res.data;
          console.log("products : " + JSON.stringify(this.products));
          localStorage.setItem("fetchedProduct", res.data);
        })
        .catch((error) => {
          console.error("token on fetchproduct : " + this.access_token);
          console.error("ERROR ====> " + error);
        });

      this.products.forEach((productTmp) => {
        if (productTmp.logo !== undefined && productTmp.logo !== null) {
          productTmp.logo = `data:image/jpeg;base64,${productTmp.logo}`;
        }
      });

      this.loading_products = false;
    },

    // API Call to generate a product reviews excel sheet
    async generateExcel(product) {
      this.loading = true;
      this.spinner_text = "Generation du fichier Excel ..";
      console.log("Generate Excel products : " + JSON.stringify(product));

      console.log("URL called : " + process.env.VUE_APP_ROOT_API);
      // Appelez l'endpoint Spring Boot pour générer le fichier Excel
      // const response = await axios.get(process.env.VUE_APP_ROOT_API + '/api/v1/product_csv?product_id=' +
      // product.id);

      const response = await api.get("/api/v1/product_csv?product_id=" + product.id,
        {
          responseType: "arraybuffer", // Définir le type de réponse sur 'arraybuffer'
        });

      const excelArrayBuffer = response.data; // Utiliser response.data au lieu de response.arrayBuffer()
      const blob = new Blob([excelArrayBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank"; // Ouvre le lien dans une nouvelle fenêtre
      link.download = product.productHandle.toLowerCase().replace(" ", "_") + "_comments.xlsx";
      link.click();
      this.loading = false;
    },

    // API Call to delete a product on the DB from the product ID
    async deleteProduct(product) {
      this.loading = true;
      this.spinner_text = "Suppression du produit";

      console.log("URL called : " + process.env.VUE_APP_ROOT_API);
      // Appelez l'endpoint Spring Boot pour générer le fichier Excel
      await api.delete(process.env.VUE_APP_ROOT_API + "/api/v1/product?product_id=" + product.id);
      await this.wait(2000);
      this.fetchProducts();
      this.loading = false;
    },
    wait(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>

<style scoped>
/* Styles for ProductList component */
</style>
