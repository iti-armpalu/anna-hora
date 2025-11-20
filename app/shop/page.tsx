import { getCollections, getProducts } from "@/lib/shopify";
import ShopClient from "./shop-client"

export const revalidate = 60 // ISR every 60s

export default async function Page() {
  const collections = await getCollections(); // real Shopify data
  const products = await getProducts(8)

  console.log(collections);

  return <ShopClient initialProducts={products} collections={collections} />
}
