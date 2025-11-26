import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete("shopify_customer_token");

  const logoutUrl = "https://shopify.com/authentication/98007613781/logout";

  return NextResponse.redirect(logoutUrl);
}
