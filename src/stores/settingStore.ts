import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Settings } from '@/types/types'

export const useSettingStore = defineStore('settingStore', () => {
  const settings = ref<Settings>({
    loopNums: 2,
    audioType: '0',
  })

  // 本地缓存设置——播放设置
  const proxySetting = new Proxy(settings.value, {
    set(target, p: string, newValue, receiver) {
      Reflect.set(target, p, newValue, receiver)
      localStorage.setItem('setting', JSON.stringify(target))
      return true
    },
  })

  return { proxySetting }
})
