import type { App } from 'vue'
import Button from './button/Button.vue'
import Input from './input/Input.vue'
import TimePicker from './time-picker/TimePicker.vue'
import Affix from './affix/Affix.vue'

export { Button, Input, TimePicker, Affix }

export default {
  install(app: App) {
    app.component('st-button', Button)
    app.component('st-input', Input)
    app.component('st-time-picker', TimePicker)
    app.component('st-affix', Affix)
  }
} 