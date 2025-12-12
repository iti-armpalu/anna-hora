// app/cart/page.tsx
import type { Metadata } from "next"
import { formatTitle, SEO } from "@/config/seo"
import CartPageClient from "./cart-page-client"
import { getFreeShippingThreshold } from "@/lib/geo/get-free-shipping-treshold";

export const metadata: Metadata = {
  title: formatTitle("Your Bag"),
  description: SEO.description,
}
export default async function CartPage() {
  const { threshold } = await getFreeShippingThreshold();


  return <CartPageClient threshold={threshold} />;

}
