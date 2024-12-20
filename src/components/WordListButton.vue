<template>
  <button
    class="inline-flex items-center gap-2 rounded-lg border border-amber-600 px-6 py-2 text-sm font-semibold text-amber-600 transition-all duration-150 hover:bg-amber-600 hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
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
