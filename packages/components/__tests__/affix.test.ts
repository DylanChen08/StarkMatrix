import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Affix from '../affix/Affix.vue'

describe('Affix', () => {
  it('renders properly', () => {
    const wrapper = mount(Affix)
    expect(wrapper.exists()).toBe(true)
  })

  it('applies offset-top properly', () => {
    const wrapper = mount(Affix, {
      props: {
        offsetTop: 100
      }
    })
    expect(wrapper.props('offsetTop')).toBe(100)
  })
}) 