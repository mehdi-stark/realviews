<template>
  <div class="flex flex-col md:flex-row items-center justify-center p-1 space-y-2 md:space-x-5">
    <img class="w-20 h-20 rounded-full border-2 border-gray-300 shadow-md md:p-1 object-fill" 
    :src="product.image">
    <a :href="product.link" target="_blank" class="font-bold text-custom-purple-container hover:text-slate-400">Lien produit</a>
</div>
</template>

<script>

export default {
    name: 'MyComponent',

    props: {
        product: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
        };
    },
    methods: {
        // Your methods go here

    },
    mounted() {
        // Code to run when the component is mounted goes here
        console.log("product on suggestion card : " + JSON.stringify(this.product));
        console.log("product img on suggestion card : " + JSON.stringify(this.product.image));

    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>