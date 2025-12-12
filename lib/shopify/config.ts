import "server-only";

export const SHOPIFY_CONFIG = {
  domain: process.env.SHOPIFY_STORE_URL,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-04",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_KEY,
};

if (!SHOPIFY_CONFIG.domain) {
  throw new Error("Missing SHOPIFY_STORE_URL env var");
}

if (!SHOPIFY_CONFIG.publicAccessToken) {
  throw new Error("Missing SHOPIFY_STOREFRONT_API_KEY env var");
}

export const SHOPIFY_ENDPOINT = `https://${SHOPIFY_CONFIG.domain}/api/${SHOPIFY_CONFIG.apiVersion}/graphql.json`;
