import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";
import { CUSTOMER_DELETE_ADDRESS } from "@/lib/queries/address";
import type { ShopifyUserError } from "@/lib/shopify/types/auth";


// ----------------------------------------
// Mutation Response Type (matches Shopify)
// ----------------------------------------
interface AddressDeleteData {
  customerAddressDelete: {
    deletedCustomerAddressId: string | null;
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
  const { id } = body;

  if (!id) {
    return NextResponse.json(
      { ok: false, error: "Missing required field: id" },
      { status: 400 }
    );
  }

  // Shopify API Request
  const res = await shopifyFetch<AddressDeleteData>({
    query: CUSTOMER_DELETE_ADDRESS,
    variables: {
      customerAccessToken: token,
      id,
    },
  });

  const {
    deletedCustomerAddressId,
    customerUserErrors,
  } = res.customerAddressDelete;

  // Shopify validation errors
  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { ok: false, errors: customerUserErrors },
      { status: 400 }
    );
  }

  // Successful deletion
  return NextResponse.json(
    {
      ok: true,
      deletedId: deletedCustomerAddressId,
    },
    { status: 200 }
  );
}
