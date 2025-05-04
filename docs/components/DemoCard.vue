<template>
  <stark-card title="卡片标题">
    这里是卡片内容
  </stark-card>
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