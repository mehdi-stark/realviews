<template>          
<!-- Header -->
  <div id="header" class="mb-5 hidden md:block">
    <header class="flex justify-between items-center h-35 bg-slate-100 text-black">
      <span class="ml-3 flex justify-start font-bold p-3">{{ title }}</span>
      <div class="logo h-6 w-6 flex justify-end">
        <img
          src="../assets/question.png"
          class="place-items-center mr-8 cursor-pointer"
          onclick="window.location.href = '/help'"
        />
      </div>
    </header>
  </div>
</template>
<script>
export default {
    name: 'HeaderComponent',

    props: {
        title: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
        };
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>