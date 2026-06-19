import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import SortOptions from '../features/SortOptions.vue'
import { useProductsStore } from '@/stores/products'
import { SORT_BY_OPTIONS } from '@/constants'

describe('SortOptions.vue', () => {
  function mountWithStore(stateOverride = {}) {
    return mount(SortOptions, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                sortBy: 'none',
                ...stateOverride
              }
            }
          })
        ]
      }
    })
  }

  test('renders select with correct options', () => {
    const wrapper = mountWithStore()

    const options = wrapper.findAll('option')
    expect(options.length).toBe(SORT_BY_OPTIONS.length)

    SORT_BY_OPTIONS.forEach((opt, i) => {
      expect(options[i].text()).toBe(opt.label)
      expect(options[i].attributes('value')).toBe(opt.value)
    })
  })

  test('updates store.sortBy when selecting option', async () => {
    const wrapper = mountWithStore()
    const store = useProductsStore()

    const select = wrapper.find('select')
    await select.setValue('price-desc')

    expect(store.sortBy).toBe('price-desc')
  })
})
