import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";

import type { ShopifyUserError, ShopifyAddress } from "@/lib/shopify/types";
import { CUSTOMER_UPDATE_ADDRESS } from "@/lib/queries/address";

// ----------------------------------------
// Mutation Response Type (matches Shopify)
// ----------------------------------------
interface AddressUpdateData {
  customerAddressUpdate: {
    customerAddress: ShopifyAddress | null;
    customerUserErrors: ShopifyUserError[];
  };
}

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
  const { id, address } = body;

  if (!id || !address) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields: id, address" },
      { status: 400 }
    );
  }

  // Shopify API Request
  const res = await shopifyFetch<AddressUpdateData>({
    query: CUSTOMER_UPDATE_ADDRESS,
    variables: {
      customerAccessToken: token,
      id,
      address,
    },
  });

  const { customerAddress, customerUserErrors } = res.customerAddressUpdate;

  // Handle Shopify validation errors
  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { ok: false, errors: customerUserErrors },
      { status: 400 }
    );
  }

  return NextResponse.json(
    { ok: true, address: customerAddress },
    { status: 200 }
  );
}
