<template>
  <div
    :class="[
      'md:h-[550px] bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center',
      current ? 'border-2 border-purple-500' : 'border border-gray-200'
    ]"
    class="md:h-[400px]"
  >
  <!-- <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center border border-gray-200"> -->
    <div id="title" class="md:h-[180px]">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <p class="mt-2 text-sm text-gray-500">{{ description }}</p>
      <p v-if="popular" class="text-purple-600 font-semibold mt-1">Populaire</p>
    </div>

    <div id="price"
    class="md:h-[150px]">
      <p class="text-black text-2xl font-extrabold">{{ price }}<span class="text-base font-normal">/mois</span></p>
      <p v-if="current" class="mt-4 text-purple-600 font-semibold">Plan actuel</p>
      <button v-else-if="title === 'Custom'" class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800"
      ><a href="mailto:contact@realviews.ai?subject=RealViews - Demande custom abonnement">Contactez-nous</a></button>
      <RouterLink v-else to="/payment-intent" class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800">Choisir</RouterLink>
      <!-- <button v-else class="mt-4 py-2 px-6 bg-purple-600 text-white rounded-full hover:bg-gray-800">Choisir</button> -->
    </div>
    <div id="features" class="justify-end">
      <ul class="mt-8 space-y-2 text-left">
        <li v-for="(feature, index) in featureList" :key="index" class="text-gray-700">
          <span v-if="feature.startsWith('Everything listed')" class="font-semibold">{{ feature }}</span>
          <span v-else class="flex items-center">
            <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8 15.414l-4.707-4.707a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
            </svg>
            {{ feature }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    price: String,
    description: String,
    features: String,
    popular: Boolean,
    current: Boolean,
  },
  computed: {
    featureList() {
      return this.features.split(',');
    },
  },
};
</script>

<style>
</style>
