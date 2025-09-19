// app/cart/page.tsx
import type { Metadata } from "next"
import CartPageClient from "./cart-page-client"


export const metadata: Metadata = {
  title: "Your Bag • ANNA HORA",
}

export default function CartPage() {
  return <CartPageClient />
}
