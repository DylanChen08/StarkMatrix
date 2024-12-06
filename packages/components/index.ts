import type { App } from 'vue'
import Button from './button/Button.vue'
import Input from './input/Input.vue'
import TimePicker from './time-picker'

export { Button, Input, TimePicker }

export default {
  install(app: App) {
    app.component('MyButton', Button)
    app.component('MyInput', Input)
    app.component('MyTimePicker', TimePicker)
  }
} 