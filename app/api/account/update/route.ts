import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import { CUSTOMER_UPDATE_MUTATION } from "@/lib/shopify/queries/customer";
import type { ShopifyUserError, ShopifyCustomer } from "@/lib/shopify/types";


// ----------------------------------------
// Mutation Response Type
// ----------------------------------------
interface CustomerUpdateData {
  customerUpdate: {
    customer: ShopifyCustomer | null;
    customerUserErrors: ShopifyUserError[];
  };
}

// ----------------------------------------
// POST /api/account/update
// ----------------------------------------
export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("customerAccessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { ok: false, error: "Not authenticated" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { firstName, lastName, email, phone } = body;

  // Build the Shopify input object
  const customerUpdateInput: Record<string, string | null> = {
    firstName: firstName || null,
    lastName: lastName || null,
    email: email || null,
    phone: phone || null,
  };

  // Shopify API
  const res = await shopifyFetch<CustomerUpdateData>({
    query: CUSTOMER_UPDATE_MUTATION,
    variables: {
      customerAccessToken: token,
      customer: customerUpdateInput,
    },
  });

  const { customer, customerUserErrors } = res.customerUpdate;

  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { ok: false, errors: customerUserErrors },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, customer },
    { status: 200 }
  );
}
