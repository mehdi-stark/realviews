<template>
    <HeaderComponent title="Aide" />

    <div class="flex flex-col justify-center items-center space-y-2">
        <h1 class="font-bold text-4xl mt-8">Besoin d'aide ?</h1>
        <h3 class="font-bold text-xl text-slate-500">Nous sommes là pour vous aider</h3>

        <h2 class="font-bold text-2xl text-purple-500">Tutoriels</h2>
        <div class="flex flex-col md:flex-row justify-center items-strech ml-2 mr-2 py-12 space-y-6 md:space-y-0 md:space-x-6">
            <HelpCard
                class="flex-1"
                help_title="Comment générer des avis ?"
                description="Découvrez comment générer des avis à partir d'un lien Amazon, Aliexpress ou d'une description de produit."
                solution_title="Pour générer des données, allez dans le menu Génération de données et suivez ces étapes :"
                features="1. Entrez un lien Amazon, Aliexpress ou la description d'un produit dans le champ de texte; 
                2. Cliquez sur le bouton Générer; 3. Attendez quelques secondes que les données soient générées."
            />
            <HelpCard
                class="flex-1"
                help_title="Comment scraper des avis ?"
                description="Découvrez comment scraper des avis à partir d'un lien Amazon, Aliexpress ou Shopify"
                solution_title="Pour scraper des données, allez dans le menu Scrapping de données et suivez ces étapes :"
                features="1. Entrez un lien Amazon, Aliexpress ou Shopify dans le champ de texte; 
                2. Cliquez sur le bouton Générer; 3. Attendez quelques secondes que les données soient générées."
            />
        </div>

        <h2 class="font-bold text-2xl mt-10 text-purple-500">FAQ</h2>
        <div class="flex flex-col md:flex-row justify-center items-strech ml-2 mr-2 py-12 space-y-6 md:space-y-0 md:space-x-6">
            <HelpCard
                class="flex-1"
                help_title="Comment générer des avis ?"
                description="Découvrez comment générer des avis à partir d'un lien Amazon, Aliexpress ou d'une description de produit."
                solution_title="Pour générer des données, allez dans le menu Génération de données et suivez ces étapes :"
                features="1. Entrez un lien Amazon, Aliexpress ou la description d'un produit dans le champ de texte; 
                2. Cliquez sur le bouton Générer; 3. Attendez quelques secondes que les données soient générées."
            />
            <HelpCard
                class="flex-1"
                help_title="Comment scraper des avis ?"
                description="Découvrez comment scraper des avis à partir d'un lien Amazon, Aliexpress ou Shopify"
                solution_title="Pour scraper des données, allez dans le menu Scrapping de données et suivez ces étapes :"
                features="1. Entrez un lien Amazon, Aliexpress ou Shopify dans le champ de texte; 
                2. Cliquez sur le bouton Générer; 3. Attendez quelques secondes que les données soient générées."
            />
        </div>

    <div class="flex flex-col items-center space-y-3 pb-8">
        <h2 class="font-bold text-2xl mt-10 text-purple-500">Contact</h2>
        <p class="text-center text-slate-500">Vous ne trouvez pas ce que vous cherchez ? Contactez-nous pour obtenir de l'aide.</p>
        <a href="mailto:contact@realviews.ai?subject=RealViews - Besoin d'aide" class="bg-purple-600 text-white font-bold text-xl py-2 px-4 rounded-full hover:bg-purple-700 cursor-pointer mt-2 mb-8">Nous contacter</a>
    </div>
    </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import HelpCard from './HelpCard.vue';

export default {
    components: {
        HelpCard,
        HeaderComponent,
    },

    mounted() {
        document.title = 'RealViews - Aide';
    },
};
</script>

<style scoped>
    /* Add your styles here */
</style>