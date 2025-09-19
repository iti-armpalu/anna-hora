// lib/get-products.ts
import { shopifyFetch } from "@/lib/shopify"
import { PRODUCTS_QUERY } from "@/queries/products"

export type ProductNode = {
  id: string
  handle: string
  title: string
  description?: string | null
  featuredImage?: { url: string; altText?: string | null } | null
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } }
}

type ProductsResponse = {
  products: { nodes: ProductNode[] }
}

export async function getProducts(first = 1) {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, { first })
  return data.products.nodes
}
