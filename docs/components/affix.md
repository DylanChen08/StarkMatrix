# 固钉

将页面元素钉在可视范围。

## 基础用法

<demo title="基础用法">
  <template #demo>
    <st-affix :offset-top="100">
      <st-button type="primary">距离顶部 100px</st-button>
    </st-affix>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ `<template>
  <st-affix :offset-top="100">
    <st-button type="primary">距离顶部 100px</st-button>
  </st-affix>
</template>` }}</code></pre>
  </template>
</demo>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| offset-top | 距离窗口顶部达到指定偏移量后触发 | number | - |
| offset-bottom | 距离窗口底部达到指定偏移量后触发 | number | - |
| target | 设置需要监听其滚动事件的元素 | string \| HTMLElement | window |
| z-index | 设置 z-index | number | 100 |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| change | 固定状态改变时触发 | (fixed: boolean) | 