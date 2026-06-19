import { defineStore } from 'pinia'
import type { Product, Category } from '@/models/types.ts'

interface ProductsState {
  products: Product[]
  categories: Category[]
  isLoading: boolean
  error: string | null
  searchQuery: string
  selectedCategory: string
  sortBy: 'none' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc'
  currentPage: number
  itemsPerPage: number
}

export const useProductsStore = defineStore('products', {
  state: (): ProductsState => ({
    products: [],
    categories: [],
    isLoading: false,
    error: null,

    searchQuery: '',
    selectedCategory: 'all',
    sortBy: 'none',

    currentPage: 1,
    itemsPerPage: 8
  }),

  getters: {
    getById: (state) => {
      return (id: string) => state.products.find(p => p.id === id)
    },

    productsByCategory: (state) => {
      return (categoryId: string) =>
        state.products.filter(p => p.categoryId === categoryId)
    },

    filteredProducts: (state) => {
      let result = [...state.products]

      if (state.selectedCategory !== 'all') {
        result = result.filter(
          p => p.categoryId === state.selectedCategory
        )
      }

      if (state.searchQuery.trim()) {
        const q = state.searchQuery.toLowerCase()
        result = result.filter(
          p =>
            p.title.toLowerCase().includes(q)
        )
      }

      switch (state.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'price-desc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating)
          break
        case 'name-asc':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'name-desc':
          result.sort((a, b) => b.title.localeCompare(a.title))
          break
      }

      return result
    },

    paginatedProducts(state): Product[] {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return this.filteredProducts.slice(start, end)
    },

    totalPages(state): number {
      return Math.ceil(this.filteredProducts.length / state.itemsPerPage)
    }
  },

  actions: {
    async fetchAllProducts() {
      try {
        this.isLoading = true
        this.error = null

        const response = await window.fetch(`${import.meta.env.VITE_API_URL}/products`)
        this.products = (await response.json()) as Product[]
      } catch (err) {
        this.error = 'Failed to load products'
      } finally {
        this.isLoading = false
      }
    },
    async fetchAllCategories() {
      try {
        this.isLoading = true
        this.error = null

        const response = await window.fetch(`${import.meta.env.VITE_API_URL}/categories`)
        this.categories = (await response.json()) as Category[]
      } catch (err) {
        this.error = 'Failed to load categories'
      } finally {
        this.isLoading = false
      }
    },

    setSearch(query: string) {
      this.searchQuery = query
    },

    setCategory(categoryId: string) {
      this.selectedCategory = categoryId
      this.currentPage = 1;
    },

    setPage(page: number) {
      this.currentPage = page
    },

    updateStock(productId: string, change: number) {
      const product = this.products.find(p => p.id === productId)
      if (!product) return

      product.stock = Math.max(0, product.stock + change)
    }
  }
})
