import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.redirect("/");

  res.cookies.delete("shopify_customer_token");
  res.cookies.delete("shopify_customer_access_token");

  return res;
}
