import { defineStore } from 'pinia'

export interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
}

export const useToastStore = defineStore('toast', {
  state: () => ({
    toasts: [] as Toast[],
    counter: 0
  }),

  actions: {
    show(message: string, type: Toast['type'] = 'info') {
      const id = this.counter++
      this.toasts.push({ id, message, type })

      setTimeout(() => {
        this.remove(id)
      }, 3000)
    },

    remove(id: number) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    }
  }
})
