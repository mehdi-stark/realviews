<template>
<div class="fixed inset-0 flex items-center bg-black justify-center opacity-70">
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box bg-white flex flex-col items-center justify-center">
            <h3 class="font-bold text-lg">Modifier mot de passe</h3>
            <p class="py-4">Veuillez entrer votre mot de passe actuel et votre nouveau mot de passe</p>
            <div class="modal-action">
            <form method="dialog" class="flex flex-col space-y-3 justify-center">
                <!-- if there is a button, it will close the modal -->
                <input type="password" class="p-2 rounded-xl border" v-model="oldPassword" placeholder="Ancien mot de passe">
                <input type="password" class="p-2 rounded-xl border" v-model="newPassword" placeholder="Nouveau mot de passe">
                <button class="bg-custom-purple-container p-2 rounded-xl text-white border border-custom-purple-container" 
                @click="this.$router.push('/pricing')">Mettre a jour</button>
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

    mounted() {
        document.title = "RealViews - Modifier mot de passe";
        console.log("mounted update password modal");
        document.getElementById('my_modal_1').showModal();
    },

    unmounted() {
        console.log("unmounted update password modal");
    },

    methods: {

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