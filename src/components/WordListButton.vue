<template>
  <button
    class="inline-flex items-center gap-2 rounded border border-[#e91e63] px-6 py-2 text-sm font-semibold text-[#e91e63] transition-all hover:bg-[#e91e63] hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
    @click="emitClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const { text } = defineProps(['text'])
const emit = defineEmits(['click'])
const emitClick = () => {
  emit('click')
}
</script>

<style scoped></style>
