import { getCollections, getProducts } from "@/lib/shopify";
import ShopClient from "./shop-client";
import { Suspense } from "react";
import ShopSkeleton from "./shop-skeleton";

export const revalidate = 60;

export default async function Page() {
  const [collections, productsResult] = await Promise.all([
    getCollections(),
    getProducts(250),
  ]);

  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient
        initialProducts={productsResult.products}
        collections={collections}
        activeCollection={null}
      />
    </Suspense>
  );
}
