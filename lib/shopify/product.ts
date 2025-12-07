"use server";

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
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyFetch<ShopifyProductsQueryResponse>({
    query: PRODUCTS_QUERY,
    variables: {
      first,
      after,
      country,
      query: '-tag:"gift-card"', // exclude gift cards
    },
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
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyFetch<ShopifyProductQueryResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle, country },
  });


  if (!res.product) return null;

  return normalizeProduct(res.product);
}

// --------------------------------------------------
// Fetch gift card product
// --------------------------------------------------
export async function getGiftCardProduct() {
  const res = await shopifyFetch<ShopifyProductsQueryResponse>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 1,              // only one product expected
      query: 'tag:"gift-card"', // fetch *only* the product with this tag
    },
  });

  const productNode = res.products.nodes[0];
  if (!productNode) return null;

  return normalizeProduct(productNode);
}


