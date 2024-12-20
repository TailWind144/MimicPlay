<template>
  <button
    :class="
      `border-${color} text-${color} hover:bg-${color} ` +
      'rounded-lg border px-6 py-2 text-sm font-semibold  transition-all duration-150  hover:text-white hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'
    "
    @click="emitClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const { text, color = 'amber-600' } = defineProps(['text', 'color'])
const emit = defineEmits(['click'])
const emitClick = () => {
  emit('click')
}
</script>

<style scoped></style>
