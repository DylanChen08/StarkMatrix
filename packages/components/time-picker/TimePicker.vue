<template>
    <div class="st-time-picker" ref="timePickerRef" tabindex="0" @focus="handleFocus"
        @keydown.up.prevent="handleKeyUp" 
        @keydown.down.prevent="handleKeyDown"
        @keydown.left="switchColumn('prev')" 
        @keydown.right="switchColumn('next')" 
        @keydown.enter="confirm"
        @keydown.esc="close" 
        @keydown.tab="handleTab">
        <div class="st-time-picker__input" ref="inputRef">
            <st-input
                v-model="displayValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :clearable="clearable"
                :class="{ 'is-invalid': isInvalid }"
                @clear="handleClear"
                readonly
            />
        </div>
        <div class="st-time-picker__popover" v-show="visible" v-click-outside="handleClickOutside" tabindex="-1">
            <div class="st-time-picker__content">
                <div class="st-time-picker__spinner">
                    <!-- 小时选择 -->
                    <div class="st-time-picker__column">
                        <div class="st-time-picker__column-header">
                            <button class="st-time-picker__arrow" @click="stepHour('up')">▲</button>
                            <span>时</span>
                            <button class="st-time-picker__arrow" @click="stepHour('down')">▼</button>
                        </div>
                        <ul class="st-time-picker__list" ref="hourListRef">
                            <li v-for="hour in 24" :key="`hour-${hour - 1}`" :class="[
                                'st-time-picker__item',
                                {
                                    'is-active': selectedHour === hour - 1,
                                    'is-disabled': isDisabledHour(hour - 1)
                                }
                            ]" @click="selectHour(hour - 1)">
                                {{ padNumber(hour - 1) }}
                            </li>
                        </ul>
                    </div>
                    <!-- 分钟选择 -->
                    <div class="st-time-picker__column">
                        <div class="st-time-picker__column-header">
                            <button class="st-time-picker__arrow" @click="stepMinute('up')">▲</button>
                            <span>分</span>
                            <button class="st-time-picker__arrow" @click="stepMinute('down')">▼</button>
                        </div>
                        <ul class="st-time-picker__list" ref="minuteListRef">
                            <li v-for="minute in getMinuteList" :key="`minute-${minute}`" :class="[
                                'st-time-picker__item',
                                {
                                    'is-active': selectedMinute === minute,
                                    'is-disabled': isDisabledMinute(minute)
                                }
                            ]" @click="selectMinute(minute)">
                                {{ padNumber(minute) }}
                            </li>
                        </ul>
                    </div>
                    <!-- 秒钟选择 -->
                    <div class="st-time-picker__column">
                        <div class="st-time-picker__column-header">
                            <button class="st-time-picker__arrow" @click="stepSecond('up')">▲</button>
                            <span>秒</span>
                            <button class="st-time-picker__arrow" @click="stepSecond('down')">▼</button>
                        </div>
                        <ul class="st-time-picker__list" ref="secondListRef">
                            <li v-for="second in getSecondList" :key="`second-${second}`" :class="[
                                'st-time-picker__item',
                                {
                                    'is-active': selectedSecond === second,
                                    'is-disabled': isDisabledSecond(second)
                                }
                            ]" @click="selectSecond(second)">
                                {{ padNumber(second) }}
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="st-time-picker__footer">
                    <div class="st-time-picker__shortcuts">
                        <button v-for="shortcut in shortcuts" :key="shortcut.text" class="st-time-picker__shortcut"
                            @click="handleShortcut(shortcut)">
                            {{ shortcut.text }}
                        </button>
                    </div>
                    <div class="st-time-picker__buttons">
                        <st-button size="small" @click="close">取消</st-button>
                        <st-button type="primary" size="small" @click="confirm">确定</st-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import StInput from '../input/Input.vue'
import StButton from '../button/Button.vue'
import clickOutside from '../../directives/click-outside'

// 定义组件名称
defineOptions({
    name: 'StTimePicker'
})

// 类型定义
interface TimeShortcut {
    text: string
    value: () => string
}

// Props 定义
const props = withDefaults(defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    format?: string
    minTime?: string
    maxTime?: string
    minuteStep?: number
    secondStep?: number
    disabledHours?: number[]
    disabledMinutes?: (hour: number) => number[]
    disabledSeconds?: (hour: number, minute: number) => number[]
    shortcuts?: TimeShortcut[]
}>(), {
    modelValue: '',
    placeholder: '请选择时间',
    disabled: false,
    clearable: true,
    format: 'HH:mm:ss',
    minuteStep: 1,
    secondStep: 1,
    shortcuts: () => [{
        text: '现在',
        value: () => {
            const now = new Date()
            const padNumber = (num: number): string => {
                return num.toString().padStart(2, '0')
            }
            return `${padNumber(now.getHours())}:${padNumber(now.getMinutes())}:${padNumber(now.getSeconds())}`
        }
    }]
})

// Emits 定义
const emit = defineEmits<{
    'update:modelValue': [value: string]
    change: [value: string]
    clear: []
}>()

const visible = ref(false)
const selectedHour = ref(0)
const selectedMinute = ref(0)
const selectedSecond = ref(0)
const hourListRef = ref<HTMLElement>()
const minuteListRef = ref<HTMLElement>()
const secondListRef = ref<HTMLElement>()

// 添加组件引用
const timePickerRef = ref<HTMLElement>()
const inputRef = ref<HTMLElement>()

// 补零函数
const padNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
}

// 格式化显示值
const displayValue = computed(() => {
    if (!props.modelValue) return ''
    return formatTime(props.modelValue)
})

// 格式化时间
const formatTime = (time: string) => {
    const [hour, minute, second] = time.split(':').map(Number)
    const format = props.format
        .replace('HH', padNumber(hour))
        .replace('mm', padNumber(minute))
        .replace('ss', padNumber(second))
    return format
}

// 切换弹出层显示
const togglePopover = () => {
    if (props.disabled) return
    visible.value = !visible.value
    
    if (visible.value) {
        // 如果有值，使用现有值
        if (props.modelValue) {
            debugger
            const [hour, minute, second] = props.modelValue.split(':').map(Number)
            selectedHour.value = hour
            selectedMinute.value = minute
            selectedSecond.value = second
        } else {
            // 如果没有值，使用当前时间
            const now = new Date()
            selectedHour.value = now.getHours()
            selectedMinute.value = now.getMinutes()
            selectedSecond.value = now.getSeconds()
        }
        
        // 滚动到选中位置
        nextTick(() => {
            scrollToSelected()
        })
    }
}

// 滚动到选中项
const scrollToSelected = () => {
    const scrollToItem = (el: HTMLElement, index: number) => {
        const itemHeight = 28 // 每项高度
        el.scrollTop = index * itemHeight
    }

    if (hourListRef.value) {
        scrollToItem(hourListRef.value, selectedHour.value)
    }
    if (minuteListRef.value) {
        scrollToItem(minuteListRef.value, selectedMinute.value)
    }
    if (secondListRef.value) {
        scrollToItem(secondListRef.value, selectedSecond.value)
    }
}

// 键盘操作
const handleKeyUp = (e: KeyboardEvent) => {
    console.log('key up pressed')
    e.preventDefault()
    switch (currentColumn.value) {
        case 'hour':
            stepHour('up')
            break
        case 'minute':
            stepMinute('up')
            break
        case 'second':
            stepSecond('up')
            break
    }
}

const handleKeyDown = (e: KeyboardEvent) => {
    console.log('key down pressed')
    e.preventDefault()
    switch (currentColumn.value) {
        case 'hour':
            stepHour('down')
            break
        case 'minute':
            stepMinute('down')
            break
        case 'second':
            stepSecond('down')
            break
    }
}

// 关闭弹出层
const close = () => {
    visible.value = false
}

// 选择小时
const selectHour = (hour: number) => {
    selectedHour.value = hour
}

// 选择分钟
const selectMinute = (minute: number) => {
    selectedMinute.value = minute
}

// 选择秒钟
const selectSecond = (second: number) => {
    selectedSecond.value = second
}

// 检查时间是否在范围内
const isTimeInRange = (value: string) => {
    if (props.minTime && value < props.minTime) {
        console.warn(`Selected time ${value} is before min time ${props.minTime}`)
        return false
    }
    if (props.maxTime && value > props.maxTime) {
        console.warn(`Selected time ${value} is after max time ${props.maxTime}`)
        return false
    }
    return true
}

// 确认选择
const confirm = () => {
    const value = `${padNumber(selectedHour.value)}:${padNumber(selectedMinute.value)}:${padNumber(selectedSecond.value)}`
    
    // 使用辅助函数检查时间范围
    if (!isTimeInRange(value)) {
        // 添加视觉反馈
        const input = inputRef.value?.querySelector('.st-input__inner') as HTMLElement
        input?.classList.add('shake')
        setTimeout(() => input?.classList.remove('shake'), 500)
        return
    }
    
    emit('update:modelValue', value)
    emit('change', value)
    close()
}

// 清空选择
const handleClear = () => {
    emit('update:modelValue', '')
    emit('clear')
}

// 获取分钟列表（考虑步进）
const getMinuteList = computed(() => {
    const list = []
    for (let i = 0; i < 60; i += props.minuteStep) {
        list.push(i)
    }
    return list
})

// 获取秒钟列表（考虑步进）
const getSecondList = computed(() => {
    const list = []
    for (let i = 0; i < 60; i += props.secondStep) {
        list.push(i)
    }
    return list
})

// 判断小时是否禁用
const isDisabledHour = (hour: number) => {
    if (props.disabledHours?.includes(hour)) return true
    if (props.minTime) {
        const [minHour] = props.minTime.split(':').map(Number)
        if (hour < minHour) return true
    }
    if (props.maxTime) {
        const [maxHour] = props.maxTime.split(':').map(Number)
        if (hour > maxHour) return true
    }
    return false
}

// 判断分钟是否禁用
const isDisabledMinute = (minute: number) => {
    if (props.disabledMinutes?.(selectedHour.value)?.includes(minute)) return true
    if (props.minTime) {
        const [minHour, minMinute] = props.minTime.split(':').map(Number)
        if (selectedHour.value === minHour && minute < minMinute) return true
    }
    if (props.maxTime) {
        const [maxHour, maxMinute] = props.maxTime.split(':').map(Number)
        if (selectedHour.value === maxHour && minute > maxMinute) return true
    }
    return false
}

// 判断秒钟是否禁用
const isDisabledSecond = (second: number) => {
    if (props.disabledSeconds?.(selectedHour.value, selectedMinute.value)?.includes(second)) return true
    if (props.minTime) {
        const [minHour, minMinute, minSecond] = props.minTime.split(':').map(Number)
        if (selectedHour.value === minHour && selectedMinute.value === minMinute && second < minSecond) return true
    }
    if (props.maxTime) {
        const [maxHour, maxMinute, maxSecond] = props.maxTime.split(':').map(Number)
        if (selectedHour.value === maxHour && selectedMinute.value === maxMinute && second > maxSecond) return true
    }
    return false
}

// 步进控制
const stepHour = (direction: 'up' | 'down') => {
    const step = direction === 'up' ? 1 : -1
    let newHour = (selectedHour.value + step + 24) % 24
    while (isDisabledHour(newHour)) {
        newHour = (newHour + step + 24) % 24
    }
    selectHour(newHour)
}

const stepMinute = (direction: 'up' | 'down') => {
    const step = direction === 'up' ? props.minuteStep : -props.minuteStep
    let newMinute = (selectedMinute.value + step + 60) % 60
    while (isDisabledMinute(newMinute)) {
        newMinute = (newMinute + step + 60) % 60
    }
    selectMinute(newMinute)
}

const stepSecond = (direction: 'up' | 'down') => {
    const step = direction === 'up' ? props.secondStep : -props.secondStep
    let newSecond = (selectedSecond.value + step + 60) % 60
    while (isDisabledSecond(newSecond)) {
        newSecond = (newSecond + step + 60) % 60
    }
    selectSecond(newSecond)
}

// 切换列
const currentColumn = ref<'hour' | 'minute' | 'second'>('hour')
const switchColumn = (direction: 'prev' | 'next') => {
    const columns = ['hour', 'minute', 'second']
    const currentIndex = columns.indexOf(currentColumn.value)
    const newIndex = direction === 'next'
        ? (currentIndex + 1) % 3
        : (currentIndex - 1 + 3) % 3
    currentColumn.value = columns[newIndex] as 'hour' | 'minute' | 'second'
}

// Tab 键处理
const handleTab = (e: KeyboardEvent) => {
    if (e.shiftKey) {
        switchColumn('prev')
    } else {
        switchColumn('next')
    }
    e.preventDefault()
}

// 快捷选项处理
const handleShortcut = (shortcut: TimeShortcut) => {
    const value = shortcut.value()
    if (!isTimeInRange(value)) {
        return
    }
    emit('update:modelValue', value)
    emit('change', value)
    close()
}

// 添加焦点处理
const handleFocus = () => {
    console.log('time-picker focused')
}

// 修改点击外部处理逻辑
const handleClickOutside = (e: MouseEvent) => {
    // 检查点击事件是否来自当前组件的输入框
    const target = e.target as HTMLElement
    if (inputRef.value?.contains(target)) {
        return
    }
    close()
}

// 修改输入框点击处理
const handleInputClick = (e: MouseEvent) => {
    // 确保点击事件来自当前组件
    if (!timePickerRef.value?.contains(e.target as HTMLElement)) return
    if (props.disabled) return
    
    visible.value = true
    
    // 如果有值，使用现有值
    if (props.modelValue) {
        const [hour, minute, second] = props.modelValue.split(':').map(Number)
        selectedHour.value = hour
        selectedMinute.value = minute
        selectedSecond.value = second
    } else {
        // 如果没有值，使用当前时间
        const now = new Date()
        selectedHour.value = now.getHours()
        selectedMinute.value = now.getMinutes()
        selectedSecond.value = now.getSeconds()
    }
    
    // 滚动到选中位置
    nextTick(() => {
        scrollToSelected()
    })
}

// 监听点击事件
onMounted(() => {
    inputRef.value?.addEventListener('click', handleInputClick)
})

onUnmounted(() => {
    inputRef.value?.removeEventListener('click', handleInputClick)
})

// 添加无效状态计算属性
const isInvalid = computed(() => {
    if (!props.modelValue) return false
    return !isTimeInRange(props.modelValue)
})
</script>

<style lang="scss">
@import './style.scss';

// 添加无效状态和动画样式
.st-input.is-invalid {
    .st-input__inner {
        border-color: var(--st-danger-color, #f56c6c);
    }
}

@keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
}

.shake {
    animation: shake 0.3s ease-in-out;
}
</style>