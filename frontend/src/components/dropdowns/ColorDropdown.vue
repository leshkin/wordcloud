<script setup>
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'
  import { COLOR_PALETTES } from '/src/config.js'

  let isActive = ref(false)
  let currentColorPalette = ref(COLOR_PALETTES[0])
  const props = defineProps({ modelValue: Object })
  const emit = defineEmits(['update:modelValue'])

  const dropdown = ref(null)
  onClickOutside(dropdown, () => {
      isActive.value = false
    }
  )

  const open = () => {
    isActive.value = !isActive.value
  }

  const select = (colorPalette) => {
    currentColorPalette.value = colorPalette
    isActive.value = !isActive.value
    emit('update:modelValue', colorPalette)
  }
</script>

<template>
  <div class="dropdown" :class="{'is-active': isActive}" ref="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu"
              @click="open()">
        <span :style="{'background-color': currentColorPalette.backgroundColor}" class="background-color">
          <span v-for="color in currentColorPalette.colors" :key="color"
                class="color" :style="{'background-color': color}"></span>
        </span>
        <span class="icon is-small">
          <span class="material-icons">
            expand_more
          </span>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-for="colorPalette in COLOR_PALETTES"
             :key="colorPalette.name"
             class="dropdown-item"
             :class="{'has-background-info-light': colorPalette.name === currentColorPalette.name}"
             @click="select(colorPalette)">
            <div :style="{'background-color': colorPalette.backgroundColor}" class="background-color">
                <div v-for="color in colorPalette.colors" :key="color"
                     class="color"
                     :style="{'background-color': color}"></div>
            </div>
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

  .color {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }


  .color:last-child {
    margin-right: 0px;
  }

  .background-color {
    padding-left: 5px;
    padding-right: 5px;
    height: 30px;
    display: inline-flex;
    align-items: center;
    vertical-align: middle;
    border-radius: 5px;
  }
</style>