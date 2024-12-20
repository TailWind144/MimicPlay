<template>
  <div class="flex flex-col gap-4 items-center justify-center">
    <div>
      <HeartIcon class="h-64 w-64 text-amber-500 animate-bounce" />
    </div>
    <div class="text-[#606266] text-xl">
      {{ text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { HeartIcon } from '@heroicons/vue/20/solid'
const { text } = defineProps(['text'])
</script>

<style scoped></style>
