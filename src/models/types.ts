export interface Product {
  id: string
  title: string
  description: string
  price: number
  categoryId: string
  images: string[]
  stock: number
  rating: number
  variants?: {
    color?: string[]
    size?: string[]
  }
}

export interface Category {
  id: string
  name: string
  slug: string
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface CartLine {
  product: Product
  quantity: number
}
