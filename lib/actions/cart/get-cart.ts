"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import { GET_CART } from "@/lib/shopify/queries/cart";
import type { ShopifyCart } from "@/lib/shopify/types/cart";
import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";


interface GetCartQueryResult {
  cart: ShopifyCart | null;
}

export type GetCartResult = {
  ok: boolean;
  cart: Cart | null;
};

export async function getCartAction(): Promise<GetCartResult> {
  const cookieStore = await cookies();

  const cartId = cookieStore.get("cartId")?.value || null;
  const country = cookieStore.get("country")?.value || "CZ";

  // --------------------------------------------
  // No cart ID → user has no cart yet
  // --------------------------------------------
  if (!cartId) {
    return {
      ok: true,
      cart: null,
    };
  }

  try {
    const data = await shopifyFetch<GetCartQueryResult>({
      query: GET_CART,
      variables: {
        cartId,
        country,
      },
    });

    // Shopify returned no cart (maybe cart expired)
    if (!data.cart) {
      return {
        ok: true,
        cart: null,
      };
    }

    // Normalize the Shopify response into your Cart type
    const normalized = normalizeCart(data.cart);

    return {
      ok: true,
      cart: normalized,
    };
  } catch (err) {
    console.error("getCartAction error:", err);

    // Fail gracefully → do NOT break SSR
    return {
      ok: false,
      cart: null,
    };
  }
}
