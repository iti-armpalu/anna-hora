// app/auth/customer/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getOpenIdConfig } from "@/lib/shopify/customer-auth";

const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_API_CLIENT_ID!;
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_REDIRECT_URI!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    // TODO: handle specific errors
    return NextResponse.redirect(`${SITE_URL}/login?error=${error}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${SITE_URL}/login?error=missing_code`);
  }

  const cookies = req.cookies;
  const storedState = cookies.get("shopify_customer_state")?.value;
  const verifier = cookies.get("shopify_customer_verifier")?.value;

  if (!storedState || state !== storedState || !verifier) {
    return NextResponse.redirect(`${SITE_URL}/login?error=invalid_state`);
  }

  const config = await getOpenIdConfig();

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", CLIENT_ID);
  body.set("redirect_uri", REDIRECT_URI);
  body.set("code", code);
  body.set("code_verifier", verifier); // PKCE requirement for public clients :contentReference[oaicite:6]{index=6}  

  const tokenRes = await fetch(config.token_endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      // for confidential clients you’d also send Authorization: Basic ...
      "user-agent": "nextjs-storefront",
      origin: SITE_URL, // avoids some invalid_token issues in practice :contentReference[oaicite:7]{index=7}
    },
    body,
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(`${SITE_URL}/login?error=token_exchange_failed`);
  }

  const tokens = (await tokenRes.json()) as TokenResponse;

  // In production, Shopify recommends storing tokens in a DB. :contentReference[oaicite:8]{index=8}
  // For now, we store them in secure cookies.
  const res = NextResponse.redirect(`${SITE_URL}/account`);

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  };

  res.cookies.set("shopify_customer_access_token", tokens.access_token, {
    ...cookieOptions,
    // expires_in is seconds
    maxAge: tokens.expires_in,
  });

  res.cookies.set("shopify_customer_refresh_token", tokens.refresh_token, {
    ...cookieOptions,
    maxAge: 60 * 60 * 24 * 30, // 30 days example
  });

  res.cookies.set("shopify_customer_id_token", tokens.id_token, cookieOptions);

  // Clean up one-time values
  res.cookies.delete("shopify_customer_verifier");
  res.cookies.delete("shopify_customer_state");

  return res;
}
