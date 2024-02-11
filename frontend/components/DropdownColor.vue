<template>
  <div ref="dropdown" class="relative">
    <button @click="toggle()" class="flex justify-between items-center gap-4 bg-white border rounded px-2 h-10 w-full">
      <ColorPalette :color-palette="currentColorPalette" />
      <IconChevronDown />
    </button>

    <ul
      v-if="isActive"
      class="absolute top-11 overflow-y-auto cursor-pointer w-full rounded border border-gray shadow-md z-10 bg-white"
    >
      <li
        v-for="colorPalette in COLOR_PALETTES"
        :key="colorPalette.name"
        :class="{ 'bg-slate-100': colorPalette.name === currentColorPalette.name }"
        class="flex gap-2 items-center hover:bg-slate-200 p-2"
        @click="select(colorPalette)"
      >
        <ColorPalette :color-palette="colorPalette" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { COLOR_PALETTES } from '~/config.js'

const props = defineProps({ modelValue: Object })
const emit = defineEmits(['update:modelValue'])

const isActive = ref(false)
const dropdown = ref(null)
let currentColorPalette = ref(COLOR_PALETTES[0])

onClickOutside(dropdown, () => {
  isActive.value = false
})

function toggle() {
  isActive.value = !isActive.value
}

function select(colorPalette) {
  currentColorPalette.value = colorPalette
  isActive.value = !isActive.value
  emit('update:modelValue', colorPalette)
}
</script>
