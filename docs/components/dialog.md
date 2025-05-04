# Dialog 对话框

<DemoDialog />

## 代码示例

```vue
<template>
  <stark-dialog v-model="visible" title="对话框标题">
    这里是对话框内容
  </stark-dialog>
  <stark-button @click="visible = true">打开对话框</stark-button>
</template>
<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>
``` 