import { getOpenIdConfig } from "@/lib/shopify/customer-auth";
import { NextRequest, NextResponse } from "next/server";

const POST_LOGOUT_REDIRECT_URI =
  process.env.SHOPIFY_CUSTOMER_POST_LOGOUT_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const config = await getOpenIdConfig();
  const idToken = req.cookies.get("shopify_id_token")?.value;

  // Always send the user back to *this* site (same host that made the request)
  const homeUrl = new URL("/", req.url);

  // If you have an id_token, send the user through Shopify's end session endpoint
  // so Shopify clears its own session too.
  const redirectTo = idToken
    ? (() => {
        const u = new URL(config.end_session_endpoint);
        u.searchParams.set("id_token_hint", idToken);
        u.searchParams.set("post_logout_redirect_uri", POST_LOGOUT_REDIRECT_URI);
        return u.toString();
      })()
    : homeUrl.toString();

  const res = NextResponse.redirect(redirectTo);

  // Clear our app cookies
  res.cookies.delete("shopify_access_token");
  res.cookies.delete("shopify_id_token");

  // If you also set refresh token cookies, delete them too:
  res.cookies.delete("shopify_refresh_token");

  return res;
}