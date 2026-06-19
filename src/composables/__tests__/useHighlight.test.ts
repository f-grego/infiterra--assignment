import { describe, test, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useProductsStore } from '@/stores/products'
import { useHighlight } from '../useHighlight'

describe('useHighlight composable', () => {
  function setupStore(searchQuery: string) {
    setActivePinia(createTestingPinia({
      initialState: {
        products: {
          searchQuery
        }
      }
    }))
    return useProductsStore()
  }

  test('returns original text when searchQuery is empty', () => {
    setupStore('')
    const { highlight } = useHighlight()

    const result = highlight('Hello World')
    expect(result).toBe('Hello World')
  })

  test('highlights matching text', () => {
    setupStore('hello')
    const { highlight } = useHighlight()

    const result = highlight('Hello World')
    expect(result).toBe('<mark>Hello</mark> World')
  })

  test('highlights multiple occurrences', () => {
    setupStore('test')
    const { highlight } = useHighlight()

    const result = highlight('test 123 test ABC')
    expect(result).toBe('<mark>test</mark> 123 <mark>test</mark> ABC')
  })

  test('is case-insensitive', () => {
    setupStore('world')
    const { highlight } = useHighlight()

    const result = highlight('WORLD world WoRlD')
    expect(result).toBe('<mark>WORLD</mark> <mark>world</mark> <mark>WoRlD</mark>')
  })
})
