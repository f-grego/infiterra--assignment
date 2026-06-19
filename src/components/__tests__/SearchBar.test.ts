import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import SearchBar from '../search/SearchBar.vue'
import { useProductsStore } from '@/stores/products'

describe('SearchBar.vue', () => {
  function mountWithStore() {
    return mount(SearchBar, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                searchQuery: ''
              }
            }
          })
        ]
      }
    })
  }

  test('renders input with correct placeholder', () => {
    const wrapper = mountWithStore()
    const input = wrapper.find('input')

    expect(input.exists()).toBe(true)
    expect(input.attributes('placeholder')).toBe('Search products...')
  })

  test('calls productsStore.setSearch when typing', async () => {
    const wrapper = mountWithStore()
    const productsStore = useProductsStore()

    const input = wrapper.find('input')
    await input.setValue('shoes')

    expect(productsStore.setSearch).toHaveBeenCalledWith('shoes')
  })
})
