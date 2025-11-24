// lib/shopify/product.ts
import { cookies } from "next/headers";
import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/queries/product";
import type { Product } from "@/lib/types/product";
import { shopifyFetch } from "@/lib/shopify/fetch";

export type ProductsResponse = {
  products: Product[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
};

// --------------------------------------------------
// Fetch MULTIPLE products
// --------------------------------------------------
export async function getProducts(
  first: number = 12,
  after?: string
): Promise<{
  products: Product[];
  pageInfo: { hasNextPage: boolean; endCursor: string | null };
}> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyFetch<{
    products: {
      nodes: Product[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string | null;
      };
    };
  }>({
    query: PRODUCTS_QUERY,
    variables: { first, after, country },
  });

  return {
    products: res.products.nodes,
    pageInfo: res.products.pageInfo,
  };
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


