// lib/shopify/customer-api.ts
import "server-only";

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const CUSTOMER_API_VERSION = "2025-10"; // keep in sync with docs

export async function customerAccountRequest<T>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(
    `https://${SHOP_DOMAIN}/account/customer/api/${CUSTOMER_API_VERSION}/graphql`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // IMPORTANT: For Customer Account API, use the raw token (no "Bearer") :contentReference[oaicite:11]{index=11}
        Authorization: accessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error(`Customer API error: ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data as T;
}
