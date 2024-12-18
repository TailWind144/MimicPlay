<template>
  <div class="flex gap-6 items-center justify-center bg-white rounded-lg shadow-lg px-8 py-3">
    <router-link to="/gallery">教材</router-link>
    <ListBox></ListBox>
    <WordListButton :text="'按钮'" @click="handleClick" />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WordListButton from '@/components/WordListButton.vue'
import ListBox from './ListBox.vue'
const handleClick = function () {
  console.log('click')
}
</script>

<style scoped>
a {
  color: #2e2e2e;
  border-radius: 0.25rem;
  padding: 0.5rem 1.5rem;
}
a:hover {
  color: #fff;
  background-color: #e91e63;
}
</style>
