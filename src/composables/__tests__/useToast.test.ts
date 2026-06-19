import { describe, test, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { setActivePinia } from 'pinia'
import { useToastStore } from '@/stores/toast'
import { useToast } from '../useToast'

describe('useToast composable', () => {
  function setupStore() {
    setActivePinia(createTestingPinia({
      createSpy: vi.fn,
      initialState: {
        toast: {
          toasts: []
        }
      }
    }))
    return useToastStore()
  }

  test('success() calls toast.show with type "success"', () => {
    const store = setupStore()
    const { success } = useToast()

    success('Saved!')

    expect(store.show).toHaveBeenCalledWith('Saved!', 'success')
  })

  test('error() calls toast.show with type "error"', () => {
    const store = setupStore()
    const { error } = useToast()

    error('Oops!')

    expect(store.show).toHaveBeenCalledWith('Oops!', 'error')
  })

  test('info() calls toast.show with type "info"', () => {
    const store = setupStore()
    const { info } = useToast()

    info('FYI')

    expect(store.show).toHaveBeenCalledWith('FYI', 'info')
  })
})
