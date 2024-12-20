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
                  :data="tableData"
                  stripe
                  height="500"
                  style="width: 100%"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" width="55" />
                  <el-table-column prop="english" label="单词" />
                  <el-table-column prop="pronunciation" label="音标" />
                  <el-table-column prop="chinese" label="中文" />
                </el-table>
              </div>

              <div class="mt-4 flex gap-4">
                <WordListButton :text="'确定'" @click="emitClose" />
                <WordListButton
                  class="border-gray-500 text-gray-400 hover:bg-gray-500"
                  :text="'取消'"
                  @click="emitModalClose"
                />
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
  emit('modalClose')
}

const tableRef = ref()
const multipleSelection = ref<Words>([])
const showWordsSet = computed(() => new Set(showWords))
const initSelection = () => {
  for (const row of tableData) {
    if (showWordsSet.value.has(row)) tableRef.value.toggleRowSelection(row)
  }
}

watch(
  () => isOpen,
  (val) => {
    if (val) {
      nextTick(() => {
        initSelection()
      })
    }
  },
)

const handleSelectionChange = (val: Words) => {
  multipleSelection.value = val
}
</script>

<style scoped></style>
