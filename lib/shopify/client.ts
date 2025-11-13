import "server-only";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const apiVersion = process.env.SHOPIFY_API_VERSION ?? "2025-04";
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_TOKEN;

if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN env var");
if (!publicAccessToken) throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN env var");

export const shopifyClient = createStorefrontApiClient({
  storeDomain: `https://${domain}`,
  apiVersion,
  publicAccessToken,
});
