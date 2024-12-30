<template>
  <div class="h-screen flex flex-col">
    <div
      class="flex items-center justify-center py-8 px-14 w-screen gap-8 md:h-40 flex-col md:flex-row"
    >
      <NavLogo class="md:mr-auto" />
      <div
        class="flex gap-6 items-center justify-center bg-white rounded-lg shadow-md px-8 py-3 shadow-amber-100"
      >
        <el-tooltip
          placement="top"
          content="切换课本"
          :hide-after="150"
          :show-after="150"
          :show-arrow="false"
        >
          <router-link to="/gallery">{{ dict?.nick }}</router-link>
        </el-tooltip>
        <ListBox :data="units" :value="selectedUnit" @change="handleChange" />
      </div>
    </div>
    <div class="flex items-center justify-center flex-1 flex-col">
      <div class="flex-1 flex w-screen px-8 sm:px-20 gap-8 py-6 relative">
        <transition appear name="bounce" mode="out-in">
          <BackToFirstTip v-show="index >= 2" class="absolute" @click="() => (index = 0)" />
        </transition>
        <PrevWordTip @click="prevWord" class="flex-1" :showWord="showWords[index - 1]" />
        <div class="flex flex-col gap-4 items-center justify-center" v-show="!isEmpty">
          <div class="text-gray-600 w-fit text-4xl lg:text-8xl word text-center relative">
            <span>{{ showWords[index]?.english }}</span>
            <div class="absolute -right-14 top-1/2 -translate-y-1/2 flex">
              <VolumeIndex :word="audioWord" ref="audioRef" />
            </div>
          </div>
          <div class="text-center text-gray-600 text-xl basis-7">
            {{ showWords[index]?.pronunciation }}
          </div>
          <div class="text-center text-2xl text-[#2e2e2e]">{{ showWords[index]?.chinese }}</div>
        </div>
        <div v-show="isEmpty" class="flex"><EmptyStatus :text="'请添加单词'" /></div>
        <NextWordTip @click="nextWord" class="flex-1" :showWord="showWords[index + 1]" />
        <div
          v-show="isAutoPlaying"
          class="absolute w-full h-full left-0 top-0 z-10 cursor-not-allowed"
          @click="
            () =>
              ElMessage({
                message: '请暂停自动播放后操作！',
                type: 'warning',
                plain: true,
                offset: 90,
              })
          "
        ></div>
      </div>
    </div>
    <div class="h-40 flex flex-col justify-between items-center">
      <div>
        <ToolBar
          @auto-play-click="autoPlay"
          @edit-word-list="showEditDialog"
          :isAutoPlaying
          :ifLoadingShow
        />
      </div>
      <ViewFooter class="mt-auto" />
    </div>
    <WordListDialog
      :isOpen
      :selectedUnit
      :tableData="words[selectedUnit]"
      :showWords
      @close="closeEditDialog"
      @modalClose="isOpen = !isOpen"
    />
  </div>
</template>

<script setup lang="ts">
import NavLogo from '@/components/NavLogo.vue'
import { RouterLink } from 'vue-router'
import WordListDialog from '@/views/Home/components/WordListDialog.vue'
import ToolBar from './components/ToolBar.vue'
import ListBox from '@/components/ListBox.vue'
import VolumeIndex from '@/components/WordPronunciationIcon/VolumeIndex.vue'
import { fetchDict } from '@/utils/fetch'
import NextWordTip from './components/NextWordTip.vue'
import PrevWordTip from './components/PrevWordTip.vue'
import EmptyStatus from '@/components/EmptyStatus.vue'
import type { UnitToWords, Words } from '@/types/types'
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { ElTooltip, ElMessage } from 'element-plus'
import { useDictStore } from '@/stores/dictStore'
import sleep from '@/utils/sleep'
import { useSettingStore } from '@/stores/settingStore'
import BackToFirstTip from './components/BackToFirstTip.vue'
import ViewFooter from '@/components/ViewFooter.vue'

const { dict } = useDictStore()
const index = ref<number>(0)
// 本地缓存读取——当前单元
const selectedUnit = ref(localStorage.getItem('selectedUnit') ?? '全部')
const isOpen = ref(false)
const audioRef = ref()

const allWords = ref<Words>([])
const words = ref<UnitToWords>({})
const units = ref<Array<string>>()
const showWords = ref<Words>([])
const audioWord = computed(() => {
  if (showWords.value[index.value]) {
    const word = showWords.value[index.value].english
    if (isCombineWord(word)) word.replace(' ', '_')
    return word
  }
  return ''
})
const isEmpty = computed(() => showWords.value.length === 0)

watch(selectedUnit, () => {
  showWords.value = words.value[selectedUnit.value]
})
// 本地缓存设置——单词列表
watch(showWords, () => {
  localStorage.setItem('showWords', JSON.stringify(showWords.value))
})

const fetchWords = async () => {
  allWords.value = await fetchDict(dict!.path)
  words.value = wordsGroupbyUnit(allWords.value)
  units.value = Object.keys(words.value)
  // 本地缓存读取——单词列表
  if (localStorage.getItem('showWords'))
    showWords.value = JSON.parse(localStorage.getItem('showWords')!)
  else showWords.value = words.value[selectedUnit.value]
}
fetchWords()

const nextWord = () => {
  index.value++
}
const prevWord = () => {
  index.value--
}

// 翻页笔支持：pageUp播放当前单词，pageDown下一个单词
const pageUp = () => {
  audioRef.value.play()
}
const pageDown = () => {
  if (index.value !== showWords.value.length - 1) nextWord()
}
const handleKeyUp = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'PageUp':
      pageUp()
      break
    case 'PageDown':
      pageDown()
      break
  }
}
onMounted(() => {
  window.addEventListener('keyup', handleKeyUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyUp)
})

const { proxySetting } = useSettingStore()
const autoPlayFlag = ref(false)
const isAutoPlaying = ref(false)
const ifLoadingShow = computed(() => autoPlayFlag.value && !isAutoPlaying.value)
const autoPlay = async () => {
  if (!isAutoPlaying.value) {
    if (autoPlayFlag.value) return
    autoPlayFlag.value = true
    isAutoPlaying.value = true
    while (index.value < showWords.value.length) {
      let i = proxySetting.loopNums
      while (i--) {
        if (!isAutoPlaying.value) break
        audioRef.value.play()
        const audioDuration = audioRef.value.getAudioDuration()
        await sleep(audioDuration * 1000 * 2)
      }
      if (!isAutoPlaying.value) break
      if (index.value < showWords.value.length - 1) nextWord()
      else break
      await sleep(1000)
    }
    autoPlayFlag.value = false
  }
  isAutoPlaying.value = false
  audioRef.value.pause()
}

const handleChange = (unit: string) => {
  selectedUnit.value = unit
  // 本地缓存设置——当前单元
  localStorage.setItem('selectedUnit', unit)
  index.value = 0
}

const showEditDialog = () => {
  isOpen.value = true
}
const closeEditDialog = (selectedWords: Words) => {
  isOpen.value = false
  showWords.value = selectedWords
  index.value = 0
}

const isCombineWord = (word: string) => word.includes(' ')
const wordsGroupbyUnit = (arr: Words): UnitToWords => {
  const unitToWords: UnitToWords = {}
  unitToWords['全部'] = arr
  for (const obj of arr) {
    const { unit } = obj
    if (!(unit in unitToWords)) unitToWords[unit] = []
    unitToWords[unit].push(obj)
  }
  return unitToWords
}
</script>

<style scoped>
a {
  color: #2e2e2e;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  transition: all 150ms ease-in-out;
}
a:hover {
  color: #fff;
  background-color: #d97706;
}
</style>
