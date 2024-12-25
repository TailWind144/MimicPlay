<template>
  <div class="items-center justify-center flex">
    <Popover class="relative">
      <PopoverButton as="div">
        <el-tooltip
          placement="bottom"
          content="设置"
          :hide-after="150"
          :show-after="150"
          :offset="2"
          :show-arrow="false"
        >
          <Cog6ToothIcon
            class="duration-300 transition-all h-8 w-8 scale-0 text-white cursor-pointer group-hover:scale-100"
          />
        </el-tooltip>
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          :unmount="false"
          class="absolute left-1/2 bottom-[150%] z-10 mt-3 -translate-x-1/2 transform"
        >
          <div class="rounded-md shadow-lg bg-white flex flex-col py-7 px-5 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-900">自动播放次数</label>
              <ElInputNumber v-model="settings.loopNums" :min="1" :max="10" step-strictly />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-900">发音</label>
              <ListBox
                class="shadow rounded-lg"
                :data="audioTypes"
                :default-value="'美音'"
                @change="handleChange"
              />
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
type audioType = '美音' | '英音'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ElInputNumber, ElTooltip } from 'element-plus'
import { Cog6ToothIcon } from '@heroicons/vue/24/outline'
import { useSettingStore } from '@/stores/settingStore'
import ListBox from './ListBox.vue'
const { settings } = useSettingStore()
const audioTypes = ['美音', '英音']
const typesToValue = {
  美音: '0',
  英音: '1',
}

const handleChange = (val: audioType) => {
  settings.audioType = typesToValue[val]
}
</script>
