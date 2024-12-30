<template>
  <div class="grid grid-cols-normal gap-6">
    <div
      class="image_box h-80 rounded-xl shadow-md bg-no-repeat bg-right duration-300 transition-all bg-130% hover:bg-140% flex cursor-pointer"
      v-for="(book, index) in books"
      :key="index"
      :style="`background-image: url(${book.imgPath})`"
      @click="emitClick(book)"
    >
      <div
        class="flex flex-col w-1/2 justify-center px-5 backdrop-blur-md backdrop-saturate-50 bg-amber-300/40 rounded-l-xl text-white text-xl font-semibold"
      >
        <span>{{ book.nick }}</span>
        <span>{{ book.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Dict } from '@/types/types'

const { books } = defineProps(['books'])
const emit = defineEmits(['click'])
const emitClick = (val: Dict) => {
  emit('click', val)
}
</script>

<style scoped></style>
