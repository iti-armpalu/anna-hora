import "server-only";

const domain = process.env.SHOPIFY_STORE_URL;
const publicAccessToken = process.env.SHOPIFY_STOREFRONT_API_KEY;

if (!domain) {
  throw new Error("Missing SHOPIFY_STORE_URL env var");
}

if (!publicAccessToken) {
  throw new Error("Missing SHOPIFY_STOREFRONT_API_KEY env var");
}

// Both values are narrowed to string above — safe to assert here.
// The throws above guarantee we never reach this point with undefined values.
export const SHOPIFY_CONFIG = {
  domain,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-04",
  publicAccessToken,
} satisfies Record<string, string>;

export const SHOPIFY_ENDPOINT = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;