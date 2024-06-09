<template>
  <!-- <div class="fixed inset-0 flex bg-white">
    <div class="flex flex-col items-center justify-center mt-3 rounded-lg mb-5 w-3/4 md:w-1/2">
      <h3 type="text" class="text-xl text-center text-black p-2 mb-8">Pour augmenter la pertinence des avis generer vous pouvez selectionner 
        le produit qui correspond le plus a votre description</h3>
      <div v-for="product in products"
              :key="product.id"
              class="product-item flex items-center mt-5">              
              <ProductSuggestionCard :product="product"/>
      </div>
    </div>
    <button @click="closeSuggestion" 
    class="text-custom-purple-container font-bold p-2hover:bg-purple-700 cursor-pointer justify-end mr-3">Passer</button>
  </div> -->

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
        <div class="p-2">
          <div v-for="product in products"
              :key="product.id"
              class="product-item flex items-center mt-2 md:mt-5">              
              <ProductSuggestionCard :product="product"/>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-2">
        <button v-if="!isProductSelected" 
        class="hover:text-grey-100 text-grey-500 font-light font-bold py-2 px-4 mx-2"
        @click="showModalFunc">
          Passer
        </button>
        <button v-else class="bg-custom-purple hover:bg-blue-700 text-white font-bold py-1 px-3 mx-2 rounded-xl">
          Suivant
        </button>
      </div>
    </div>
  </div>

    <!-- Modale  -->
    <GenerateModal v-if="showModal"></GenerateModal>
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
            isProductSelected: false,
            showModal: false,
        };
    },
    methods: {
        // Your methods go here
        showModalFunc() {
          console.log("show modal called");
            this.showModal = true;
        },
    },
    mounted() {
        // Code to run when the component is mounted goes here
        console.log("producst list on suggestion page : " + JSON.stringify(this.products));
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>