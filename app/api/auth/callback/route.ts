import { getOpenIdConfig } from "@/lib/shopify/customer-auth";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = req.cookies.get("shopify_state")?.value;
  const verifier = req.cookies.get("shopify_verifier")?.value;

  // Always redirect relative to the current host (works for www, preview, etc.)
  const signinUrl = new URL("/signin", req.url);
  const accountUrl = new URL("/account", req.url);

  if (!code || !state || state !== storedState || !verifier) {
    return NextResponse.redirect(signinUrl);
  }

  const config = await getOpenIdConfig();

  const body = new URLSearchParams();
  body.set("grant_type", "authorization_code");
  body.set("client_id", CLIENT_ID);
  body.set("redirect_uri", REDIRECT_URI);
  body.set("code", code);
  body.set("code_verifier", verifier);

  const tokenRes = await fetch(config.token_endpoint, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
    cache: "no-store",
  });

  const tokens = await tokenRes.json().catch(() => null);

  if (!tokenRes.ok || !tokens?.access_token) {
    return NextResponse.redirect(signinUrl);
  }

  const secure = req.headers.get("x-forwarded-proto") === "https";
  const res = NextResponse.redirect(accountUrl);

  res.cookies.set("shopify_access_token", tokens.access_token, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
    maxAge: tokens.expires_in ?? 3600,
  });

  if (tokens.id_token) {
    res.cookies.set("shopify_id_token", tokens.id_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: tokens.expires_in ?? 3600,
    });
  }

  // cleanup (proper delete)
  res.cookies.delete("shopify_state");
  res.cookies.delete("shopify_verifier");

  return res;
}

