<template>
  <stark-button type="primary">主要按钮</stark-button>
  <stark-button type="success">成功按钮</stark-button>
</template>
<script setup>
import StarkUI from '@/packages/components'
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
if (instance && instance.appContext.app && !instance.appContext.app._starkui_installed) {
  instance.appContext.app.use(StarkUI)
  instance.appContext.app._starkui_installed = true
}
</script> 