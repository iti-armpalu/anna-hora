// lib/shopify/product.ts

import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/queries/product";
import type { Product } from "@/lib/types/product";
import { shopifyFetch } from "@/lib/shopify/fetch";

// ----- FETCH SINGLE PRODUCT -----

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  const data = await shopifyFetch<{ product: Product }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );

  return data.product ?? null;
}

// ----- FETCH MULTIPLE PRODUCTS -----

export async function getProducts(first = 12): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { nodes: Product[] };
  }>(PRODUCTS_QUERY, { first });

  return data.products.nodes;
}
