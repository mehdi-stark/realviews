<template>
  <HeaderComponent title="Abonnements" />
  <div class="flex flex-col mt-12 
  md:mt-0
  p-1 justify-center items-center md:space-y-2">
    <h1 class="font-bold text-2xl md:text-4xl mt-8">Des prix totalement <span class="text-purple-600">transparents</span></h1>
    <h3 class="font-bold text-lg md:text-xl text-slate-500 text-center">Aucuns frais cachés. <br/>Annulez quand vous voulez.</h3>
  </div>
  <div class="flex flex-col md:flex-row justify-center items-strech ml-2 mr-2 py-12 space-y-6 md:space-y-0 md:space-x-6">
    <PricingCard
      class="flex-1"
      title="Basic"
      price="0"
      description="Try it for free, every month"
      features="5 produits / mois, 25 commentaires / produit, Format Excel"
      :current="subscriptionPlan.plan === 'Basic' || subscriptionPlan.plan === 'BASIC'"
    />
    <PricingCard
      class="flex-1"
      title="Standard"
      price="15"
      description="Add professional quality subtitles to your shorts, very quickly"
      features="10 produits / mois, 100 commentaires / produit, Choix du format"
      :current="subscriptionPlan.plan === 'Standard' || subscriptionPlan.plan === 'STANDARD'"
    />
    <PricingCard
      class="flex-1"
      title="Premium"
      price="23"
      description="Your shorts from long-form videos in just a few clicks"
      features="100 produits / mois, 250 commentaires / produit, Choix du format, Assistance VIP"
      popular
      :current="subscriptionPlan.plan === 'Premium' || subscriptionPlan.plan === 'PREMIUM'"
    />
    <PricingCard
      class="flex-1"
      title="Custom"
      price="--"
      description="Create, plan, publish and save incredible amounts of time"
      features="Besoin de plus 100 produits disctutons-en !"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import HeaderComponent from './HeaderComponent.vue';
import PricingCard from './PricingCard.vue';

export default {
  components: {
    HeaderComponent,
    PricingCard,
  },

  computed: {
    ...mapState(['user', 'isUserConnected', 'subscriptionPlan'])
  },

  mounted() {
    document.title = 'RealViews - Abonnements';
    console.log('PRICINF subscriptionPlan', this.subscriptionPlan.plan);
  },
};
</script>

<style>
  /* .text-custom-purple {
    color: #6C63FF;
  } */
</style>
