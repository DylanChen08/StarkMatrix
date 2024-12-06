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
        <div class="language-vue line-numbers">
          <pre><code v-html="highlightedCode"></code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/themes/prism-okaidia.css'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
import StButton from '@/packages/components/button/Button.vue'
import StInput from '@/packages/components/input/Input.vue'
import StTimePicker from '@/packages/components/time-picker/TimePicker.vue'

// 注册组件供演示使用
defineOptions({
  components: {
    'st-button': StButton,
    'st-input': StInput,
    'st-time-picker': StTimePicker
  }
})

defineProps<{
  title?: string
}>()

const expanded = ref(false)
const toggleCode = () => {
  expanded.value = !expanded.value
}

// 格式化源代码
const formatCode = (code: string) => {
  const template = code
  return `<template>
  ${template}
</template>`
}


const value = ref('')



// 获取源代码
const sourceCode = computed(() => {
  const demoSlot = document.querySelector('.vp-demo__preview')?.innerHTML || ''
  return formatCode(demoSlot)
})

// 代码高亮
const highlightedCode = computed(() => {
  return Prism.highlight(
    sourceCode.value,
    Prism.languages.markup,
    'vue'
  )
})
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

    :deep(.line-numbers-rows) {
      border-right: 1px solid var(--vp-c-divider);
      padding-right: 0.5em;
    }

    :deep(.token) {
      &.tag { color: #2973b7; }
      &.attr-name { color: #42b983; }
      &.attr-value { color: #a37acc; }
      &.punctuation { 
        color: #2973b7;
        opacity: 0.7;
      }
    }

    pre {
      margin: 0;
      padding: 16px;
      background-color: var(--vp-code-block-bg);
      border-radius: 4px;
      white-space: pre-wrap;
      word-break: break-word;
    }

    code {
      font-family: var(--vp-font-family-mono);
      font-size: 14px;
      line-height: 1.5;
      tab-size: 2;
    }
  }
}
</style> 