<template>
  <button
    class="flex justify-center items-center gap-2 bg-gray-800 text-white font-bold rounded disabled:bg-gray-400 h-10"
    :disabled="disabled"
  >
    <IconDownload v-if="icon === 'download'" />
    <IconSpinner v-if="loading" class="h-6 w-6 animate-spin" />
    <div v-else>
      <slot></slot>
    </div>
  </button>
</template>

<script setup>
const props = defineProps({
  disabled: Boolean,
  loading: Boolean,
  icon: String,
})
</script>
