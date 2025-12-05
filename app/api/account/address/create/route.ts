import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { CUSTOMER_ADD_ADDRESS } from "@/lib/shopify/queries/address";
import { ShopifyAddress } from "@/lib/shopify/types/address";
import { ShopifyUserError } from "@/lib/shopify/types/auth";
import { shopifyFetch } from "@/lib/shopify";

// ------------------------------
// Mutation Response Type
// ------------------------------
interface AddressCreateData {
  customerAddressCreate: {
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
  const address = body.address;

  if (!address) {
    return NextResponse.json(
      { ok: false, error: "Missing address object" },
      { status: 400 }
    );
  }

  // ❗ shopifyFetch returns ONLY the inner `data` object
  const res = await shopifyFetch<AddressCreateData>({
    query: CUSTOMER_ADD_ADDRESS,
    variables: {
      customerAccessToken: token,
      address,
    },
  });

  // ❗ Access correctly without `.data`
  const { customerAddress, customerUserErrors } =
    res.customerAddressCreate;

  console.log("BODY:", body);
  console.log("TOKEN:", token);
  console.log("SHOPIFY RESPONSE:", res);

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
