import { generateCodeChallenge, generateCodeVerifier, generateState, getOpenIdConfig } from "@/lib/shopify/customer-auth";
import { NextRequest, NextResponse } from "next/server";


const CLIENT_ID = process.env.NEXT_PUBLIC_SHOPIFY_CLIENT_ID!;
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_REDIRECT_URI!;

export async function GET(req: NextRequest) {
  const config = await getOpenIdConfig();

  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = generateState();

  const url = new URL(config.authorization_endpoint);
  url.searchParams.set("client_id", CLIENT_ID);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", REDIRECT_URI);
  url.searchParams.set("scope", "openid email customer-account-api:full");
  url.searchParams.set("state", state);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");

  // 👇 ADD THIS LINE
  url.searchParams.set("prompt", "login");

  const res = NextResponse.redirect(url.toString());

  const secure = req.headers.get("x-forwarded-proto") === "https";

  res.cookies.set("shopify_state", state, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
  });

  res.cookies.set("shopify_verifier", verifier, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    path: "/",
  });

  return res;
}
