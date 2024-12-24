<template>
  <button
    :class="`${type} rounded-lg border px-6 py-2 text-sm font-semibold transition-all duration-150 hover:shadow-lg active:scale-95 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`"
    @click="emitClick"
  >
    {{ text }}
  </button>
</template>

<script setup lang="ts">
const { text, type = 'primary' } = defineProps(['text', 'type'])
const emit = defineEmits(['click'])
const emitClick = () => {
  emit('click')
}
</script>

<style scoped>
.primary {
  color: #d97706;
  border-color: #d97706;
}
.primary:hover {
  background-color: #d97706;
  color: white;
}
.cancel {
  color: #b1b3b8;
  border-color: #b1b3b8;
}
.cancel:hover {
  background-color: #b1b3b8;
  color: white;
}
</style>
