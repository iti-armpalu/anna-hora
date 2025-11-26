// app/api/auth/logout/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const tenantId = process.env.SHOPIFY_TENANT_ID!;

  const cookieStore = await cookies();
  cookieStore.delete("shopify_customer_token");

  const logoutUrl = `https://shopify.com/authentication/${tenantId}/logout`;

  return NextResponse.redirect(logoutUrl);
}
