import "server-only";

const STORE_DOMAIN = process.env.SHOP_STOREFRONT_DOMAIN!;

export type OpenIdConfig = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
};

export async function getOpenIdConfig(): Promise<OpenIdConfig> {
  const res = await fetch(
    `https://${STORE_DOMAIN}/.well-known/openid-configuration`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Shopify OpenID configuration");
  }

  return res.json();
}

/* PKCE helpers */

function base64UrlEncode(buffer: ArrayBuffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function generateCodeVerifier() {
  const random = crypto.getRandomValues(new Uint8Array(32));
  return base64UrlEncode(random.buffer);
}

export async function generateCodeChallenge(verifier: string) {
  const data = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(digest);
}

export function generateState() {
  return crypto.randomUUID();
}
