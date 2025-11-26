import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();

  const storedState = cookieStore.get("shopify_oauth_state")?.value;
  if (!code || !state || state !== storedState) {
    return NextResponse.json({ error: "Invalid OAuth state" }, { status: 400 });
  }

  const tokenUrl = process.env.SHOPIFY_CUSTOMER_API_TOKEN_URL!;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: process.env.SHOPIFY_CUSTOMER_API_CLIENT_ID!,
    client_secret: process.env.SHOPIFY_CUSTOMER_API_CLIENT_SECRET!,
    redirect_uri: redirectUri,
    code,
  });

  const tokenRes = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  if (!tokenRes.ok) {
    return NextResponse.json(
      { error: "Token exchange failed", details: await tokenRes.json() },
      { status: 400 }
    );
  }

  const tokenData = (await tokenRes.json()) as {
    id_token: string;
    access_token: string;
    refresh_token?: string;
  };

  const res = NextResponse.redirect("/account");

  res.cookies.set("shopify_customer_token", tokenData.id_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.cookies.set("shopify_customer_access_token", tokenData.access_token, {
    httpOnly: true,
    secure: true,
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.delete("shopify_oauth_state");

  return res;
}
