<template>
  <div ref="dropdown" class="relative">
    <button
      @click="toggle()"
      class="flex justify-between items-center gap-4 bg-white border rounded px-2 h-10 w-full"
      :style="{ 'font-family': currentFont.family }"
    >
      <span>{{ currentFont.family }}</span>
      <IconChevronDown />
    </button>

    <ul
      v-if="isActive"
      class="absolute top-11 overflow-y-auto cursor-pointer w-full rounded border border-gray shadow-md z-10 bg-white"
    >
      <li
        v-for="font in fonts"
        @click="select(font)"
        class="p-2 hover:bg-gray-200"
        :class="{ 'bg-gray-100': font.family === currentFont.family }"
        :style="{ 'font-family': font.family }"
      >
        {{ font.family }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { FONTS } from '~/config.js'

const props = defineProps({ modelValue: Object, textLang: String })
const emit = defineEmits(['update:modelValue'])

const isActive = ref(false)
const dropdown = ref(null)
const fonts = computed(() => {
  return FONTS.filter((font) => font.lang.includes(props.textLang))
})
const currentFont = ref(fonts.value[0])

onClickOutside(dropdown, () => {
  isActive.value = false
})

function toggle() {
  isActive.value = !isActive.value
}

function select(font) {
  currentFont.value = font
  isActive.value = !isActive.value
  emit('update:modelValue', font)
}
</script>
