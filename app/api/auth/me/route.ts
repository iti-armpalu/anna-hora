// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getCustomer } from "@/lib/shopify/get-customer";

export async function GET() {
  const customer = await getCustomer();

  return NextResponse.json({
    authenticated: !!customer,
    customer,
  });
}
