import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import { vi } from 'vitest'
import CategoryFilter from '../features/CategoryFilter.vue'
import { useProductsStore } from '@/stores/products'

describe('CategoryFilter.vue', () => {
  const mockCategories = [
    { id: 'c1', name: 'Shoes' },
    { id: 'c2', name: 'Hats' }
  ]

  function mountWithState(stateOverride = {}) {
    return mount(CategoryFilter, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              products: {
                categories: mockCategories,
                selectedCategory: 'all',
                ...stateOverride
              }
            }
          })
        ]
      }
    })
  }

  test('renders "All" button and category buttons', () => {
    const wrapper = mountWithState()

    expect(wrapper.text()).toContain('All')
    expect(wrapper.text()).toContain('Shoes')
    expect(wrapper.text()).toContain('Hats')
  })

  test('highlights the active category', () => {
    const wrapper = mountWithState({ selectedCategory: 'c1' })

    const buttons = wrapper.findAll('button')

    expect(buttons[1].classes()).toContain('active') // Shoes
    expect(buttons[2].classes()).not.toContain('active') // Hats
  })

  test('clicking "All" calls setCategory("all")', async () => {
    const wrapper = mountWithState()
    const productsStore = useProductsStore()

    const allBtn = wrapper.find('button')
    await allBtn.trigger('click')

    expect(productsStore.setCategory).toHaveBeenCalledWith('all')
  })

  test('clicking a category calls setCategory with correct id', async () => {
    const wrapper = mountWithState()
    const productsStore = useProductsStore()

    const shoesBtn = wrapper.findAll('button')[1]
    await shoesBtn.trigger('click')

    expect(productsStore.setCategory).toHaveBeenCalledWith('c1')
  })
})
