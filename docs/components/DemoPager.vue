<template>
  <stark-pager v-model:current-page="page" :total="100" :page-size="10" />
</template>
<script setup>
import { ref } from 'vue'
import StarkUI from '@/packages/components'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
if (instance && instance.appContext.app && !instance.appContext.app._starkui_installed) {
  instance.appContext.app.use(StarkUI)
  instance.appContext.app._starkui_installed = true
}
const page = ref(1)
</script> 