import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const state = crypto.randomUUID();

  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`;
  const authUrl = new URL(process.env.SHOPIFY_CUSTOMER_API_AUTH_URL!);

  authUrl.searchParams.set("client_id", process.env.SHOPIFY_CUSTOMER_API_CLIENT_ID!);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set(
    "scope",
    "openid email customer_read_customers customer_write_customers"
  );
  authUrl.searchParams.set("state", state);

  const res = NextResponse.redirect(authUrl.toString());

  res.cookies.set("shopify_oauth_state", state, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 600,
  });

  return res;
}
