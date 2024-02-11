<template>
  <YandexAdInHeader v-if="type === 'header'" :key="refreshKey" />
  <YandexAdInResult v-if="type === 'result'" :key="refreshKey" />
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps({
  type: { type: String },
})

const refreshKey = ref(0)
let intervalId

onMounted(() => {
  intervalId = setInterval(() => {
    refreshKey.value++
  }, 31000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>
