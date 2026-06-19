import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'

const successMock = vi.fn()

vi.mock('@/composables/useToast.ts', () => ({
  useToast: () => ({
    success: successMock,
    error: vi.fn(),
    info: vi.fn()
  })
}))

vi.mock('@/composables/useHighlight.ts', () => ({
  useHighlight: () => ({
    highlight: (v: string) => v
  })
}))

import ProductCard from '../ProductCard.vue'
import { useCartStore } from '@/stores/cart'

describe('ProductCard.vue (Products List)', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    description: 'A great product',
    price: 19.99,
    stock: 5,
    categoryId: 'a',
    rating: 4,
    images: ['test.jpg']
  }

  function mountWithState(stateOverride = {}) {
    return mount(ProductCard, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                products: [mockProduct],
                paginatedProducts: [mockProduct],
                categories: [],
                isLoading: false,
                error: null,
                searchQuery: '',
                selectedCategory: 'all',
                sortBy: 'none',
                currentPage: 1,
                itemsPerPage: 8,
                ...stateOverride
              }
            }
          })
        ],
        stubs: {
          RouterLink: { template: '<a><slot /></a>' }
        }
      }
    })
  }

  test('renders product list with one product', () => {
    const wrapper = mountWithState()

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('A great product')
    expect(wrapper.text()).toContain('19.99')
  })

  test('disables button when stock is 0', () => {
    const wrapper = mountWithState({
      products: [{ ...mockProduct, stock: 0 }],
      paginatedProducts: [{ ...mockProduct, stock: 0 }]
    })

    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.text()).toBe('Out of stock')
  })

  test('shows low stock badge', () => {
    const wrapper = mountWithState({
      products: [{ ...mockProduct, stock: 3 }],
      paginatedProducts: [{ ...mockProduct, stock: 3 }]
    })

    const badge = wrapper.find('.stock-badge')
    expect(badge.exists()).toBe(true)
    expect(badge.text()).toContain('Low stock')
  })

  test('calls addToCart and toast.success when clicking button', async () => {
    const wrapper = mountWithState()

    const cartStore = useCartStore()

    const button = wrapper.find('button')
    await button.trigger('click')

    expect(cartStore.addToCart).toHaveBeenCalledWith('1', 1)
    expect(successMock).toHaveBeenCalledWith('Added to basket!')
  })
})
