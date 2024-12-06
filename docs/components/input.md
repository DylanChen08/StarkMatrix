# 输入框组件

用于输入文本内容。

## 基础用法

<demo title="基础输入框">
  <template #demo>
    <div class="demo-inputs">
      <my-input v-model="value" placeholder="请输入内容" />
      <div class="demo-value">当前值：{{ value }}</div>
    </div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>
