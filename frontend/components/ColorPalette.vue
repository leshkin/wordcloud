<template>
  <div class="flex gap-1 rounded p-1 border" :style="{ 'background-color': colorPalette.backgroundColor }">
    <div v-for="color in colorPalette.colors" :key="color" class="w-5 h-5" :style="{ 'background-color': color }"></div>
  </div>
</template>

<script setup>
const props = defineProps({ colorPalette: Object })
</script>
