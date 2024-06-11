<template>
<div class="fixed inset-0 flex items-center bg-black justify-center opacity-70">
    <dialog id="my_modal_1" class="modal">
        <div v-if="successMessage === null" class="modal-box bg-white flex flex-col items-center justify-center">
            <h3 class="font-bold text-lg">Modifier mot de passe</h3>
            <p class="py-4">Veuillez entrer votre mot de passe actuel et votre nouveau mot de passe</p>
            <div class="modal-action">
            <form  method="dialog" class="flex flex-col space-y-3 justify-center">
                <!-- if there is a button, it will close the modal -->
                <input type="password" class="p-2 rounded-xl border" v-model="form.oldPassword" placeholder="Ancien mot de passe">
                <input type="password" class="p-2 rounded-xl border" v-model="form.newPassword" placeholder="Nouveau mot de passe">
                <button class="bg-custom-purple-container p-2 rounded-xl text-white border border-custom-purple-container" 
                @click.prevent="updatePassword">Mettre a jour</button>
                <!-- if there is a button, it will close the modal -->
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                @click="$emit('close-udpate-password')">
                ✕</button>
            </form>
            </div>
            <div v-if="error" class="mt-5 text-red-500">{{ error }}</div>
        </div>

        <div v-else class="modal-box bg-white flex flex-col items-center justify-center">
            <form  method="dialog" class="flex flex-col space-y-3 justify-center">
                <!-- if there is a button, it will close the modal -->
                <p class="py-4">{{ successMessage }}</p>
                <!-- if there is a button, it will close the modal -->
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                @click="$emit('close-udpate-password')">
                ✕</button>
            </form>
        </div>
    </dialog>
</div>
<SpinnerComponent v-if="loading" :text="spinner_text"></SpinnerComponent>
</template>

<script>
import api from "@/api";
import { mapState } from "vuex";
import SpinnerComponent from "@/components/SpinnerComponent.vue";
export default {
    name: "UpdatePasswordModal",
    components: {
        SpinnerComponent,
    },
    data() {
        return {
            // showModal: false,
            modalContent: "",
            form: {
                userId: "",
                oldPassword: "",
                newPassword: "",
            },
            confirmPassword: "",
            error: "",
            successMessage : null,
            loading: false,
        };
    },

    computed: {
        ...mapState(["user"]),
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

        // closeModal() {
        //     // this.showModal = false;
        //     this.modalContent = "";
        //     this.oldPassword = "";
        //     this.password = "";
        //     this.confirmPassword = "";
        // },

        updatePassword() {
            this.loading = true;
            this.spinner_text = "Mise à jour de votre mot de passe en cours...";
            // Appel à l'API pour mettre à jour le mot de passe
            // Remplacez l'URL de l'API par celle que vous souhaitez utiliser
            this.form.userId = JSON.parse(this.user).id
            api.put('/api/v1/update-password', this.form)
                .then((response) => {
                console.log(response.data);
                this.wait(1000)
                .then(() => {
                    this.loading = false;
                    this.successMessage = "Votre mot de passe a été modifié avec succès !";
                });
                })
                .catch((error) => {
                    console.error(error);
                    if(error.response.data.message === "Old password is incorrect") {
                        console.log("Ancien mot de passe incorrect");
                        this.error = "Erreur : Ancien mot de passe incorrect";
                    } else {
                        console.log("Erreur inconnue");
                        this.error = "Une erreur s'est produite. Veuillez réessayer plus tard.";
                    }
                    this.loading = false;
                });
        },

        wait(ms) {
            return new Promise((resolve) => {
                setTimeout(resolve, ms);
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