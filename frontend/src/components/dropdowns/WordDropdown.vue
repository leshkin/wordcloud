<script setup>
  import { ref } from 'vue'
  import { onClickOutside } from '@vueuse/core'

  let isActive = ref(false)
  const props = defineProps({ modelValue: Array })
  const emit = defineEmits(['update:modelValue'])

  const dropdown = ref(null)
  onClickOutside(dropdown, () => {
      isActive.value = false
    }
  )

  const open = () => {
    isActive.value = !isActive.value
  }

  const select = (word) => {
    console.log(word.visible)
    word.visible = !word.visible
    emit('update:modelValue', props.modelValue)
  }
</script>

<template>
  <div class="dropdown" :class="{'is-active': isActive}" ref="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="open()">
        <span>total {{ modelValue.length }}</span>
        <span class="icon is-small">
          <span class="material-icons">
            expand_more
          </span>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-for="word in modelValue" :key="word.name" class="dropdown-item">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" checked @change="select(word)">
                {{ word.name }}
                <span class="word-count">{{ word.count }}</span>
              </label>
            </div>
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

  label.checkbox {
    word-break: break-all;
  }

  .word-count {
    border-radius: 3px;
    border: 1px solid gray;
    padding: 0px 3px;
  }
</style>