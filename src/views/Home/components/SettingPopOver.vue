<template>
  <div class="items-center justify-center flex">
    <Popover v-slot="{ open }" class="relative">
      <PopoverButton as="div" ref="popOveBtnRef">
        <el-tooltip
          placement="bottom"
          content="设置"
          :hide-after="150"
          :show-after="150"
          :show-arrow="false"
        >
          <Cog6ToothIcon
            v-if="!open"
            class="duration-300 transition-all h-8 w-8 text-white cursor-pointer scale-100 hover:scale-110"
          />
          <Cog6ToothIconSoild
            v-else
            class="duration-300 transition-all h-8 w-8 text-white cursor-pointer scale-100 hover:scale-110 hover:rotate-180"
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
        <PopoverPanel class="absolute left-1/2 bottom-[150%] z-10 mt-3 -translate-x-1/2 transform">
          <div class="rounded-lg shadow-lg bg-white flex flex-col py-7 px-5 gap-4">
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-900">自动播放次数</label>
              <ElInputNumber v-model="proxySetting.loopNums" :min="1" :max="10" step-strictly />
            </div>
            <div class="flex flex-col gap-2">
              <label class="text-sm text-gray-900">发音</label>
              <ListBox
                class="shadow rounded-lg"
                :data="audioTypes"
                :value="valueToTypes[proxySetting.audioType as keyof typeof valueToTypes]"
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
import { Cog6ToothIcon as Cog6ToothIconSoild } from '@heroicons/vue/20/solid'
import { useSettingStore } from '@/stores/settingStore'
import ListBox from '@/components/ListBox.vue'
import { ref } from 'vue'
const { proxySetting } = useSettingStore()
const audioTypes = ['美音', '英音']
const typesToValue = {
  美音: '0',
  英音: '1',
}
const valueToTypes = {
  '0': '美音',
  '1': '英音',
}
const popOveBtnRef = ref()

const handleChange = (val: audioType) => {
  proxySetting.audioType = typesToValue[val]
}
</script>
