<template>
  <!-- <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Votre session a expire, merci de bien vouloir vous reconnecter"
        title="Session expire"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Ok"
            @click="dialog = false"
          ></v-btn>
        </template>
      </v-card>
    </v-dialog>
  </div> -->
  <div class="text-center p-4">
    <div class="inline-block align-middle">
      <div class="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div class="px-4 py-2">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-5 w-5 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.197 14.197L10 10m5.197 4.197a5 5 0 100-10 5 5 0 000 10z"></path>
              </svg>
            </div>
            <div class="ml-2">
              <div class="text-xl font-medium text-black">
                Session expire
              </div>
              <p class="text-gray-500">
                Votre session a expire, merci de bien vouloir vous reconnecter
              </p>
            </div>
          </div>
        </div>
        <div class="px-4 py-2 bg-gray-50">
          <button class="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="this.parentElement.parentElement.style.display='none'">
            Ok
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'MyComponent',
    data() {
        return {
            // Your data properties go here
            dialog: true
        };
    },
    methods: {
        // Your methods go here
    },
    mounted() {
        // Code to run when the component is mounted goes here
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>