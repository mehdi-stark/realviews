<script setup>
import { SignInButton, UserButton, useAuth } from 'vue-clerk'
const { isSignedIn } = useAuth()
</script>

<template>
  <header class="p-7">
    <UserButton v-if="isSignedIn" class="bg-black text-white" showName="true"/>
    <SignInButton  v-else v-slot="{ handler }" redirectUrl="/">
      <button @click="handler" class="bg-custom-purple-container text-white p-3 rounded-xl">
        Se connecter
      </button>
    </SignInButton>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  padding: 20;
}
</style>