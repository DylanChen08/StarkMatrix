<template>
  <div class="st-input">
    <input
      ref="inputRef"
      class="st-input__inner"
      :class="{ 'is-disabled': disabled }"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="handleInput"
      @change="handleChange"
    />
    <span
      v-if="clearable && modelValue"
      class="st-input__clear"
      @click="handleClear"
    >
      ×
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  type?: string
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '',
  disabled: false,
  clearable: false,
  type: 'text'
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  clear: []
}>()

const inputRef = ref<HTMLInputElement>()

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('change', value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  inputRef.value?.focus()
}
</script>

<style lang="scss" scoped>
.st-input {
  position: relative;
  display: inline-flex;
  width: 100%;

  &__inner {
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: all 0.2s;
    outline: none;

    &:focus {
      border-color: var(--vp-c-brand);
    }

    &.is-disabled {
      background-color: #f5f7fa;
      cursor: not-allowed;
    }
  }

  &__clear {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #c0c4cc;
    font-size: 16px;

    &:hover {
      color: #909399;
    }
  }
}
</style> 