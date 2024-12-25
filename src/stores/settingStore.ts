import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Settings } from '@/types/types'

export const useSettingStore = defineStore('settingStore', () => {
  const settings = ref<Settings>({
    loopNums: 2,
    audioType: '0',
  })
  return { settings }
})
