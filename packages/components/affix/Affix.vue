<template>
  <div ref="affixRef" class="st-affix">
    <div ref="placeholderRef" class="st-affix__placeholder" :class="{ 'st-affix__placeholder--active': fixed }">
      <div :style="placeholderStyle"></div>
    </div>
    <div ref="wrapperRef" class="st-affix__wrapper" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import type { AffixProps, AffixEmits } from './types'

const props = withDefaults(defineProps<AffixProps>(), {
  zIndex: 100
})

const emit = defineEmits<AffixEmits>()

const affixRef = ref<HTMLElement>()
const wrapperRef = ref<HTMLElement>()
const placeholderRef = ref<HTMLElement>()
const fixed = ref(false)
const target = ref<HTMLElement | Window | null>(window)
const rect = ref<DOMRect>()

// 计算固定时的样式
const affixStyle = computed(() => {
  if (!fixed.value) return {}
  
  const style: Record<string, string | number> = {
    position: 'fixed',
    zIndex: props.zIndex,
    left: rect.value ? `${rect.value.left}px` : '0'
  }
  
  if (props.offsetTop !== undefined) {
    style.top = `${props.offsetTop}px`
  }
  if (props.offsetBottom !== undefined) {
    style.bottom = `${props.offsetBottom}px`
  }
  
  return style
})

// 计算占位符的样式
const placeholderStyle = computed(() => {
  if (!rect.value) return {}
  return {
    width: `${rect.value.width}px`,
    height: `${rect.value.height}px`
  }
})

// 获取目标滚动容器
const getTarget = (): Window | HTMLElement | null => {
  if (typeof props.target === 'string') {
    return document.querySelector(props.target)
  }
  return props.target || window
}

// 更新位置
const updatePosition = () => {
  if (!affixRef.value || !wrapperRef.value) return
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  const elementOffset = affixRef.value.getBoundingClientRect()
  
  if (props.offsetTop !== undefined) {
    const fixedTop = elementOffset.top
    if (fixedTop <= props.offsetTop) {
      if (!fixed.value) {
        rect.value = affixRef.value.getBoundingClientRect()
        fixed.value = true
        emit('change', fixed.value)
      }
    } else if (fixed.value) {
      fixed.value = false
      emit('change', fixed.value)
    }
  } else if (props.offsetBottom !== undefined) {
    const clientHeight = document.documentElement.clientHeight
    const fixedBottom = clientHeight - elementOffset.bottom
    if (fixedBottom <= props.offsetBottom) {
      if (!fixed.value) {
        rect.value = affixRef.value.getBoundingClientRect()
        fixed.value = true
        emit('change', fixed.value)
      }
    } else if (fixed.value) {
      fixed.value = false
      emit('change', fixed.value)
    }
  }
}

// 处理滚动事件
const handleScroll = () => {
  requestAnimationFrame(updatePosition)
}

// 初始化
const init = () => {
  target.value = getTarget()
  if (!target.value) return
  
  document.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  
  nextTick(() => {
    updatePosition()
  })
}

// 清理
const cleanup = () => {
  document.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  cleanup()
})

defineExpose({
  update: updatePosition,
  updatePosition
})
</script>

<style lang="scss">
.st-affix {
  position: relative;
  
  &__wrapper {
    width: fit-content;
    
    &[style*="position: fixed"] {
      width: auto;
    }
  }
  
  &__placeholder {
    display: none;
    
    &--active {
      display: block;
    }
  }
}
</style> 