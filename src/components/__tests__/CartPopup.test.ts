import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'

const infoMock = vi.fn()

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    info: infoMock,
    success: vi.fn(),
    error: vi.fn()
  })
}))

import CartPopup from '../CartPopup.vue'
import { useCartStore } from '@/stores/cart'

describe('CartPopup.vue', () => {
  const mockProduct = {
    id: '1',
    title: 'Test Product',
    price: 10,
    stock: 5,
    images: ['test.jpg']
  }

  function mountWithState(items = [{ productId: '1', quantity: 2 }]) {
    return mount(CartPopup, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              cart: {
                items
              },
              products: {
                products: [mockProduct]
              }
            }
          })
        ],
        stubs: {
          IconSvg: true,
          StockLeftIndicator: true
        }
      }
    })
  }

  test('renders cart line with correct data', () => {
    const wrapper = mountWithState()

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('10.00')
    expect(wrapper.text()).toContain('2')
  })

  test('decrease button reduces quantity', async () => {
    const wrapper = mountWithState()
    const cartStore = useCartStore()

    const minusBtn = wrapper.find('.qty button:first-child')
    expect(minusBtn.exists()).toBe(true)

    await minusBtn.trigger('click')

    expect(cartStore.setQuantity).toHaveBeenCalledWith('1', 1)
  })

  test('decrease removes item when quantity becomes 1', async () => {
    const wrapper = mountWithState([{ productId: '1', quantity: 1 }])
    const cartStore = useCartStore()

    const minusBtn = wrapper.find('.qty button:first-child')
    expect(minusBtn.exists()).toBe(true)

    await minusBtn.trigger('click')

    expect(cartStore.removeFromCart).toHaveBeenCalledWith('1')
    expect(infoMock).toHaveBeenCalledWith('Item removed from cart')
  })

  test('delete button removes item and shows toast', async () => {
    const wrapper = mountWithState()
    const cartStore = useCartStore()

    const deleteBtn = wrapper.find('.delete-btn')
    expect(deleteBtn.exists()).toBe(true)

    await deleteBtn.trigger('click')

    expect(cartStore.removeFromCart).toHaveBeenCalledWith('1')
    expect(infoMock).toHaveBeenCalledWith('Item removed from cart')
  })
})
