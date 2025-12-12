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
  const country = cookieStore.get("country")?.value || "GB";

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


// import { shopifyClient } from "./client";
// import { cookies } from "next/headers";

// interface ShopifyFetchParams {
//   query: string;
//   variables?: Record<string, unknown>;
//   revalidate?: number;
// }

// export async function shopifyFetch<TData = unknown>({
//   query,
//   variables = {},
//   revalidate = 60,
// }: ShopifyFetchParams): Promise<TData> {
//   const cookieStore = await cookies();
//   const country = cookieStore.get("country")?.value || "GB";

//   const res = await shopifyClient.request<TData>(query, {
//     variables: {
//       country,
//       ...variables,
//     },
//   });

//   if (res.errors) {
//     console.error("[Shopify errors]", res.errors);
//     throw new Error(
//       "Shopify Storefront API error: " +
//       JSON.stringify(res.errors, null, 2)
//     );
//   }

//   if (!res.data) {
//     console.error("Shopify returned no data at all.");
//     throw new Error("Shopify Storefront API returned no data");
//   }

//   return res.data;
// }
