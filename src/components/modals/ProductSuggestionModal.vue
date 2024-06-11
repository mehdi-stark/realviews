<template>
  <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 z-[10]" id="modal">
    <div class="bg-white rounded-lg 
    p-4 
    md:w-[600px]
    md:max-h-[800px]">
      <div class="mb-1">
        <h3 type="text" class="text-lg text-center text-slate-500 p-2 font-bold">Augmenter la pertinence des avis generer en selectionnant 
        le produit qui correspond le plus a votre description</h3>
      </div>
      <div class="flex flex-wrap justify-center">
        <div class="p-2 space">
          <div v-for="product in products"
              :key="product.id"
              class="product-item flex items-center mt-2 md:mt-5">
              <input type="radio" :value="product" v-model="selectedProduct" name="product">
              <ProductSuggestionCard :product="product"/>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <button v-if="selectedProduct === null" 
        class="hover:text-grey-100 text-grey-500 font-light font-bold py-2 px-4 mx-2"
        @click="showModalFunc">
          Passer cette etape
        </button>
        <button v-else @click="showModalFunc" class="bg-custom-purple hover:bg-blue-700 text-white font-bold py-1 px-3 mx-2 rounded-xl">
          Suivant
        </button>
      </div>
    </div>
  </div>

    <!-- Modale  -->
    <GenerateModal v-if="showModal" :product="selectedProduct"></GenerateModal>
</template>

<script>
import ProductSuggestionCard from './ProductSuggestionCard.vue';
import GenerateModal from '@/components/modals/GenerateModal.vue';

export default {
    name: 'MyComponent',

    components: {
        ProductSuggestionCard,
        GenerateModal,
    },

    props: {
        products: {
            type: Array,
            required: true,
        },
    },

    data() {
        return {
            // Your data properties go here
            selectedProduct: null, // Ajoutez cette ligne
            isProductSelected: false,
            showModal: false,
        };
    },
    
    methods: {
        // Your methods go here
        showModalFunc() {
            console.log("show modal called");
            console.log("selected product : " + JSON.stringify(this.selectedProduct));
            this.showModal = true;
        },

        openGenerateModal() {
            this.$emit('open-generate-modal', this.selectedProduct);
        },

        // closeForm() {
        //   this.selectedProduct = null
        //   this.isProductSelected = false
        //   this.showModal = false
        // },
        
        // handleEsc(event) {
        //   // Fermez la modale si la touche Esc est pressée
        //   if (event.key === 'Escape') {
        //     this.closeForm();
        //   }
        // },

    },

    mounted() {
        // Code to run when the component is mounted goes here
        console.log("product list on suggestion page : " + JSON.stringify(this.products));
        // window.addEventListener('keydown', this.handleEsc);
    },

    beforeUnmount() {
        // window.removeEventListener('keydown', this.handleEsc);
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>