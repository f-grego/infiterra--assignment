import { useToastStore } from '@/stores/toast'

export function useToast() {
  const toast = useToastStore()

  return {
    success: (msg: string) => toast.show(msg, 'success'),
    error: (msg: string) => toast.show(msg, 'error'),
    info: (msg: string) => toast.show(msg, 'info')
  }
}
