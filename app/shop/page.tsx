import { getCollections, getProducts } from "@/lib/shopify";
import ShopClient from "./shop-client";

export const revalidate = 60;

export default async function Page() {
  const collections = await getCollections();
  const { products } = await getProducts(250);

  return (
    <ShopClient
      initialProducts={products}
      collections={collections}
      activeCollection={null}
    />
  );
}
