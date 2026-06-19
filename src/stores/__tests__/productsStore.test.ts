import { setActivePinia, createPinia } from 'pinia'
import { useProductsStore } from '../products'

describe('productsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('initial state is correct', () => {
    const store = useProductsStore()

    expect(store.products).toEqual([])
    expect(store.categories).toEqual([])
    expect(store.isLoading).toBe(false)
    expect(store.error).toBe(null)
    expect(store.searchQuery).toBe('')
    expect(store.selectedCategory).toBe('all')
    expect(store.sortBy).toBe('none')
    expect(store.currentPage).toBe(1)
    expect(store.itemsPerPage).toBe(8)
  })

  test('setSearch updates searchQuery', () => {
    const store = useProductsStore()
    store.setSearch('phone')
    expect(store.searchQuery).toBe('phone')
  })

  test('setCategory updates selectedCategory and resets page', () => {
    const store = useProductsStore()
    store.currentPage = 3
    store.setCategory('electronics')

    expect(store.selectedCategory).toBe('electronics')
    expect(store.currentPage).toBe(1)
  })

  test('updateStock decreases stock but never below 0', () => {
    const store = useProductsStore()
    store.products = [{ id: '1', title: 'Test', price: 10, stock: 2, categoryId: 'a', rating: 4, images: [] }]

    store.updateStock('1', -1)
    expect(store.products[0].stock).toBe(1)

    store.updateStock('1', -5)
    expect(store.products[0].stock).toBe(0)
  })

  test('getById returns correct product', () => {
    const store = useProductsStore()
    store.products = [
      { id: '1', title: 'A', price: 10, stock: 5, categoryId: 'a', rating: 4, images: [] },
      { id: '2', title: 'B', price: 20, stock: 3, categoryId: 'b', rating: 5, images: [] }
    ]

    expect(store.getById('2')?.title).toBe('B')
  })
})
