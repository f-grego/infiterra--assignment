import { setActivePinia, createPinia } from 'pinia'
import { useToastStore } from '../toast'

describe('toastStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  test('show adds a toast', () => {
    const store = useToastStore()
    store.show('Hello', 'success')

    expect(store.toasts.length).toBe(1)
    expect(store.toasts[0].message).toBe('Hello')
  })

  test('toast auto-removes after timeout', () => {
    const store = useToastStore()
    store.show('Test')

    expect(store.toasts.length).toBe(1)

    vi.runAllTimers()

    expect(store.toasts.length).toBe(0)
  })
})
