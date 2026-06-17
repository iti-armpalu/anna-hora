import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import { PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from "@/lib/shopify/queries/product";
import type { Product } from "@/lib/shopify/types/product";
import { ProductNormalized } from "./types/product-normalized";
import { normalizeProduct, normalizeProducts } from "../normalizers/product";

// Response shape Shopify returns
interface ShopifyProductsQueryResponse {
  products: {
    nodes: Product[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

// --------------------------------------------------
// Fetch MULTIPLE products
// --------------------------------------------------
export interface GetProductsOptions {
  first?: number;
  after?: string | null;
}

export interface GetProductsResult {
  products: ProductNormalized[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export async function getProducts(
  first: number = 12,
  after?: null
): Promise<GetProductsResult> {
  const res = await shopifyFetch<ShopifyProductsQueryResponse>({
    query: PRODUCTS_QUERY,
    variables: {
      first,
      after,
      query: '-tag:"gift-card"',
    },
    cache: "no-store",
  });

  return {
    products: normalizeProducts(res.products.nodes),
    pageInfo: res.products.pageInfo,
  };
}

// --------------------------------------------------
// Fetch SINGLE product by handle
// --------------------------------------------------
interface ShopifyProductQueryResponse {
  product: Product | null;
}

export async function getProductByHandle(handle: string): Promise<ProductNormalized | null> {
  const res = await shopifyFetch<ShopifyProductQueryResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    cache: "no-store",
  });

  if (!res.product) return null;

  return normalizeProduct(res.product);
}

// --------------------------------------------------
// Fetch gift card product (market-aware)
// --------------------------------------------------
export async function getGiftCardProduct(): Promise<ProductNormalized | null> {
  const cookieStore = await cookies();
  const country = cookieStore.get("shippingCountry")?.value || "CZ";

  const res = await shopifyFetch<ShopifyProductsQueryResponse>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 1,
      query: 'tag:"gift-card"',
      country,
    },
  });

  const productNode = res.products.nodes[0];
  if (!productNode) return null;

  return normalizeProduct(productNode);
}