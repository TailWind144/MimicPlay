<template>
  <button @click="handlePlay">
    <component :is="volumeComponents[index]"></component>
  </button>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import VolumeIcon from './VolumeIcon/VolumeIcon.vue'
import VolumeLowIcon from './VolumeIcon/VolumeLowIcon.vue'
import VolumeMediumIcon from './VolumeIcon/VolumeMediumIcon.vue'
import VolumeHighIcon from './VolumeIcon/VolumeHighIcon.vue'
import throttle from '@/utils/throttle'
import { useSettingStore } from '@/stores/settingStore'
const volumeComponents = [VolumeIcon, VolumeLowIcon, VolumeMediumIcon, VolumeHighIcon]
const isPlay = ref(false)
const index = ref(0)
const { word } = defineProps(['word'])

const { proxySetting } = useSettingStore()

let timeout: number | undefined
const audio: HTMLAudioElement = new Audio()
watchEffect(() => {
  audio.src = `https://dict.youdao.com/dictvoice?type=${proxySetting.audioType}&audio=${word}`
  isPlay.value = false
  index.value = 0
})
audio.addEventListener('ended', () => (isPlay.value = false))
audio.addEventListener('pause', () => (isPlay.value = false))

const play = () => {
  index.value = 0
  isPlay.value = !isPlay.value
  playAnimate()
}
const pause = () => {
  audio.currentTime = 0
  audio.pause()
}

const handlePlay = throttle(play, 1000)
const playAnimate = async () => {
  clearTimeout(timeout)
  if (isPlay.value) audio.play()
  else pause()

  while (isPlay.value) {
    await vloumeAnimate(500)
  }
}
function vloumeAnimate(time: number) {
  return new Promise((resolve) => {
    timeout = setTimeout(() => {
      index.value = isPlay.value
        ? index.value < volumeComponents.length - 1
          ? index.value + 1
          : 0
        : 0
      resolve(index.value)
    }, time)
  })
}

const getAudioDuration = () => {
  return audio.duration
}

defineExpose({
  play,
  pause,
  getAudioDuration,
})
</script>

<style scoped></style>
