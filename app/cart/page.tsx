import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import CartPageClient from "./cart-page-client"

export const metadata: Metadata = pageMeta.cart

export default function CartPage() {
  return <CartPageClient />
}
