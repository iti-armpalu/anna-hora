import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import { shopifyFetch } from "@/lib/shopify/fetch";
import { GraphQLResponse } from "@/lib/shopify/types/graphql";
import { ShopifyAddress } from "@/lib/shopify/types/address";
import { ShopifyUserError } from "@/lib/shopify/types/auth";
import { CUSTOMER_SET_DEFAULT_ADDRESS } from "@/lib/shopify/queries/address";



// ----------------------------------------
// Mutation Response Type (matches Shopify)
// ----------------------------------------
interface AddressSetDefaultData {
  customerDefaultAddressUpdate: {
    customer: {
      defaultAddress: ShopifyAddress | null;
    } | null;
    customerUserErrors: ShopifyUserError[];
  };
}

// ----------------------------------------
// POST /api/account/address/set-default
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
  const { addressId } = body;

  if (!addressId) {
    return NextResponse.json(
      { ok: false, error: "Missing required field: addressId" },
      { status: 400 }
    );
  }

  // Shopify API Request
  const res = await shopifyFetch<GraphQLResponse<AddressSetDefaultData>>({
    query: CUSTOMER_SET_DEFAULT_ADDRESS,
    variables: {
      customerAccessToken: token,
      addressId,
    },
  });

  const { customer, customerUserErrors } =
    res.data.customerDefaultAddressUpdate;

  // Handle Shopify semantic validation errors
  if (customerUserErrors.length > 0) {
    return NextResponse.json(
      { ok: false, errors: customerUserErrors },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      defaultAddress: customer?.defaultAddress ?? null,
    },
    { status: 200 }
  );
}
