import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Dict } from '@/types/types'

export const useDictStore = defineStore('dictStore', () => {
  const dict = ref<Dict>()
  return { dict }
})
