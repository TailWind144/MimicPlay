<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-end py-11 px-16">
      <NavLogo class="mr-auto" />
      <ArrowRightIcon
        @click="backToHome"
        class="h-8 w-8 text-gray-600 opacity-50 hover:opacity-100 duration-300 cursor-pointer"
      />
    </div>
    <div class="flex px-20 flex-col gap-4">
      <TagNav :tags="tags" :tag="tag" @click="handleChange" />
      <BookList :books @click="handleClickBook" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NavLogo from '@/components/NavLogo.vue'
import { useRouter } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
import type { Dict, Gallery } from '@/types/types'
import { fetchGallery } from '@/utils/fetch'
import TagNav from './components/TagNav.vue'
import BookList from './components/BookList.vue'
import { useDictStore } from '@/stores/dictStore'
import { computed, ref } from 'vue'

const dictStore = useDictStore()
const router = useRouter()
const gallery = ref<Gallery>({})
const books = computed(() => gallery.value[tag.value])
const tags = ref<Array<string>>()
const tag = ref()

const fetchBooks = async () => {
  gallery.value = await fetchGallery('/gallery.json')
  tags.value = Object.keys(gallery.value)
  tag.value = tags.value[0]
}
fetchBooks()

const handleClickBook = (book: Dict) => {
  dictStore.dict = book
  router.push('/')
}
const handleChange = (val: string) => {
  tag.value = val
}
const backToHome = () => {
  router.push('/')
}
</script>

<style scoped></style>
