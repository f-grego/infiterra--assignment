import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import ToastContainer from '../features/ToastContainer.vue'

describe('ToastContainer.vue', () => {
  function mountWithToasts(toasts = []) {
    return mount(ToastContainer, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              toast: {
                toasts
              }
            }
          })
        ]
      }
    })
  }

  test('renders no toasts when store is empty', () => {
    const wrapper = mountWithToasts([])
    expect(wrapper.findAll('.toast').length).toBe(0)
  })

  test('renders all toasts from store', () => {
    const toasts = [
      { id: 1, message: 'Hello', type: 'success' },
      { id: 2, message: 'Oops', type: 'error' }
    ]

    const wrapper = mountWithToasts(toasts)

    const toastEls = wrapper.findAll('.toast')
    expect(toastEls.length).toBe(2)

    expect(toastEls[0].text()).toBe('Hello')
    expect(toastEls[1].text()).toBe('Oops')
  })

  test('applies correct CSS class based on toast type', () => {
    const toasts = [
      { id: 1, message: 'Saved!', type: 'success' },
      { id: 2, message: 'Warning!', type: 'info' },
      { id: 3, message: 'Error!', type: 'error' }
    ]

    const wrapper = mountWithToasts(toasts)
    const toastEls = wrapper.findAll('.toast')

    expect(toastEls[0].classes()).toContain('success')
    expect(toastEls[1].classes()).toContain('info')
    expect(toastEls[2].classes()).toContain('error')
  })
})
