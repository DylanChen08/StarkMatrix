# Pager 分页

<DemoPager />

## 代码示例

```vue
<template>
  <stark-pager v-model:current-page="page" :total="100" :page-size="10" />
</template>
<script setup>
import { ref } from 'vue'
const page = ref(1)
</script>
``` 