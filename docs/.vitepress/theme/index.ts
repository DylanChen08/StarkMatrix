import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Demo from './components/Demo.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import StButton from '@/packages/components/button/Button.vue'
import StInput from '@/packages/components/input/Input.vue'
import StTimePicker from '@/packages/components/time-picker/TimePicker.vue'
import clickOutside from '@/packages/directives/click-outside'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
    app.component('ThemeToggle', ThemeToggle)
    app.component('st-button', StButton)
    app.component('st-input', StInput)
    app.component('st-time-picker', StTimePicker)
    app.directive('click-outside', clickOutside)
  }
} as Theme 