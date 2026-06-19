import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'

const successMock = vi.fn()
vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    success: successMock,
    info: vi.fn(),
    error: vi.fn()
  })
}))

vi.mock('vue-router', () => ({
  useRoute: () => ({
    params: { id: '1' }
  })
}))

import ProductView from '../../views/ProductView.vue'
import { useCartStore } from '@/stores/cart'

describe('ProductView.vue', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    description: 'A great product',
    price: 19.99,
    stock: 5,
    images: ['test.jpg'],
    variants: null
  }

  function mountWithState(productOverride = {}) {
    return mount(ProductView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                products: [{ ...mockProduct, ...productOverride }],
                isLoading: false
              }
            }
          })
        ],
        stubs: {
          ProductViewLoadingSkeleton: true
        }
      }
    })
  }

  test('shows loading skeleton when loading', () => {
    const wrapper = mount(ProductView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: { isLoading: true }
            }
          })
        ],
        stubs: {
          ProductViewLoadingSkeleton: true
        }
      }
    })

    expect(wrapper.findComponent({ name: 'ProductViewLoadingSkeleton' }).exists()).toBe(true)
  })

  test('shows not found when product does not exist', () => {
    const wrapper = mount(ProductView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: { products: [] }
            }
          })
        ]
      }
    })

    expect(wrapper.text()).toContain('Product not found')
  })

  test('renders product details', () => {
    const wrapper = mountWithState()

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('A great product')
    expect(wrapper.text()).toContain('19.99')
  })

  test('disables add button when stock is 0', () => {
    const wrapper = mountWithState({ stock: 0 })

    const btn = wrapper.find('.add-btn')
    expect(btn.attributes('disabled')).toBeDefined()
    expect(btn.text()).toBe('Out of stock')
  })

  test('calls addToCart and toast.success', async () => {
    const wrapper = mountWithState()
    const cartStore = useCartStore()

    const btn = wrapper.find('.add-btn')
    await btn.trigger('click')

    expect(cartStore.addToCart).toHaveBeenCalledWith('1', 1)
    expect(successMock).toHaveBeenCalledWith('Product added to basket!')
  })

  test('requires color selection when color variants exist', async () => {
    const wrapper = mountWithState({
      variants: { color: ['Red', 'Blue'] }
    })

    const btn = wrapper.find('.add-btn')
    expect(btn.attributes('disabled')).toBeDefined()

    await wrapper.find('.options button').trigger('click')

    expect(wrapper.find('.add-btn').attributes('disabled')).toBeUndefined()
  })

  test('requires size selection when size variants exist', async () => {
    const wrapper = mountWithState({
      variants: { size: ['S', 'M'] }
    })

    const btn = wrapper.find('.add-btn')
    expect(btn.attributes('disabled')).toBeDefined()

    await wrapper.find('.options button').trigger('click')

    expect(wrapper.find('.add-btn').attributes('disabled')).toBeUndefined()
  })

  test('requires both color and size when both exist', async () => {
    const wrapper = mountWithState({
      variants: { color: ['Red'], size: ['M'] }
    })

    const btn = wrapper.find('.add-btn')
    expect(btn.attributes('disabled')).toBeDefined()

    await wrapper.findAll('.options button')[0].trigger('click')
    expect(wrapper.find('.add-btn').attributes('disabled')).toBeDefined()

    await wrapper.findAll('.options button')[1].trigger('click')
    expect(wrapper.find('.add-btn').attributes('disabled')).toBeUndefined()
  })
})
