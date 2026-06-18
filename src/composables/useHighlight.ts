import { useProductsStore } from '@/stores/products'

export function useHighlight() {
  const store = useProductsStore()

  const highlight = (text: string) => {
    const q = store.searchQuery.trim()
    if (!q) return text

    const regex = new RegExp(`(${q})`, 'gi')
    return text.replace(regex, '<mark>$1</mark>')
  }

  return { highlight }
}
