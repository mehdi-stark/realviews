<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-red-500 text-4xl font-bold mb-4">Paiement Annulé ou Échoué</h1>
        <p class="text-lg">Votre paiement n'a pas été traité avec succès. Veuillez <a class="text-blue-500 hover:text-blue-200" 
            href="mailto:support@realviews.ai?subject=RealViews - Erreur paiement">contacter le support</a> pour plus d'informations.</p>
        <RouterLink to="/profile" class="text-blue-500 hover:underline mt-4">Retour a mon profil</RouterLink>
    </div>
</template>

<script>
export default {
    name: 'PaymentFailed',
}
</script>

<style>
</style>
