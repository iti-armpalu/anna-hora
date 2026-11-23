import { cache } from "react";
import { shopifyFetch } from "@/lib/shopify/fetch";

import {
  PRODUCT_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_COLOR_SIBLINGS_QUERY,
} from "@/lib/shopify/queries/product";
import { COLOR_GROUP_TAG_PREFIX } from "@/lib/config/color-group";
import type { Product } from "@/lib/shopify/types/product";
import type { ProductNormalized, ColorSiblingNormalized } from "./types/product-normalized";
import type { ProductOption } from "./types/product";
import { normalizeProduct, normalizeProducts, getColorSwatch } from "../normalizers/product";

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

// cache(): generateMetadata and the page both call this — dedupe to one request per render.
// (Next only auto-dedupes GET fetches; Storefront API calls are POST.)
export const getProductByHandle = cache(
  async (handle: string): Promise<ProductNormalized | null> => {
    const res = await shopifyFetch<ShopifyProductQueryResponse>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
      cache: "no-store",
    });

    if (!res.product) return null;

    return normalizeProduct(res.product);
  }
);

// --------------------------------------------------
// Fetch all colours of a style (products sharing a group tag)
// --------------------------------------------------
interface ShopifyColorSiblingsResponse {
  products: {
    nodes: {
      handle: string;
      title: string;
      availableForSale: boolean;
      options: ProductOption[];
    }[];
  };
}

export async function getColorSiblings(
  colorGroup: string
): Promise<ColorSiblingNormalized[]> {
  const res = await shopifyFetch<ShopifyColorSiblingsResponse>({
    query: PRODUCT_COLOR_SIBLINGS_QUERY,
    variables: {
      query: `tag:"${COLOR_GROUP_TAG_PREFIX}${colorGroup}" AND -tag:"gift-card"`,
    },
    // Catalog data, not user-specific — a minute of staleness on sold-out dimming is fine
    cache: "force-cache",
    revalidate: 60,
  });

  return res.products.nodes.map((node) => ({
    handle: node.handle,
    title: node.title,
    color: getColorSwatch(node.options),
    // Product-level flag: true if any size is in stock or on pre-order
    purchasable: node.availableForSale,
  }));
}

// --------------------------------------------------
// Fetch gift card product (market-aware)
// --------------------------------------------------
export async function getGiftCardProduct(): Promise<ProductNormalized | null> {
  // Market country is injected by shopifyFetch from the shippingCountry cookie
  const res = await shopifyFetch<ShopifyProductsQueryResponse>({
    query: PRODUCTS_QUERY,
    variables: {
      first: 1,
      query: 'tag:"gift-card"',
    },
    // Catalog data, not user-specific
    cache: "force-cache",
    revalidate: 60,
  });

  const productNode = res.products.nodes[0];
  if (!productNode) return null;

  return normalizeProduct(productNode);
}