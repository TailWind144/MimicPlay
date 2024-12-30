<template>
  <div class="grid grid-cols-small sm:grid-cols-normal gap-4 sm:gap-6">
    <div
      class="h-20 sm:h-80 rounded-xl shadow-md bg-no-repeat bg-right duration-300 transition-all bg-130% hover:bg-140% flex cursor-pointer"
      v-for="(book, index) in books"
      :key="index"
      :style="`background-image: url(${book.imgPath})`"
      @click="emitClick(book)"
    >
      <div
        :class="
          (book.path === activePath ? 'bg-amber-500 text-white' : 'bg-white text-gray-800') +
          ' flex flex-col w-full sm:w-1/2 justify-center px-5 sm:backdrop-blur-md sm:backdrop-saturate-50 sm:bg-amber-300/40 rounded-xl sm:rounded-l-xl sm:rounded-r-none  sm:text-white text-xl sm:font-semibold'
        "
      >
        <span>{{ book.nick }}</span>
        <span class="text-base sm:text-xl">{{ book.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dict } from '@/types/types'

const { books, activePath } = defineProps(['books', 'activePath'])
const emit = defineEmits(['click'])
const emitClick = (val: Dict) => {
  emit('click', val)
}
</script>

<style scoped></style>
