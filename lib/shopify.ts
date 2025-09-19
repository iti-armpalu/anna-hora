import "server-only";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-04";
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN env var");
if (!publicAccessToken) throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN env var");

export const shopify = createStorefrontApiClient({
  storeDomain: `https://${domain}`,
  apiVersion,
  publicAccessToken,
});

export async function shopifyFetch<TData = unknown>(
  query: string,
  variables?: Record<string, unknown>
): Promise<TData> {
  const res = await shopify.request<TData>(query, { variables });

  if (res.errors) {
    console.error("[Shopify errors]", res.errors);
    throw new Error("Shopify Storefront API error");
  }
  if (!res.data) {
    throw new Error("Shopify Storefront API returned no data");
  }
  return res.data;
}
