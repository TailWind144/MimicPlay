<template>
  <div class="min-h-screen flex flex-col">
    <div class="flex justify-end py-8 px-14">
      <ArrowRightIcon
        @click="backToHome"
        class="h-8 w-8 text-gray-600 opacity-50 hover:opacity-100 duration-300 cursor-pointer"
      />
    </div>
    <div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/outline'
const router = useRouter()

const backToHome = () => {
  router.push('/')
}
</script>

<style scoped></style>
