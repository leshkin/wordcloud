<template>
  <div id="yandex_rtb_R-A-2074307-6" class="w-full h-48 my-5"></div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.yaContextCb.push(() => {
    Ya.Context.AdvManager.render({
      blockId: 'R-A-2074307-6',
      renderTo: 'yandex_rtb_R-A-2074307-6',
    })
  })
})
</script>
