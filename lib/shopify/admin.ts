import "server-only";
import { SHOPIFY_CONFIG } from "./config";

/**
 * Admin API client — SERVER ONLY. Uses the Dev Dashboard app's client credentials,
 * which are secret (unlike the public Storefront token). Never import this from
 * anything that can reach the browser.
 */

const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;

const ADMIN_API_VERSION = SHOPIFY_CONFIG.apiVersion;
const TOKEN_ENDPOINT = `https://${SHOPIFY_CONFIG.domain}/admin/oauth/access_token`;
const ADMIN_ENDPOINT = `https://${SHOPIFY_CONFIG.domain}/admin/api/${ADMIN_API_VERSION}/graphql.json`;

// Refresh a few minutes before Shopify's 24h expiry so a request never uses a dying token
const TOKEN_REFRESH_MARGIN_MS = 5 * 60 * 1000;

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

interface AdminGraphQLResponse<TData> {
  data?: TData;
  errors?: { message: string }[];
}

// Module-level cache: lives for the lifetime of a warm serverless instance
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAdminAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt - TOKEN_REFRESH_MARGIN_MS) {
    return cachedToken.value;
  }

  if (!clientId || !clientSecret) {
    throw new Error("Missing SHOPIFY_ADMIN_CLIENT_ID or SHOPIFY_ADMIN_CLIENT_SECRET env var");
  }

  const tokenRes = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    throw new Error(`Admin token request failed: ${tokenRes.status} ${await tokenRes.text()}`);
  }

  const token = (await tokenRes.json()) as TokenResponse;
  cachedToken = {
    value: token.access_token,
    expiresAt: Date.now() + token.expires_in * 1000,
  };

  return cachedToken.value;
}

export async function adminFetch<TData>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<TData> {
  const accessToken = await getAdminAccessToken();

  const res = await fetch(ADMIN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
    // Admin data is always live store state — never cache
    cache: "no-store",
  });

  const json = (await res.json()) as AdminGraphQLResponse<TData>;

  if (!res.ok || json.errors?.length) {
    throw new Error(
      `Admin API error (${res.status}): ${json.errors?.map((e) => e.message).join("; ") ?? "unknown"}`
    );
  }

  if (!json.data) throw new Error("Admin API returned no data.");

  return json.data;
}
