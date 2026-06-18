import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import CategoryFilter from '../features/CategoryFilter.vue'

describe('CategoryFilter', () => {
  it('renders properly', () => {
    const wrapper = mount(CategoryFilter, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
