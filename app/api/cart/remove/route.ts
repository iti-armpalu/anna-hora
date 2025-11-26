import { NextResponse } from "next/server";
import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import { cookies } from "next/headers";

const client = createStorefrontApiClient({
  storeDomain: `https://${process.env.SHOPIFY_STORE_URL}`,
  apiVersion: process.env.SHOPIFY_API_VERSION ?? "2025-04",
  publicAccessToken: process.env.SHOPIFY_STOREFRONT_API_KEY!,
});

const CART_LINES_REMOVE = `
  mutation cartLinesRemove(
    $cartId: ID!, 
    $lineIds: [ID!]!, 
    $country: CountryCode
  ) 
  @inContext(country: $country)
  {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
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
  }
`;

export async function POST(req: Request) {
  const { cartId, lineId } = await req.json();

  // Read market from cookie
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  const res = await client.request(CART_LINES_REMOVE, {
    variables: {
      cartId,
      lineIds: [lineId],
      country, // Pass region to Shopify
    },
  });

  return NextResponse.json({
    cart: res.data.cartLinesRemove.cart,
  });
}
