<template>
<div class="fixed inset-0 flex items-center justify-center opacity-70">
  <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
      <h3 class="font-bold text-lg">Session expire !</h3>
      <p class="py-4">Votre session a expire, merci de bien vouloir vous reconnecter</p>
      <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button, it will close the modal -->
        <button class="btn"
        @click="$emit('close-session-expired')">Ok</button>
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
            dialog: true,
        };
    },
    methods: {
        // Your methods go here
    },
    mounted() {
        // Code to run when the component is mounted goes here
        document.getElementById('my_modal_1').showModal();
    }
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>