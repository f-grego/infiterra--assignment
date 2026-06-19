import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '../cart'
import { useProductsStore } from '../products'

describe('cartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('addToCart adds new item and reduces stock', () => {
    const products = useProductsStore()
    const cart = useCartStore()

    products.products = [
      { id: '1', title: 'Test', price: 10, stock: 5, categoryId: 'a', rating: 4, images: [] }
    ]

    cart.addToCart('1', 2)

    expect(cart.items.length).toBe(1)
    expect(cart.items[0].quantity).toBe(2)
    expect(products.products[0].stock).toBe(3)
  })

  test('setQuantity updates quantity and syncs stock', () => {
    const products = useProductsStore()
    const cart = useCartStore()

    products.products = [
      { id: '1', title: 'Test', price: 10, stock: 5, categoryId: 'a', rating: 4, images: [] }
    ]

    cart.addToCart('1', 1)
    cart.setQuantity('1', 3)

    expect(cart.items[0].quantity).toBe(3)
    expect(products.products[0].stock).toBe(2)
  })

  test('removeFromCart restores stock', () => {
    const products = useProductsStore()
    const cart = useCartStore()

    products.products = [
      { id: '1', title: 'Test', price: 10, stock: 5, categoryId: 'a', rating: 4, images: [] }
    ]

    cart.addToCart('1', 2)
    cart.removeFromCart('1')

    expect(cart.items.length).toBe(0)
    expect(products.products[0].stock).toBe(5)
  })
})
