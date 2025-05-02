import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'


describe('Button.vue', () => {
  it('渲染默认按钮', () => {
    const wrapper = mount(Button, {
      slots: { default: '按钮' }
    })
    expect(wrapper.text()).toBe('按钮')
    expect(wrapper.classes()).toContain('st-button--default')
    expect(wrapper.classes()).toContain('st-button--default')
  })

  it('支持不同类型', () => {
    const types = ['primary', 'success', 'warning', 'danger'] as const
    types.forEach(type => {
      const wrapper = mount(Button, {
        props: { type },
        slots: { default: type }
      })
      expect(wrapper.classes()).toContain(`st-button--${type}`)
    })
  })

  it('支持不同尺寸', () => {
    const sizes = ['small', 'large'] as const
    sizes.forEach(size => {
      const wrapper = mount(Button, {
        props: { size },
        slots: { default: size }
      })
      expect(wrapper.classes()).toContain(`st-button--${size}`)
    })
  })

  it('禁用状态', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用' }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('点击事件', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      slots: { default: '点击' },
      attrs: { onClick }
    })
    await wrapper.trigger('click')
    expect(onClick).toHaveBeenCalled()
  })

  it('禁用时不触发点击', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Button, {
      props: { disabled: true },
      slots: { default: '禁用' },
      attrs: { onClick }
    })
    await wrapper.trigger('click')
    expect(onClick).not.toHaveBeenCalled()
  })
}) 