import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDictStore = defineStore('dictStore', () => {
  const dict = ref()
  return { dict }
})
