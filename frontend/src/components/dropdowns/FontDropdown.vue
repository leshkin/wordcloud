<script setup>
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { FONTS } from '@/config.js'

  let isActive = ref(false)
  let currentFont = ref(FONTS[0])
  const props = defineProps({ modelValue: String })
  const emit = defineEmits(['update:modelValue'])

  const dropdown = ref(null)
  onClickOutside(dropdown, () => {
      isActive.value = false
    }
  )

  const open = () => {
    isActive.value = !isActive.value
  }

  const select = (font) => {
    currentFont.value = font
    isActive.value = !isActive.value
    emit('update:modelValue', font)
  }
</script>

<template>
  <div class="dropdown" :class="{'is-active': isActive}" ref="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
              @click="open()" :style="{'font-family': currentFont.family}">
        <span>{{ currentFont.family }}</span>
        <span class="icon is-small">
          <span class="material-icons">
            expand_more
          </span>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-for="font in FONTS"
             :key="font" class="dropdown-item"
             @click="select(font)"
             :class="{'has-background-info-light': font.family === currentFont.family}"
             :style="{'font-family': font.family}">
          {{ font.family }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .dropdown-item {
    cursor: pointer;
    font-size: 1rem;
  }
</style>