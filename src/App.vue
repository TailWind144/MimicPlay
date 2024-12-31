<template>
  <div class="min-h-screen bg-[#faf9ff] overflow-x-hidden">
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" :name="route.meta.transition">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { useDictStore } from './stores/dictStore'
import { useSettingStore } from './stores/settingStore'
import { fetchGallery } from './utils/fetch'

const dictStore = useDictStore()
const initDict = async () => {
  if (localStorage.getItem('dict')) {
    // 本地缓存读取——课本
    dictStore.dict = JSON.parse(localStorage.getItem('dict') as string)
    return
  }
  const gallery = await fetchGallery('/mimicplay/gallery.json')
  const tag = Object.keys(gallery)[0]
  dictStore.dict = gallery[tag][0]
  localStorage.setItem('dict', JSON.stringify(dictStore.dict))
}
initDict()

const { proxySetting } = useSettingStore()
const initLocalStorage = () => {
  if (localStorage.getItem('setting')) {
    // 本地缓存读取——播放设置
    const setting = JSON.parse(localStorage.getItem('setting') as string)
    proxySetting.loopNums = setting.loopNums
    proxySetting.audioType = setting.audioType
    return
  }
  // 本地缓存设置——播放默认设置
  localStorage.setItem('setting', JSON.stringify(proxySetting))
}
initLocalStorage()
</script>

<style scoped></style>
