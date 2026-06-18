import { defineStore } from 'pinia'
import type { CartItem, CartLine } from '@/models/types.ts'
import { useProductsStore } from './products'

interface CartState {
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    items: []
  }),

  getters: {
    lines: (state): CartLine[] => {
      const productsStore = useProductsStore()

      return state.items
        .map(item => {
          const product = productsStore.getById(item.productId)
          if (!product) return null
          return { product, quantity: item.quantity }
        })
        .filter((line): line is CartLine => line !== null)
    },

    totalItems(): number {
      return this.items.reduce((sum, item) => sum + item.quantity, 0)
    },

    totalPrice(): number {
      return this.lines.reduce(
        (sum, line) => sum + line.product.price * line.quantity,
        0
      )
    }
  },

  actions: {
    addToCart(productId: string, quantity = 1) {
      const productsStore = useProductsStore()

      const existing = this.items.find(i => i.productId === productId)

      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ productId, quantity })
      }

      productsStore.updateStock(productId, -quantity)
    },

    setQuantity(productId: string, quantity: number) {
      const productsStore = useProductsStore()
      const item = this.items.find(i => i.productId === productId)
      if (!item) return

      const diff = quantity - item.quantity
      item.quantity = quantity

      productsStore.updateStock(productId, -diff)

      if (quantity <= 0) {
        this.removeFromCart(productId)
      }
    },

    removeFromCart(productId: string) {
      const productsStore = useProductsStore()
      const item = this.items.find(i => i.productId === productId)

      if (item) {
        productsStore.updateStock(productId, item.quantity)
      }

      this.items = this.items.filter(i => i.productId !== productId)
    }
  }
})
