// lib/shopify/product.ts
import { cookies } from "next/headers";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/queries/product";
import type { Product } from "@/lib/types/product";
import { shopifyFetch } from "@/lib/shopify/fetch";

// --------------------------------------------------
// Fetch MULTIPLE products
// --------------------------------------------------
export async function getProducts(first: number = 12): Promise<Product[]> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyFetch<{
    products: {
      nodes: Product[];
    };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first, country },
  });

  return res.products?.nodes ?? [];
}

// --------------------------------------------------
// Fetch SINGLE product by handle
// --------------------------------------------------
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyFetch<{
    product: Product | null;
  }>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle, country },
  });

  return res.product ?? null;
}


