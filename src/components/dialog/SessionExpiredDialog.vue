<template>
  <div class="text-center pa-4">
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