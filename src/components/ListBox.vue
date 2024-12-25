<template>
  <div>
    <Listbox v-model="selected">
      <div class="relative">
        <ListboxButton
          class="group/ListBtn duration-150 relative w-48 rounded-lg bg-white py-2 pl-3 pr-10 text-left focus:outline-none hover:text-white hover:bg-amber-600"
        >
          <span class="block truncate text-center">{{ selected }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400 group-hover/ListBtn:text-white" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="(item, index) in data"
              :key="index"
              :value="item"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                  'relative select-none py-2 pl-10 pr-4 cursor-pointer',
                ]"
              >
                <span :class="[selected ? 'font-medium' : 'font-normal', 'block truncate']">{{
                  item
                }}</span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                >
                  <CheckIcon class="h-5 w-5" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'
const { data, defaultValue = '全部' } = defineProps(['data', 'defaultValue'])
const selected = ref<string>(defaultValue)
const emit = defineEmits(['change'])
const emitChange = () => {
  emit('change', selected.value)
}
watch(selected, emitChange)
</script>

<style scoped></style>
