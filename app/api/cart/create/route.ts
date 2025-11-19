import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: `https://${process.env.SHOPIFY_STORE_DOMAIN}`,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-04",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_TOKEN!,
});

const CREATE_CART = `
  mutation cartCreate($country: CountryCode)
  @inContext(country: $country)
  {
    cartCreate {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
      }
    }
  }
`;

export async function POST() {

  // Read market from cookie
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";


  const res = await client.request(CREATE_CART, {
    variables: { country },
  });

  return NextResponse.json({
    cart: res.data.cartCreate.cart,
  });
}
