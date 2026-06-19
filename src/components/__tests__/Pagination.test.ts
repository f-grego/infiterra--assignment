import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import Pagination from '../features/Pagination.vue'
import { useProductsStore } from '@/stores/products'

describe('Pagination.vue', () => {
  function generateProducts(count: number) {
    return Array.from({ length: count }, (_, i) => ({ id: i + 1 }))
  }

  function mountWithState(stateOverride = {}) {
    return mount(Pagination, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                products: generateProducts(40), // enough for 5 pages
                currentPage: 1,
                itemsPerPage: 8,                // ⭐ MUST EXIST
                categories: [],
                searchQuery: '',
                selectedCategory: 'all',
                sortBy: 'none',
                isLoading: false,
                error: null,
                ...stateOverride
              }
            }
          })
        ],
        stubs: {
          IconSvg: true
        }
      }
    })
  }

  test('does not render pagination when totalPages = 1', () => {
    const wrapper = mountWithState({
      products: generateProducts(5),
      itemsPerPage: 8
    })
    expect(wrapper.find('.pagination').exists()).toBe(false)
  })

  test('renders pagination when totalPages > 1', () => {
    const wrapper = mountWithState()
    expect(wrapper.find('.pagination').exists()).toBe(true)
  })

  test('previous button disabled on first page', () => {
    const wrapper = mountWithState({ currentPage: 1 })
    const prev = wrapper.find('.arrow-btn')
    expect(prev.attributes('disabled')).toBeDefined()
  })

  test('next button disabled on last page', () => {
    const wrapper = mountWithState({ currentPage: 5, totalPages: 5 })
    const next = wrapper.findAll('.arrow-btn')[1]
    expect(next.attributes('disabled')).toBeDefined()
  })


  test('clicking next calls setPage(currentPage + 1)', async () => {
    const wrapper = mountWithState({ currentPage: 2 })
    const store = useProductsStore()

    const next = wrapper.findAll('.arrow-btn')[1]
    await next.trigger('click')

    expect(store.setPage).toHaveBeenCalledWith(3)
  })

  test('clicking previous calls setPage(currentPage - 1)', async () => {
    const wrapper = mountWithState({ currentPage: 3 })
    const store = useProductsStore()

    const prev = wrapper.findAll('.arrow-btn')[0]
    await prev.trigger('click')

    expect(store.setPage).toHaveBeenCalledWith(2)
  })

  test('shows dots when currentPage > 3', () => {
    const wrapper = mountWithState({ currentPage: 4 })
    expect(wrapper.find('.dots').exists()).toBe(true)
  })

})
