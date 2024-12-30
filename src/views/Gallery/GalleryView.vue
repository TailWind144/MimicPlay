<template>
  <div class="h-screen flex flex-col">
    <div class="flex justify-end py-11 px-16 items-center">
      <NavLogo class="mr-auto" />
      <ArrowRightIcon
        @click="backToHome"
        class="h-8 w-8 text-gray-600 opacity-50 hover:opacity-100 duration-300 cursor-pointer"
      />
    </div>
    <div class="flex px-10 sm:px-20 flex-col gap-4 flex-1 h-full overflow-hidden">
      <TagNav :tags="tags" :tag="tag" @click="handleChange" />
      <BookList
        class="overflow-y-auto pr-4 pb-4"
        :books
        :activePath="bookPath"
        @click="handleClickBook"
      />
    </div>
    <ViewFooter />
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
import ViewFooter from '@/components/ViewFooter.vue'

const dictStore = useDictStore()
const bookPath = dictStore.dict?.path
const router = useRouter()
const gallery = ref<Gallery>({})
const books = computed(() => gallery.value[tag.value])
const tags = ref<Array<string>>()
const tag = ref()

const fetchBooks = async () => {
  gallery.value = await fetchGallery('/minicplay/gallery.json')
  tags.value = Object.keys(gallery.value)
  tag.value = tags.value[0]
}
fetchBooks()

const handleClickBook = (book: Dict) => {
  dictStore.dict = book
  // 本地缓存设置——课本
  localStorage.setItem('dict', JSON.stringify(book))
  // 移除单词列表缓存，避免读取到缓存中（上一个课本）的单词列表
  localStorage.removeItem('showWords')
  localStorage.removeItem('selectedUnit')
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
