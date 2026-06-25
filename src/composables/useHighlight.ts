import { useProductsStore } from '@/stores/products'

export function useHighlight() {
  const store = useProductsStore()

  const escapeHtml = (value: string): string => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  const highlight = (text: string) => {
    const q = store.searchQuery.trim()
    const escapedText = escapeHtml(text)

    if (!q) return escapedText

    const escapedQuery = escapeHtml(q)
    const regex = new RegExp(`(${escapedQuery})`, 'gi')

    return escapedText.replace(regex, '<mark>$1</mark>')
  }

  return { highlight }
}