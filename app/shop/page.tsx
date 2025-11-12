import { getProducts } from "@/queries/get-products"
import ShopClient from "./shop-client"

export const revalidate = 60 // ISR every 60s

export default async function Page() {
  const products = await getProducts(1)
  return <ShopClient initialProducts={products} />
}
