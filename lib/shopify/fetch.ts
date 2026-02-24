// lib/shopify/fetch.ts
import { cookies } from "next/headers";
import { SHOPIFY_ENDPOINT, SHOPIFY_CONFIG } from "./config";

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
  revalidate?: number;
  cache?: RequestCache;
}

export async function shopifyFetch<TData>({
  query,
  variables = {},
  revalidate = 60,
  cache = "force-cache",
}: ShopifyFetchParams): Promise<TData> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "CZ";

  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_CONFIG.publicAccessToken,
    },
    body: JSON.stringify({
      query,
      variables: { country, ...variables },
    }),
    cache,
    next: cache === "no-store" ? undefined : { revalidate },
  });

  const json = await res.json();

  if (json.errors) {
    console.error("[Shopify errors]", json.errors);
    throw new Error("Shopify Storefront API error");
  }

  if (!json.data) {
    throw new Error("Shopify returned no data");
  }

  return json.data;
}