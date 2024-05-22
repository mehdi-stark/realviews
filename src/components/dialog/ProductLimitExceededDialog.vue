<template>
  <div class="text-center pa-4">
    <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="Il semble que vous ayez utiliser votre quota de produits pour ce mois. Besoin de plus ?"
        title="Quota produits atteint"
      >
        <template v-slot:actions>
          <v-btn
            class="ms-auto"
            text="Modifier plan"
            color="purple"
            @click="this.$router.push('/pricing')"
          ></v-btn>
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
    name: 'ProductLimitExceededDialog',
    data() {
        return {
            // Your data properties go here
            dialog: null
        };
    },
    methods: {
        // Your methods go here
        openDialog() {
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },
    },
    mounted() {
        // Code to run when the component is mounted goes here
    },
};
</script>

<style scoped>
/* Your component-specific styles go here */
</style>