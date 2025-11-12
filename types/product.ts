// types/product.ts
export type RecommendedItem = {
  id: number
  name: string
  price: number
  image: string
  subtitle?: string
}


export interface ProductForWishlist {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  color: string
  size?: string
  stock: number
  category: string
}
