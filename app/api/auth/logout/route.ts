import { getOpenIdConfig } from "@/lib/shopify/customer-auth";
import { NextRequest, NextResponse } from "next/server";


const POST_LOGOUT_REDIRECT_URI =
  process.env.SHOPIFY_CUSTOMER_POST_LOGOUT_REDIRECT_URI!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function GET(req: NextRequest) {
  const config = await getOpenIdConfig();
  const idToken = req.cookies.get("shopify_id_token")?.value;

  const secure = req.headers.get("x-forwarded-proto") === "https";

  const res = NextResponse.redirect(
    idToken
      ? (() => {
          const u = new URL(config.end_session_endpoint);
          u.searchParams.set("id_token_hint", idToken);
          u.searchParams.set(
            "post_logout_redirect_uri",
            POST_LOGOUT_REDIRECT_URI
          );
          return u.toString();
        })()
      : BASE_URL
  );

  const clear = (name: string) =>
    res.cookies.set(name, "", {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

  clear("shopify_access_token");
  clear("shopify_id_token");

  return res;
}
