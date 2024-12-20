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
import { fetchGallery } from './utils/fetch'
const dictStore = useDictStore()
const initDict = async () => {
  const gallery = await fetchGallery('/gallery.json')
  const tag = Object.keys(gallery)[0]
  dictStore.dict = gallery[tag][0]
}
initDict()
</script>

<style scoped></style>
