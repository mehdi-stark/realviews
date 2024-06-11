<template>
    <!-- <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-85 z-[20]"
    @click="closeForm">
    <div class="flex flex-col items-center justify-center mt-3 bg-custom-indigo rounded-lg mb-5 w-3/4 md:w-1/2 lg:w-1/3"
    @click.stop>
        <div>
            <div class="modal">
                <h2>Modal</h2>
                <p>{{ modalContent }}</p>
                <input type="password" v-model="oldPassword" placeholder="Ancien mot de passe">
                <input type="password" v-model="password" placeholder="Nouveau mot de passe">
                <input type="password" v-model="confirmPassword" placeholder="Confirmer le mot de passe">
                <button @click="updatePassword">Modifier le mot de passe</button>
                <button @click="closeModal">Fermer</button>
            </div>
        </div>
    </div>
    </div> -->
<div class="fixed inset-0 flex items-center justify-center opacity-70">
  <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
      <h3 class="font-bold text-lg">Modifier mot de passe</h3>
      <p class="py-4">Veuillew entrer votre mot de passe actuel et votre nouveau mot de passe?</p>
      <div class="modal-action">
      <form method="dialog" class="space-x-2">
        <!-- if there is a button, it will close the modal -->
         <input type="password" v-model="oldPassword" placeholder="Ancien mot de passe">
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
import api from "@/api";

export default {
    data() {
        return {
            showModal: false,
            modalContent: "",
            oldPassword: "",
            password: "",
            confirmPassword: ""
        };
    },
    methods: {
        openModal() {
            // Appel à l'API pour récupérer le contenu de la modal
            // Remplacez l'URL de l'API par celle que vous souhaitez utiliser
            fetch("https://api.example.com/modal-content")
                .then(response => response.json())
                .then(data => {
                    this.modalContent = data.content;
                    this.showModal = true;
                })
                .catch(error => {
                    console.error("Erreur lors de la récupération du contenu de la modal :", error);
                });
        },
        closeModal() {
            this.showModal = false;
            this.modalContent = "";
            this.oldPassword = "";
            this.password = "";
            this.confirmPassword = "";
        },

        updatePassword() {
            // Appel à l'API pour mettre à jour le mot de passe
            // Remplacez l'URL de l'API par celle que vous souhaitez utiliser
            api.post('/api/v1/generate', this.form)
                .then((response) => {
                // console.log(response.data);
                this.spinner_text = "Interrogation de l'IA pour générer des avis";
                this.loading = true;
                this.wait(1000).then(() => {
                    this.loading = false;
                    this.products = response.data;
                    this.showSuggestion = true;
                });
                })
                .catch((error) => {
                console.error(error);
                this.spinner_text = "Une erreur s'est produite lors de la génération des avis";
                this.loading = true;
                this.wait(5000).then(() => {
                    this.loading = false;
                });
            });
        }
    }
};
</script>

<style>
.modal {
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 20px;
    width: 300px;
    margin: 0 auto;
}
</style>