<script setup>
import { ref, computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
let isActive = ref(false)
const props = defineProps({ modelValue: Array })
const emit = defineEmits(['update:modelValue'])

const dropdown = ref(null)
onClickOutside(dropdown, () => {
  isActive.value = false
})

const open = () => {
  isActive.value = !isActive.value
}

const select = (word) => {
  word.visible = !word.visible
  emit('update:modelValue', props.modelValue)
}

const total = computed(() => {
  return props.modelValue.length
})

const visible = computed(() => {
  return props.modelValue.filter((v) => v.visible).length
})
</script>

<template>
  <div class="dropdown" :class="{ 'is-active': isActive }" ref="dropdown">
    <div class="dropdown-trigger">
      <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="open()">
        <span>{{ t('total') }} {{ total }}</span
        ><span class="mx-1">/</span><span>{{ t('visible') }} {{ visible }}</span>
        <span class="icon is-small">
          <span class="material-icons"> expand_more </span>
        </span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <div v-for="word in modelValue" :key="word.name" class="dropdown-item">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input type="checkbox" :checked="word.visible" @change="select(word)" />
                {{ word.name }}
                <span class="tag is-light">{{ word.count }}</span>
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

.dropdown-content {
  height: 300px;
  width: 250px;
  overflow: auto;
}
</style>
