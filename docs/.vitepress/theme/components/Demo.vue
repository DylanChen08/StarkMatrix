<template>
  <div class="vp-demo">
    <div class="vp-demo__inner">
      <div class="vp-demo__preview">
        <slot name="demo"></slot>
      </div>
      <div class="vp-demo__action" @click="toggleCode">
        <span class="vp-demo__title">{{ title }}</span>
        <span class="vp-demo__expand">{{ expanded ? '收起' : '展开' }}</span>
      </div>
      <div class="vp-demo__source" v-show="expanded">
        <slot name="source"></slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import MyButton from '../../../../packages/components/button/Button.vue'
import MyInput from '../../../../packages/components/input/Input.vue'
import MyTimePicker from '../../../../packages/components/time-picker/TimePicker.vue'

// 注册组件供演示使用
defineOptions({
  components: {
    MyButton,
    MyInput,
    MyTimePicker
  }
})

defineProps<{
  title?: string
}>()

const expanded = ref(false)
const toggleCode = () => {
  expanded.value = !expanded.value
}
</script>

<style lang="scss" scoped>
.vp-demo {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  margin: 16px 0;

  &__inner {
    background-color: var(--vp-c-bg);
  }

  &__preview {
    padding: 24px;
  }

  &__action {
    border-top: 1px solid var(--vp-c-divider);
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }

  &__title {
    font-size: 14px;
    color: var(--vp-c-text-2);
  }

  &__expand {
    font-size: 14px;
    color: var(--vp-c-brand);
  }

  &__source {
    border-top: 1px solid var(--vp-c-divider);
    padding: 16px;
  }
}
</style> 