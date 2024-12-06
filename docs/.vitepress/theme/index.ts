import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Demo from './components/Demo.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import MyButton from '../../../packages/components/button/Button.vue'
import MyInput from '../../../packages/components/input/Input.vue'
import MyTimePicker from '../../../packages/components/time-picker/TimePicker.vue'
import clickOutside from '../../../packages/directives/click-outside'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Demo', Demo)
    app.component('ThemeToggle', ThemeToggle)
    app.component('MyButton', MyButton)
    app.component('MyInput', MyInput)
    app.component('MyTimePicker', MyTimePicker)
    app.directive('click-outside', clickOutside)
  }
} as Theme 