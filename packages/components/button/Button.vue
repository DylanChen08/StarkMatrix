<template>
  <button
    class="st-button"
    :class="[
      `st-button--${type}`,
      `st-button--${size}`,
      { 'is-disabled': disabled }
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

interface Props {
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  size?: 'small' | 'default' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<style lang="scss" scoped>
.st-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  background-color: var(--st-primary-color);
  color: var(--vp-c-text);
  border-color: var(--vp-c-divider);

  &--default {
    background: #fff;
    border-color: #dcdfe6;
    color: #606266;
  }

  &--primary {
    background-color: var(--vp-c-brand);
    color: #fff;
  }

  &--success {
    background: #67c23a;
    border-color: #67c23a;
    color: #fff;
  }

  &--warning {
    background: #e6a23c;
    border-color: #e6a23c;
    color: #fff;
  }

  &--danger {
    background: #f56c6c;
    border-color: #f56c6c;
    color: #fff;
  }

  &--small {
    padding: 6px 12px;
    font-size: 12px;
  }

  &--large {
    padding: 12px 20px;
    font-size: 16px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
}
</style> 