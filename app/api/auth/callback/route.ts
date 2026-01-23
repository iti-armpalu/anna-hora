// app/api/auth/callback/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  console.log("--- [DEBUG] Callback Route Hit ---");
  console.log("Code received:", code ? "YES" : "NO");

  const cookieStore = await cookies();
  const verifier = cookieStore.get("shopify_verifier")?.value;

  if (!code || !verifier) {
    console.error("Missing code or verifier. Verifier exists:", !!verifier);
    return NextResponse.redirect(new URL("/signin?error=invalid_session", request.url));
  }

  // Exchange the code for the real access token
  const shopId = process.env.SHOPIFY_SHOP_ID;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID;

  try {
    const res = await fetch(`https://shopify.com/${shopId}/auth/oauth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: clientId!,
        redirect_uri: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
        code,
        code_verifier: verifier,
      }),
    });

    const data = await res.json();

    if (data.access_token) {
      console.log("Token exchange successful!");

      // Save the session!
      cookieStore.set("customer_session", data.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: data.expires_in,
      });

      // Cleanup
      cookieStore.delete("shopify_verifier");

      // Send them to the account page
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/account`);
    } else {
      console.error("Token exchange failed:", data);
      return NextResponse.redirect(new URL("/signin?error=token_failed", request.url));
    }
  } catch (err) {
    console.error("Callback Error:", err);
    return NextResponse.redirect(new URL("/signin?error=server_error", request.url));
  }
}