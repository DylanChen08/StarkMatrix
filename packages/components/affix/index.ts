import type { App } from 'vue'
import Affix from './Affix.vue'

Affix.install = function(app: App) {
  app.component('st-affix', Affix)
}

export { Affix }
export default Affix 