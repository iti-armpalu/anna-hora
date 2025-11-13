import { shopifyFetch } from "../shopify/fetch";
import { PRODUCTS_QUERY } from "../queries/products";

// --- Types ---
export type ProductNode = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;

  // Add images (used for carousel)
  images?: {
    edges: {
      node: {
        url: string;
        altText?: string | null;
      };
    }[];
  };

  // Featured image (Shopify always includes this)
  featuredImage?: {
    url: string;
    altText?: string | null;
  } | null;
  options?: {
    name: string;
    values: string[];
  }[];
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice?: { amount: string; currencyCode: string };
  };
  variants?: {
    edges: {
      node: {
        id: string;
        availableForSale: boolean;
        selectedOptions: {
          name: string;
          value: string;
        }[];
      };
    }[];
  };
  metafields?: { key: string; value: string | null }[];
};

type ProductsResponse = {
  products: { nodes: ProductNode[] };
};

// --- Function ---
export async function getProducts(first = 8): Promise<ProductNode[]> {
  const data = await shopifyFetch<ProductsResponse>(PRODUCTS_QUERY, { first });
  return data.products.nodes;
}
