<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="emitModalClose" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-screen-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ selectedUnit + ' - 单词表' }}
              </DialogTitle>
              <div class="mt-2">
                <el-table
                  ref="tableRef"
                  :data="wordsList"
                  stripe
                  height="500"
                  style="width: 100%"
                  @select="handleSelectionChange"
                  @select-all="handleSelectionAllChange"
                  @scroll="handleScroll"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="english" label="单词" />
                  <el-table-column prop="pronunciation" label="音标" />
                  <el-table-column prop="chinese" label="中文" />
                  <template #append>
                    <div v-show="!isBottom" class="flex justify-center items-center py-2">
                      <BoxLoadingIcon />
                    </div>
                  </template>
                </el-table>
              </div>

              <div class="mt-4 flex gap-4">
                <WordListButton :text="'确定'" @click="emitClose" />
                <WordListButton :type="'cancel'" :text="'取消'" @click="emitModalClose" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import type { Words } from '@/types/types'
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { computed, nextTick, ref, watch } from 'vue'
import WordListButton from '@/components/WordListButton.vue'
import debounce from '@/utils/debounce'
import BoxLoadingIcon from '@/components/BoxLoadingIcon.vue'
const { isOpen, selectedUnit, tableData, showWords } = defineProps([
  'isOpen',
  'selectedUnit',
  'tableData',
  'showWords',
])
const emit = defineEmits(['close', 'modalClose'])
const emitClose = () => {
  emit('close', multipleSelection.value)
}
const emitModalClose = () => {
  // 当取消时重新将选中的单词设置为原来的值
  multipleSelection.value = showWords
  emit('modalClose')
}

const page = ref(1)
const tableRef = ref()
const wordsList = ref<Words>([])
const multipleSelection = ref<Words>([])
const showWordsSet = computed(() => new Set(multipleSelection.value))
const initSelection = () => {
  for (const row of wordsList.value) {
    if (showWordsSet.value.has(row)) tableRef.value.toggleRowSelection(row)
  }
}

watch(
  () => isOpen,
  (val) => {
    if (val) {
      getPagesList()
      nextTick(() => {
        initSelection()
      })
    }
  },
)
watch(
  () => showWords,
  (val) => {
    multipleSelection.value = val
  },
)
watch(page, (val, old) => {
  // 当原页数不为1，重新设置为1时不进行操作
  // 因为在打开对话框时会设置wordsList，此时不需要再次触发
  if (old !== 1 && val === 1) return
  wordsList.value = wordsList.value.concat(pagesList.value[val - 1])
  nextTick(() => {
    initSelection()
  })
})

const pageSize = 50
const pagesList = ref<Array<Words>>([[]])
const getPagesList = () => {
  pagesList.value = [[]]
  for (const row of tableData) {
    if (pagesList.value[pagesList.value.length - 1].length === pageSize) pagesList.value.push([])
    pagesList.value[pagesList.value.length - 1].push(row)
  }
  wordsList.value = pagesList.value[0]
  page.value = 1
}

const handleSelectionChange = (val: Words) => {
  multipleSelection.value = val
}
const handleSelectionAllChange = (val: Words) => {
  if (val.length) {
    multipleSelection.value = tableData
  } else multipleSelection.value = val
}

const isBottom = computed(() => page.value === pagesList.value.length)
const scroll = () => {
  const el = tableRef.value.$el.querySelector('.el-scrollbar__wrap')
  if (el && !isBottom.value && el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
    page.value++
  }
}
const handleScroll = debounce(scroll, 500)
</script>

<style scoped></style>
