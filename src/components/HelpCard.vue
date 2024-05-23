<template>
  <div
    :class="[
      'bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center',
      current ? 'border-2 border-purple-500' : 'border border-gray-200'
    ]"
  >
  <div id="title" style="height: 120px;">
    <h2 class="text-xl font-bold">{{ help_title }}</h2>
    <p class="mt-2 text-sm text-gray-500">{{ description }}</p>
    </div>
    <div id="features">
        <h3>{{ solution_title }}</h3>
      <ul class="mt-4 space-y-2 text-left">
        <li v-for="(feature, index) in featureList" :key="index" class="text-gray-700">
          <span v-if="feature.startsWith('Everything listed')" class="font-semibold">{{ feature }}</span>
          <span v-else class="flex items-center">
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
    help_title: String,
    price: String,
    description: String,
    features: String,
    solution_title: String,
  },
  computed: {
    featureList() {
      return this.features.split(';');
    },
  },
};
</script>

<style scoped>
/* Your CSS styles here */
</style>