import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function GET() {
  const state = randomUUID();

  const params = new URLSearchParams({
    client_id: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!,
    redirect_uri: process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI!,
    response_type: "code",
    scope: process.env.SHOPIFY_CUSTOMER_ACCOUNT_SCOPES!,
    state,
  });

  // IMPORTANT: Shopify new customer accounts use tenant ID identity domain
  const authorizeUrl = `https://shopify.com/authentication/98007613781/oauth/authorize?${params}`;

  return NextResponse.redirect(authorizeUrl);
}
