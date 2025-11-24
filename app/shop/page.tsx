// /app/(store)/shop/page.tsx

import { getCollections, getProducts } from "@/lib/shopify";
import ShopClient from "./shop-client";

export const revalidate = 60;

export default async function Page() {
  const collections = await getCollections();
  const { products, pageInfo } = await getProducts(3);

  return (
    <ShopClient
      initialProducts={products}
      initialPageInfo={pageInfo}
      collections={collections}
      initialCollectionHandle="all"
    />
  );
}
