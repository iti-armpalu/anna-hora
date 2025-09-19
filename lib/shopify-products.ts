// lib/shopify-products.ts
import { shopify } from "@/lib/shopify";
import { PRODUCTS_QUERY } from "@/queries/products";

export async function getProducts(first = 8) {
  const { data, errors } = await shopify.request(PRODUCTS_QUERY, { variables: { first } });

  if (errors) {
    console.error("Shopify errors:", errors);
    throw new Error("Failed to fetch products");
  }

  return data.products.nodes;
}
