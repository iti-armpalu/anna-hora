"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import type { ShopifyCart } from "@/lib/shopify/types/cart";
import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import { CART_LINES_REMOVE } from "@/lib/shopify/queries/cart";

interface CartLinesRemoveData {
  cartLinesRemove: {
    cart: ShopifyCart | null;
  };
}

export interface CartRemoveInput {
  lineId: string;
}

export interface CartRemoveResult {
  ok: boolean;
  cart?: Cart;
  error?: string;
}

export async function cartRemoveAction(
  input: CartRemoveInput
): Promise<CartRemoveResult> {
  const { lineId } = input;

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const country = cookieStore.get("country")?.value || "CZ";

  if (!cartId) {
    return { ok: false, error: "No cartId found in cookies." };
  }

  if (!lineId) {
    return { ok: false, error: "lineId are required." };
  }

  try {
    const data = await shopifyFetch<CartLinesRemoveData>({
      query: CART_LINES_REMOVE,
      variables: {
        cartId,
        lineIds: [lineId],
        country,
      },
    });

    const shopifyCart = data.cartLinesRemove.cart;

    if (!shopifyCart) {
      return { ok: false, error: "Failed to remove line from cart." };
    }

    const normalized = normalizeCart(shopifyCart);

    return { ok: true, cart: normalized! };
  } catch (err) {
    console.error("cartRemoveAction error:", err);
    return { ok: false, error: "Unexpected error removing cart line." };
  }
}
