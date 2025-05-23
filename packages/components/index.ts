import Button from "./button/src/button.vue";
import Card from "./card/src/card.vue";
import Dialog from "./dialog/src/dialog.vue";
import Pager from "./pager/src/pager.vue";

import type { App, Plugin } from "vue";

// 之前是每个组件有一个入口文件，每个入口文件实际上所做的事情就是给这个组件添加一个 install 方法
// 之后在其他项目中就可以单独的引入这个组件：
// import starkButton from '@starkui-plus/components/button'
// import starkCard from '@starkui-plus/components/card'

// 现在整体项目的入口文件，要做的事情很简单：统一给所有组件添加上 install
// 之后在其他项目中使用的时候，就可以一次性导入所有的组件

const components = [Button, Card, Dialog, Pager];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};

const starkui: Plugin = {
  install,
};

export default starkui;

