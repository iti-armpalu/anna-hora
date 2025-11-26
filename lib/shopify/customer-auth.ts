// lib/shopify/customer-auth.ts
import "server-only";

const STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;

type OpenIdConfig = {
  authorization_endpoint: string;
  token_endpoint: string;
  end_session_endpoint: string;
  issuer: string;
};

export async function getOpenIdConfig(): Promise<OpenIdConfig> {
  const res = await fetch(`https://${STORE_DOMAIN}/.well-known/openid-configuration`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch Shopify OpenID configuration");
  }
  return res.json();
}

// ---- PKCE helpers (direct from Shopify docs, adapted for Node/Next) ----
// https://shopify.dev/docs/api/customer/latest#authentication :contentReference[oaicite:3]{index=3}

function base64UrlEncode(str: string) {
  const base64 = Buffer.from(str, "binary").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function generateRandomCode() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return String.fromCharCode(...Array.from(array));
}

export async function generateCodeVerifier() {
  const rando = generateRandomCode();
  return base64UrlEncode(rando);
}

export async function generateCodeChallenge(codeVerifier: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await crypto.subtle.digest({ name: "SHA-256" }, data);
  const hash = String.fromCharCode(...Array.from(new Uint8Array(digest)));
  return base64UrlEncode(hash);
}

// ---- state + nonce (also from docs) ----

export async function generateState(): Promise<string> {
  const timestamp = Date.now().toString();
  const randomString = Math.random().toString(36).substring(2);
  return timestamp + randomString;
}

export async function generateNonce(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters.charAt(randomIndex);
  }
  return nonce;
}
