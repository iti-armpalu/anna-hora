import CartPageClient from "./cart-page-client"
import { getFreeShippingThreshold } from "@/lib/geo/get-free-shipping-treshold";

export default async function CartPage() {
  const { threshold } = await getFreeShippingThreshold();


  return <CartPageClient threshold={threshold} />;

}
