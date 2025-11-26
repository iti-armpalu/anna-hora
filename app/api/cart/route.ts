import { NextResponse } from "next/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { cookies } from "next/headers";

const client = createStorefrontApiClient({
  storeDomain: `https://${process.env.SHOPIFY_STORE_URL}`,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-04",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_KEY!,
});

const GET_CART = `
  query cart(
    $cartId: ID!,
    $country: CountryCode
  ) 
   @inContext(country: $country) 
  {
    cart(id: $cartId) {
      id
      totalQuantity
      checkoutUrl

      cost {
        subtotalAmount {
          amount
          currencyCode
        }
        totalAmount {
          amount
          currencyCode
        }
      }

      lines(first: 20) {
        edges {
          node {
            id
            quantity

            merchandise {
              ... on ProductVariant {
                id
                title
                sku

                price {
                  amount
                  currencyCode
                }

                compareAtPrice {
                  amount
                  currencyCode
                }

                image { url }
                selectedOptions {
                  name
                  value
                }

                product {
                  title
                  featuredImage { url }
                }
              }
            }

            cost {
              amountPerQuantity {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cartId");

  // Read market from cookie
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  if (!cartId) {
    return NextResponse.json({ cart: null });
  }

  const res = await client.request(GET_CART, {
    variables: {
      cartId,
      country, // Pass region to Shopify 
    },
  });

  return NextResponse.json({
    cart: res.data.cart,
  });
}
