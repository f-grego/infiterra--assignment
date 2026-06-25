import type { Product, Category } from '@/models/types'

const BASE_URL = import.meta.env.VITE_API_URL

export async function fetchProductsApi(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return await res.json() as Promise<Product[]>
}

export async function fetchCategoriesApi(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`)
  if (!res.ok) throw new Error('Failed to fetch categories')
  return await res.json() as Promise<Category[]>
}
