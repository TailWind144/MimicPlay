<template>
  <div class="gap-4 flex items-center justify-start select-none">
    <div
      @click="emitClick"
      class="text-gray-600 text-xl opacity-50 hover:opacity-100 hover:-translate-x-1 cursor-pointer duration-300 flex items-center gap-4"
      v-show="showWord"
    >
      <ChevronLeftIcon class="h-5 w-5" />
      <div class="text-left ml-auto flex-col hidden md:flex">
        <span class="word">
          {{ showWord?.english }}
        </span>
        <span class="text-base text-[#2e2e2e]">
          {{ showWord?.chinese }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/24/outline'
const { showWord } = defineProps(['showWord'])
const emit = defineEmits(['click'])
const emitClick = () => {
  emit('click')
}
</script>

<style scoped></style>
