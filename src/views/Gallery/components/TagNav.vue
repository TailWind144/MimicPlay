<template>
  <div class="flex gap-4">
    <button
      :class="
        (tag === item ? 'bg-amber-600 text-white' : 'hover:opacity-70 hover:shadow-lg') +
        ' opacity-100 rounded-full border border-amber-600 px-6 py-2 text-sm font-semibold text-amber-600 transition-all duration-150 active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
      "
      v-for="(item, index) in tags"
      :key="index"
      @click="emitClick(item)"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { tags, tag } = defineProps(['tags', 'tag'])
const emit = defineEmits(['click'])
const emitClick = (val: string) => {
  emit('click', val)
}
</script>

<style scoped></style>
