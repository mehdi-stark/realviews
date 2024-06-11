<template>
<div class="fixed inset-0 flex items-center justify-center opacity-70">
  <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
      <h3 class="font-bold text-lg">Quota produits atteint</h3>
      <p class="py-4">Il semble que vous ayez utiliser votre quota de produits pour ce mois. Besoin de plus ?</p>
      <div class="modal-action">
      <form method="dialog" class="space-x-2">
        <!-- if there is a button, it will close the modal -->
        <button class="bg-custom-purple-container p-2 rounded-xl text-white border border-custom-purple-container" 
        @click="this.$router.push('/pricing')">Modifier plan</button>
        <!-- if there is a button, it will close the modal -->
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
    </div>
  </div>
</dialog>
</div>
</template>

<script>
export default {
    name: 'MyComponent',
    data() {
        return {
            // Your data properties go here
            dialog: false,
        };
    },
    methods: {
        // Your methods go here
    },
    mounted() {
        // Code to run when the component is mounted goes here
        document.getElementById('my_modal_1').showModal();
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>