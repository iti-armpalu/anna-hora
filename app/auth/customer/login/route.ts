// app/auth/customer/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getOpenIdConfig,
  generateCodeVerifier,
  generateCodeChallenge,
  generateState,
  generateNonce,
} from "@/lib/shopify/customer-auth";


const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_API_CLIENT_ID!;
const REDIRECT_URI = process.env.SHOPIFY_CUSTOMER_REDIRECT_URI!;

console.log("Login route hit");

console.log("CLIENT_ID:", CLIENT_ID);
console.log("REDIRECT_URI:", REDIRECT_URI);
console.log("SHOPIFY_STORE_DOMAIN:", process.env.SHOPIFY_STORE_DOMAIN);

export async function GET(_req: NextRequest) {
  const config = await getOpenIdConfig();

  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  const state = await generateState();
  const nonce = await generateNonce(32);

  console.log("Redirect URL:");
  console.log(buildAuthUrl(config.authorization_endpoint, {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    state,
    nonce,
    codeChallenge: challenge,
  }));

  // Store verifier, state, nonce in secure, httpOnly cookies
  const res = NextResponse.redirect(new URL(buildAuthUrl(config.authorization_endpoint, {
    clientId: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    state,
    nonce,
    codeChallenge: challenge,
  })));

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "lax" as const,
    path: "/",
  };

  res.cookies.set("shopify_customer_verifier", verifier, cookieOptions);
  res.cookies.set("shopify_customer_state", state, cookieOptions);
  res.cookies.set("shopify_customer_nonce", nonce, cookieOptions);

  return res;
}

function buildAuthUrl(
  authorizationEndpoint: string,
  opts: {
    clientId: string;
    redirectUri: string;
    state: string;
    nonce: string;
    codeChallenge: string;
  }
) {
  const url = new URL(authorizationEndpoint);

  url.searchParams.set("scope", "openid email customer-account-api:full");
  url.searchParams.set("client_id", opts.clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", opts.redirectUri);
  url.searchParams.set("state", opts.state);
  url.searchParams.set("nonce", opts.nonce);
  url.searchParams.set("code_challenge", opts.codeChallenge);
  url.searchParams.set("code_challenge_method", "S256");

  return url.toString();
}
