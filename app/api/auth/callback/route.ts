// app/api/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const tenantId = process.env.SHOPIFY_TENANT_ID!;

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  const tokenRes = await fetch(
    `https://shopify.com/authentication/${tenantId}/oauth/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!,
        grant_type: "authorization_code",
        redirect_uri: process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI!,
        code,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenData.id_token) {
    console.error("Token exchange failed:", tokenData);
    return NextResponse.json(
      { error: "Token exchange failed", details: tokenData },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set("shopify_customer_token", tokenData.id_token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.redirect("/");
}
