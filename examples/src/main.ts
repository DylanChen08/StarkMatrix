import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts';

// 单独引入各个组件
// import starkButton from '@starkui-plus/components/button'
// import starkCard from '@starkui-plus/components/card'

// 引入所有的组件
import starkui from '@starkui-plus/components'

// 引入组件的样式代码
import '@starkui-plus/theme-chalk/src/index.scss'

const app = createApp(App)

// 挂载组件
// app.use(starkButton)
// app.use(starkCard)
app.use(starkui)

app.use(router)

app.mount('#app')

