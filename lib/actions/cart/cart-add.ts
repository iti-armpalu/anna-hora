"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import {
  CART_LINES_ADD,
  CART_CREATE,
} from "@/lib/shopify/queries/cart";

import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import type { ShopifyCart } from "@/lib/shopify/types/cart";


// ----------------------------------
// GraphQL Types
// ----------------------------------
interface CartCreateData {
  cartCreate: {
    cart: ShopifyCart | null;
  };
}

interface CartLinesAddData {
  cartLinesAdd: {
    cart: ShopifyCart | null;
  };
}

// ----------------------------------
// Action Types
// ----------------------------------
export type CartAddInput = {
  variantId: string;
  quantity: number;
};

export type CartAddResult = {
  ok: boolean;
  cart?: Cart;
  error?: string;
};

// ----------------------------------
// Server Action
// ----------------------------------
export async function cartAddAction(
  input: CartAddInput
): Promise<CartAddResult> {
  const { variantId, quantity } = input;

  if (!variantId || quantity <= 0) {
    return { ok: false, error: "Invalid input for adding to cart." };
  }

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  const country = cookieStore.get("country")?.value || "CZ";

  try {
    // ----------------------------------
    // STEP 1 — Create cart if missing
    // ----------------------------------
    if (!cartId) {
      const createRes = await shopifyFetch<CartCreateData>({
        query: CART_CREATE,
        variables: { country },
      });

      const newCart = createRes.cartCreate.cart;
      if (!newCart) {
        return { ok: false, error: "Failed to create cart." };
      }

      cartId = newCart.id;

      // Write cookie
      cookieStore.set("cartId", newCart.id, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
      });
    }

    // ----------------------------------
    // STEP 2 — Add item to cart
    // ----------------------------------
    const addRes = await shopifyFetch<CartLinesAddData>({
      query: CART_LINES_ADD,
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
        country,
      },
    });

    const shopifyCart = addRes.cartLinesAdd.cart;
    if (!shopifyCart) {
      return { ok: false, error: "Failed to update cart." };
    }

    const normalized = normalizeCart(shopifyCart);

    return {
      ok: true,
      cart: normalized!,
    };
  } catch (err) {
    console.error("cartAddAction ERROR:", err);
    return { ok: false, error: "Unexpected error while adding to cart." };
  }
}
