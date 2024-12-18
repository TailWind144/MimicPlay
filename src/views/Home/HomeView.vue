<template>
  <div>
    <div class="flex items-center justify-center p-8">
      <h1 class="font-bold mr-auto text-3xl text-[#e91e63]">WordList</h1>
      <TopNav />
    </div>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import TopNav from '@/components/TopNav.vue'
</script>

<style scoped></style>
