import { cookies } from "next/headers";
import { SHOPIFY_ENDPOINT, SHOPIFY_CONFIG } from "./config";
import { resolveMarketCountry } from "./resolve-market";

type ShopifyFetchParams<
  TVariables extends Record<string, unknown> = Record<string, unknown>
> = {
  query: string;
  variables?: TVariables;
  cache?: RequestCache;
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

export async function shopifyFetch<
  TData,
  TVariables extends Record<string, unknown> = Record<string, unknown>
>({
  query,
  variables = {} as TVariables,
  cache = "no-store",
  revalidate = 60,
}: ShopifyFetchParams<TVariables>): Promise<TData> {
  const cookieStore = await cookies();

  const shippingCountry =
    cookieStore.get("shippingCountry")?.value || "CZ";

  const marketCountry = await resolveMarketCountry(shippingCountry);

  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_CONFIG.publicAccessToken,
    },
    body: JSON.stringify({
      query,
      variables: {
        ...variables,
        country: marketCountry,
      },
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