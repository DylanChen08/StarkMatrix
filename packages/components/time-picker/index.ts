import type { App } from 'vue'
import TimePicker from './TimePicker.vue'
import './style.scss'

TimePicker.install = function(app: App) {
  app.component('st-time-picker', TimePicker)
}

export { TimePicker }
export default TimePicker 