// Clear the cookie and redirect to Shopify logout endpoint.

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    cookieStore.delete("shopify_customer_token");

    const logoutUrl = `https://${process.env.SHOPIFY_STORE_DOMAIN}/auth/logout`;

    return NextResponse.redirect(logoutUrl);
}
