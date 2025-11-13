import { getProducts } from "@/lib/shopify";

import ShopClient from "./shop-client"

export const revalidate = 60 // ISR every 60s

export default async function Page() {
  const products = await getProducts(8)
  console.log(products)
  return <ShopClient initialProducts={products} />
}
