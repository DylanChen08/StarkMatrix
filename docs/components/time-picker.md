# 时间选择器

用于选择时间。

## 基础用法

<demo title="基础用法">
  <template #demo>
    <st-time-picker v-model="time" placeholder="请选择时间" />
    <div class="demo-value">当前值：{{ time }}</div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>

## 时间范围限制

<demo title="时间范围">
  <template #demo>
    <st-time-picker
      v-model="timeRange"
      placeholder="请选择时间"
      min-time="09:30:00"
      max-time="18:30:00"
    />
    <div class="demo-value">当前值：{{ timeRange }}</div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>

## 步进设置

<demo title="步进控制">
  <template #demo>
    <st-time-picker
      v-model="timeStep"
      placeholder="请选择时间"
      :minute-step="15"
      :second-step="30"
    />
    <div class="demo-value">当前值：{{ timeStep }}</div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>

## 禁用时间

<demo title="禁用特定时间">
  <template #demo>
    <st-time-picker
      v-model="timeDisabled"
      placeholder="请选择时间"
      :disabled-hours="[0, 1, 2, 3, 4, 5, 6, 20, 21, 22, 23]"
      :disabled-minutes="(hour) => hour === 7 ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] : []"
    />
    <div class="demo-value">当前值：{{ timeDisabled }}</div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>

## 快捷选项

<demo title="快捷选项">
  <template #demo>
    <st-time-picker
      v-model="timeShortcut"
      placeholder="请选择时间"
      :shortcuts="[
        { text: '现在', value: () => getCurrentTime() },
        { text: '中午', value: () => '12:00:00' },
        { text: '下班', value: () => '18:00:00' }
      ]"
    />
    <div class="demo-value">当前值：{{ timeShortcut }}</div>
  </template>

  <template #source>
    <pre><code class="language-vue">{{ sourceCode }}</code></pre>
  </template>
</demo>

## API

### Props

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| modelValue | 绑定值 | string | - |
| placeholder | 占位文本 | string | '请选择时间' |
| disabled | 是否禁用 | boolean | false |
| clearable | 是否可清空 | boolean | true |
| format | 时间格式 | string | 'HH:mm:ss' |
| minTime | 最小时间 | string | - |
| maxTime | 最大时间 | string | - |
| minuteStep | 分钟步进值 | number | 1 |
| secondStep | 秒钟步进值 | number | 1 |
| disabledHours | 禁用的小时选项 | number[] | - |
| disabledMinutes | 禁用的分钟选项 | (hour: number) => number[] | - |
| disabledSeconds | 禁用的秒钟选项 | (hour: number, minute: number) => number[] | - |
| shortcuts | 快捷选项 | { text: string, value: () => string }[] | - |

### Events

| 名称 | 说明 | 参数 |
| --- | --- | --- |
| update:modelValue | 值改变时触发 | (value: string) |
| change | 值改变时触发 | (value: string) |
| clear | 点击清空按钮时触发 | - |

### 快捷键

| 按键 | 说明 |
| --- | --- |
| ↑ | 增加当前选中列的值 |
| ↓ | 减少当前选中列的值 |
| → | 切换到下一列 |
| ← | 切换到上一列 |
| Tab | 切换到下一列 |
| Shift + Tab | 切换到上一列 |
| Enter | 确认选择 |
| Esc | 关闭选择器 |

<script setup>
import { ref } from 'vue'

const time = ref(new Date().toLocaleTimeString())
const timeRange = ref('')
const timeStep = ref('')
const timeDisabled = ref('')
const timeShortcut = ref('')

const getCurrentTime = () => {
  const now = new Date()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${hours}:${minutes}:${seconds}`
}
</script>

<style>
.demo-value {
  margin-top: 16px;
  color: var(--vp-c-text-2);
  font-size: 14px;
}
</style>
