// Shopify sends you the authorization code → you exchange it for an ID token → store it in a secure cookie.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");

    if (!code) {
        return NextResponse.json({ error: "Missing code" }, { status: 400 });
    }

    // Exchange code for tokens
    const tokenRes = await fetch(
        `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/token`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                client_id: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
                grant_type: "authorization_code",
                redirect_uri: process.env.SHOPIFY_CUSTOMER_ACCOUNT_REDIRECT_URI,
                code,
            }),
        }
    );

    const tokenData = await tokenRes.json();

    if (!tokenData.id_token) {
        console.error("Token error", tokenData);
        return NextResponse.json({ error: "Token exchange failed" }, { status: 400 });
    }

    const cookieStore = await cookies();

    // Store JWT in HttpOnly cookie
    cookieStore.set("shopify_customer_token", tokenData.id_token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days refresh window
    });

    // Redirect to your app home or dashboard
    return NextResponse.redirect("/");
}
