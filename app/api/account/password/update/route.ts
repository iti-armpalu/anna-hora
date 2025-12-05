import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";
import { ShopifyAccessToken, ShopifyUserError } from "@/lib/shopify/types/auth";
import { CUSTOMER_PASSWORD_UPDATE_MUTATION } from "@/lib/shopify/queries/auth";


interface PasswordUpdateData {
  customerUpdatePassword: {
    customerUserErrors: ShopifyUserError[];
    customerAccessToken: ShopifyAccessToken | null;
  };
}

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const oldToken = cookieStore.get("customerAccessToken")?.value;

  if (!oldToken) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { password, passwordConfirm } = await req.json();

  if (!password || !passwordConfirm) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  const res = await shopifyFetch<PasswordUpdateData>({
    query: CUSTOMER_PASSWORD_UPDATE_MUTATION,
    variables: {
      customerAccessToken: oldToken,
      password,
      passwordConfirm,
    },
  });

  const { customerUserErrors, customerAccessToken } =
    res.customerUpdatePassword;

  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { ok: false, errors: customerUserErrors },
      { status: 400 }
    );
  }

  if (!customerAccessToken) {
    return NextResponse.json(
      { ok: false, error: "Password update failed (no token returned)" },
      { status: 500 }
    );
  }

  // Replace token in cookie
  cookieStore.set("customerAccessToken", customerAccessToken.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(customerAccessToken.expiresAt),
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
