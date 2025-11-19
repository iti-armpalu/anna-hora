import { shopifyClient } from "./client";
import { cookies } from "next/headers";

export async function shopifyFetch<TData = unknown>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<TData> {
  // FIX: cookies() must be awaited in your environment
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "US";

  const res = await shopifyClient.request<TData>(query, {
    variables: {
      country,       // inject country automatically
      ...variables,
    },
  });

  if (res.errors) {
    console.error("[Shopify errors]", res.errors);
    throw new Error("Shopify Storefront API error");
  }

  if (!res.data) {
    throw new Error("Shopify Storefront API returned no data");
  }

  return res.data;
}
