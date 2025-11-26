// lib/shopify/customer-api.ts
import "server-only";
import { getOpenIdConfig } from "./customer-auth";

const CUSTOMER_API_VERSION = "2024-10"; // recommended stable

export async function customerAccountRequest<T>(
  accessToken: string,
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  // Load OpenID config to get the correct issuer
  const config = await getOpenIdConfig();

  // Build the correct Customer Account API URL
  const endpoint = `${config.issuer}/customer/api/${CUSTOMER_API_VERSION}/graphql`;

  console.log("Customer API Endpoint:", endpoint);
  console.log("Issuer:", config.issuer); // should be https://shopify.com/98007613781
  console.log("Using endpoint:", endpoint);


  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // IMPORTANT: Must be the raw token, not "Bearer <token>"
      Authorization: accessToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Customer API error:", res.status);
    throw new Error(`Customer API error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("Customer API GraphQL errors:", json.errors);
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data as T;
}
