<template>
  <div ref="dropdown" class="relative">
    <button @click="toggle()" class="flex justify-between items-center gap-4 bg-white border rounded px-2 h-10 w-full">
      {{ visible }} / {{ total }}
      <IconChevronDown />
    </button>

    <ul
      v-if="isActive"
      class="absolute top-11 overflow-y-scroll max-h-64 cursor-pointer w-full rounded border border-gray drop-shadow-md z-10 bg-white"
    >
      <li v-for="word in modelValue" :key="word.name" class="p-2 hover:bg-gray-200">
        <label class="flex gap-2 items-center">
          <input type="checkbox" class="scale-125 accent-gray-800" :checked="word.visible" @change="select(word)" />
          {{ word.name }}
          <div class="bg-sky-200 rounded px-2">{{ word.count }}</div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script setup>
const isActive = ref(false)
const props = defineProps({ modelValue: Array })
const emit = defineEmits(['update:modelValue'])

const dropdown = ref(null)

const total = computed(() => {
  return props.modelValue.length
})

const visible = computed(() => {
  return props.modelValue.filter((v) => v.visible).length
})

onClickOutside(dropdown, () => {
  isActive.value = false
})

function toggle() {
  isActive.value = !isActive.value
}

function select(word) {
  word.visible = !word.visible
  emit('update:modelValue', props.modelValue)
}
</script>
