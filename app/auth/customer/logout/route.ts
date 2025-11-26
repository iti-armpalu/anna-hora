import { NextRequest, NextResponse } from "next/server";
import { getOpenIdConfig } from "@/lib/shopify/customer-auth";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;

export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const idToken = cookies.get("shopify_customer_id_token")?.value;

  const config = await getOpenIdConfig();
  const url = new URL(config.end_session_endpoint);

  url.searchParams.set("id_token_hint", idToken ?? "");
  url.searchParams.set("post_logout_redirect_uri", `${SITE_URL}/`);

  const res = NextResponse.redirect(url.toString());

  // clear cookies
  res.cookies.delete("shopify_customer_access_token");
  res.cookies.delete("shopify_customer_refresh_token");
  res.cookies.delete("shopify_customer_id_token");

  return res;
}
