<template>
  <button class="theme-toggle" @click="toggleTheme" :title="buttonTitle">
    <div class="icon">
      <div v-if="isDark">🌙</div>
      <div v-else>☀️</div>
    </div>
  </button>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { isDark } = useData()

const buttonTitle = computed(() => isDark.value ? '切换到亮色模式' : '切换到暗色模式')

const toggleTheme = () => {
  isDark.value = !isDark.value
}
</script>

<style lang="scss" scoped>
.theme-toggle {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;

  .icon {
    font-size: 18px;
    line-height: 1;
  }
}
</style> 