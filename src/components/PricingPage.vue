<template>
    <HeaderComponent title="Abonnements" />
  <div class="flex flex-col md:flex-row justify-center items-strech ml-2 mr-2 py-12 space-y-6 md:space-y-0 md:space-x-6">
    <PricingCard
    class="flex-grow"
      title="Basic"
      price="€0"
      description="Try it for free, every month"
      features="5 produits / mois, 25 commentaires par produit, Format Excel"
      current
    />
    <PricingCard
      title="Standard"
      price="€15"
      description="Add professional quality subtitles to your shorts, very quickly"
      features="100 subtitled Shorts / month,Cropping from long videos,Up to 1min30,300 MB / video,Import your music and sound effects"
    />
    <PricingCard
      title="Premium"
      price="€23"
      description="Your shorts from long-form videos in just a few clicks"
      features="Everything listed in SUBTITLES PRO, plus : ,30 Shorts from long videos / month,Auto-Crop to vertical format (9:16),Up to 2 min,1GB and 2 hours / long video,Import long video by local file or Youtube link"
    />
    <PricingCard
      title="Custom"
      price="++"
      description="Create, plan, publish and save incredible amounts of time"
      features="Everything listed in ADVANCED, plus : ,100 Shorts from long videos / month,Up to 3 min,Program & Publish to all platforms (YouTube, TikTok, Instagram, ...),Analyze your performance"
      popular
    />
  </div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import PricingCard from './PricingCard.vue';

export default {
  components: {
    HeaderComponent,
    PricingCard,
  },
};
</script>
