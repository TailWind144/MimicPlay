<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex items-center justify-center py-8 px-14 w-screen gap-8 h-32">
      <h1 class="font-bold mr-auto text-3xl text-amber-600">WordList</h1>
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
        <ListBox :units="units" @change="handleChange" />
      </div>
    </div>
    <div class="flex items-center justify-center flex-1 flex-col pb-32">
      <div class="flex-1 flex w-screen px-20 gap-8 py-6">
        <PrevWordTip @click="prevWord" class="flex-1" :showWord="showWords[index - 1]" />
        <div class="flex flex-col gap-4 items-center justify-center" v-show="!isEmpty">
          <div class="text-gray-600 w-fit text-8xl word text-center relative">
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
      </div>
      <div>
        <ToolBar
          @auto-play-click="autoPlay"
          @edit-word-list="showEditDialog"
          :isAutoPlaying
          :ifLoadingShow
        />
      </div>
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
import { computed, ref, watch } from 'vue'
import { ElTooltip } from 'element-plus'
import { useDictStore } from '@/stores/dictStore'
import sleep from '@/utils/sleep'

const { dict } = useDictStore()
const index = ref<number>(0)
const selectedUnit = ref('全部')
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

const fetchWords = async () => {
  allWords.value = await fetchDict(dict!.path)
  words.value = wordsGroupbyUnit(allWords.value)
  units.value = Object.keys(words.value)
  showWords.value = words.value[selectedUnit.value]
}
fetchWords()

const nextWord = () => {
  index.value++
}
const prevWord = () => {
  index.value--
}

const autoPlayFlag = ref(false)
const isAutoPlaying = ref(false)
const ifLoadingShow = computed(() => autoPlayFlag.value && !isAutoPlaying.value)
const autoPlay = async () => {
  if (!isAutoPlaying.value) {
    if (autoPlayFlag.value) return
    autoPlayFlag.value = true
    isAutoPlaying.value = true
    while (index.value < showWords.value.length) {
      let i = 2
      while (i--) {
        if (!isAutoPlaying.value) break
        audioRef.value.play()
        await sleep(2000)
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
  index.value = 0
}

const showEditDialog = () => {
  isOpen.value = true
}
const closeEditDialog = (selectedWords: Words) => {
  isOpen.value = false
  showWords.value = selectedWords
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
  background-color: rgb(217 119 6 / var(--tw-text-opacity, 1));
}
</style>
