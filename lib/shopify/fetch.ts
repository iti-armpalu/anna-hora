// lib/shopify/fetch.ts
import { cookies } from "next/headers";
import { SHOPIFY_ENDPOINT, SHOPIFY_CONFIG } from "./config";

type ShopifyFetchParams<TVariables extends Record<string, unknown> = Record<string, unknown>> = {
  query: string;
  variables?: TVariables;
  /**
   * Use cache only for safe read queries (GET_CART, collections, products, etc.)
   * For mutations, ALWAYS use "no-store".
   */
  cache?: RequestCache;
  /**
   * Only used when cache !== "no-store"
   */
  revalidate?: number;
};

interface ShopifyGraphQLError {
  message: string;
  extensions?: unknown;
}

interface ShopifyResponse<TData> {
  data?: TData;
  errors?: ShopifyGraphQLError[];
}

export async function shopifyFetch<TData, TVariables extends Record<string, unknown> = Record<string, unknown>>({
  query,
  variables = {} as TVariables,
  cache = "no-store",          // ✅ SAFE DEFAULT
  revalidate = 60,
}: ShopifyFetchParams<TVariables>): Promise<TData> {
  const cookieStore = await cookies();
  // const country = cookieStore.get("country")?.value || "CZ";

  const marketCountry =
    cookieStore.get("marketCountry")?.value || "CZ";


  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_CONFIG.publicAccessToken,
    },
    body: JSON.stringify({
      query,
      variables: { marketCountry, ...variables },
    }),
    cache,
    next: cache === "no-store" ? undefined : { revalidate },
  });

  const json = (await res.json()) as ShopifyResponse<TData>;

  if (!res.ok) {
    console.error("[Shopify HTTP error]", res.status, json);
    throw new Error("Shopify HTTP error");
  }

  if (json.errors?.length) {
    console.error("[Shopify GraphQL errors]", json.errors);
    throw new Error(json.errors[0]?.message || "Shopify GraphQL error");
  }

  if (!json.data) {
    throw new Error("Shopify returned no data.");
  }

  return json.data;
}