<template>
  <stark-dialog v-model="visible" title="对话框标题">
    这里是对话框内容
  </stark-dialog>
  <stark-button @click="visible = true">打开对话框</stark-button>
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
const visible = ref(false)
</script> 