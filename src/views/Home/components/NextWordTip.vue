<template>
  <div class="gap-4 flex justify-end items-center select-none">
    <div
      @click="emitClick"
      class="text-gray-600 text-xl opacity-50 hover:opacity-100 cursor-pointer duration-300 flex items-center gap-4"
      v-show="showWord"
    >
      <div class="text-right ml-auto flex flex-col">
        <span class="word">
          {{ showWord?.english }}
        </span>
        <span class="text-base text-[#2e2e2e]">
          {{ showWord?.chinese }}
        </span>
      </div>
      <ChevronRightIcon class="h-5 w-5" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from '@heroicons/vue/24/outline'
const { showWord } = defineProps(['showWord'])
const emit = defineEmits(['click'])
const emitClick = () => {
  emit('click')
}
</script>

<style scoped></style>
