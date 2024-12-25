<template>
  <div
    class="bg-amber-400 group rounded-full w-12 h-12 py-2 px-3 shadow-lg hover:w-40 duration-500 transition-all flex items-center justify-center"
  >
    <el-tooltip
      placement="top"
      content="编辑播放单词"
      :hide-after="150"
      :show-after="150"
      :offset="2"
      :show-arrow="false"
    >
      <ListBulletIcon
        @click="emitWordList"
        class="duration-300 cursor-pointer transition-all h-8 w-8 scale-0 text-white group-hover:scale-100"
      />
    </el-tooltip>
    <div class="flex-1 items-center justify-center flex relative">
      <Squares2X2Icon
        class="duration-300 absolute transition-all h-8 w-8 text-white group-hover:scale-0"
      />
      <SettingPopOver />
    </div>
    <el-tooltip
      placement="top"
      content="请等待"
      :hide-after="150"
      :show-after="150"
      :offset="2"
      :show-arrow="false"
    >
      <LoadingIcon
        v-show="ifLoadingShow"
        class="h-6 w-6 hidden text-white mx-1 animate-spin group-hover:inline-block"
      />
    </el-tooltip>
    <el-tooltip
      placement="top"
      content="自动播放"
      :hide-after="150"
      :show-after="150"
      :offset="2"
      :show-arrow="false"
    >
      <PlayCircleIcon
        v-show="!isAutoPlaying && !ifLoadingShow"
        @click="emitAutoPlay"
        class="duration-300 cursor-pointer transition-all h-8 w-8 scale-0 text-white group-hover:scale-100"
      />
    </el-tooltip>
    <el-tooltip
      placement="top"
      content="暂停"
      :hide-after="150"
      :show-after="150"
      :offset="2"
      :show-arrow="false"
    >
      <PauseCircleIcon
        v-show="isAutoPlaying"
        @click="emitAutoPlay"
        class="duration-300 cursor-pointer transition-all h-8 w-8 scale-0 text-white group-hover:scale-100"
      />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import LoadingIcon from '@/components/LoadingIcon.vue'
import SettingPopOver from '@/components/SettingPopOver.vue'
import {
  Squares2X2Icon,
  ListBulletIcon,
  PlayCircleIcon,
  PauseCircleIcon,
} from '@heroicons/vue/24/outline'
import { ElTooltip } from 'element-plus'
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
