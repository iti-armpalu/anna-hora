import { shopifyClient } from "./client";

export async function shopifyFetch<TData = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<TData> {
  const res = await shopifyClient.request<TData>(query, { variables });

  if (res.errors) {
    console.error("[Shopify errors]", res.errors);
    throw new Error("Shopify Storefront API error");
  }

  if (!res.data) {
    throw new Error("Shopify Storefront API returned no data");
  }

  return res.data;
}
