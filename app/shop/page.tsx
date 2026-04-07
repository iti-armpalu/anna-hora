import { getCollections, getProducts } from "@/lib/shopify";
import ShopClient from "./shop-client";
import { applyMerchandisingOrder } from "@/lib/shopify/utils/apply-merchandising-order";

import { Metadata } from "next";
import { pageMeta } from "@/lib/config/metadata";

export const metadata: Metadata = pageMeta.shop;

export const revalidate = 60;

export default async function Page() {
  const [collections, productsResult] = await Promise.all([
    getCollections(),
    getProducts(250),
  ]);

  // Temporary merchandising: prioritize products with better imagery
  // until full collection merchandising is implemented
  const merchandisedProducts = applyMerchandisingOrder(productsResult.products);

  return (
      <ShopClient
        // initialProducts={productsResult.products}
        initialProducts={merchandisedProducts}
        collections={collections}
        activeCollection={null}
      />
  );
}
