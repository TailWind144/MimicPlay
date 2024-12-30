<template>
  <div
    class="bg-amber-400 group rounded-full w-40 h-12 py-2 px-3 shadow-lg duration-500 transition-all flex items-center justify-center"
  >
    <ListBulletIcon
      @click="emitWordList"
      class="duration-300 cursor-pointer transition-all h-8 w-8 text-white scale-100 hover:scale-110"
    />
    <div class="flex-1 items-center justify-center flex relative">
      <!-- <Squares2X2Icon
        class="duration-300 absolute transition-all h-8 w-8 text-white group-hover:scale-0"
      /> -->
      <SettingPopOver ref="popOverRef" />
    </div>
    <LoadingIcon v-show="ifLoadingShow" class="h-6 w-6 text-white mx-1 animate-spin" />
    <PlayCircleIcon
      v-show="!isAutoPlaying && !ifLoadingShow"
      @click="emitAutoPlay"
      class="duration-300 cursor-pointer transition-all h-8 w-8 text-white scale-100 hover:scale-110"
    />
    <PauseCircleIcon
      v-show="isAutoPlaying"
      @click="emitAutoPlay"
      class="duration-300 cursor-pointer transition-all h-8 w-8 text-white scale-100 hover:scale-110"
    />
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/components/LoadingIcon.vue'
import SettingPopOver from '@/views/Home/components/SettingPopOver.vue'
import { ListBulletIcon, PlayCircleIcon, PauseCircleIcon } from '@heroicons/vue/24/outline'
const { isAutoPlaying, ifLoadingShow } = defineProps(['isAutoPlaying', 'ifLoadingShow'])

const emit = defineEmits(['autoPlayClick', 'editWordList'])
const emitAutoPlay = () => {
  emit('autoPlayClick')
}
const emitWordList = () => {
  emit('editWordList')
}
</script>

<style scoped></style>
