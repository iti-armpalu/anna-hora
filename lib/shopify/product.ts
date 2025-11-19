// lib/shopify/product.ts
import { cookies } from "next/headers";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/queries/product";
import type { Product } from "@/lib/types/product";
import { shopifyFetch } from "@/lib/shopify/fetch";

// ----- FETCH SINGLE PRODUCT -----

export async function getProductByHandle(
  handle: string
): Promise<Product | null> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const data = await shopifyFetch<{ product: Product }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle, country }
  );

  return data.product ?? null;
}

// ----- FETCH MULTIPLE PRODUCTS -----

export async function getProducts(first = 12): Promise<Product[]> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "US";

  const data = await shopifyFetch<{
    products: { nodes: Product[] };
  }>(PRODUCTS_QUERY, { first, country });

  return data.products?.nodes ?? [];
}
