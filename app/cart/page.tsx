// app/cart/page.tsx
import type { Metadata } from "next"
import { formatTitle, SEO } from "@/config/seo"
import CartPageClient from "./cart-page-client"

export const metadata: Metadata = {
  title: formatTitle("Your Bag"),
  description: SEO.description,
}
export default function CartPage() {
  return <CartPageClient />
}
