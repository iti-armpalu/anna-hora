import { shopifyClient } from "./client";
import { cookies } from "next/headers";

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, unknown>;
}

export async function shopifyFetch<TData = unknown>({
  query,
  variables = {},
}: ShopifyFetchParams): Promise<TData> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await shopifyClient.request<TData>(query, {
    variables: {
      country,
      ...variables,
    },
  });

  if (res.errors) {
    console.error("[Shopify errors]", res.errors);
    throw new Error(
      "Shopify Storefront API error: " +
      JSON.stringify(res.errors, null, 2)
    );
  }

  if (!res.data) {
    console.error("Shopify returned no data at all.");
    throw new Error("Shopify Storefront API returned no data");
  }

  return res.data;
}
