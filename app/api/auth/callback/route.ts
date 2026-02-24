import { getOpenIdConfig } from "@/lib/shopify/customer-auth";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_REDIRECT_URI!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const storedState = req.cookies.get("shopify_state")?.value;
  const verifier = req.cookies.get("shopify_verifier")?.value;

  if (!code || !state || state !== storedState || !verifier) {
    return NextResponse.redirect(`${BASE_URL}/signin`);
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
  });

  const tokens = await tokenRes.json();

  if (!tokenRes.ok || !tokens.access_token) {
    return NextResponse.redirect(`${BASE_URL}/signin`);
  }

  const secure = req.headers.get("x-forwarded-proto") === "https";
  const res = NextResponse.redirect(`${BASE_URL}/account`);

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

  // cleanup
  res.cookies.set("shopify_state", "", { path: "/", maxAge: 0 });
  res.cookies.set("shopify_verifier", "", { path: "/", maxAge: 0 });

  return res;
}
