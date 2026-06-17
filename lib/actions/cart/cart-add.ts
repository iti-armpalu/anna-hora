"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import {
  CART_LINES_ADD,
  CART_CREATE,
  CART_LINES_UPDATE,
  GET_CART,
} from "@/lib/shopify/queries/cart";

import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import type { ShopifyCart } from "@/lib/shopify/types/cart";

// ----------------------------------
// GraphQL Types
// ----------------------------------
interface CartCreateData {
  cartCreate: { cart: ShopifyCart | null };
}

interface CartLinesAddData {
  cartLinesAdd: { cart: ShopifyCart | null };
}

interface CartLinesUpdateData {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: { message: string }[];
  };
}

interface GetCartData {
  cart: ShopifyCart | null;
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
  const country = cookieStore.get("shippingCountry")?.value || "CZ";

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
      if (!newCart) return { ok: false, error: "Failed to create cart." };

      cartId = newCart.id;

      cookieStore.set("cartId", newCart.id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      });
    }

    // ----------------------------------
    // STEP 2 — Check if variant already exists in cart
    // ----------------------------------
    const cartData = await shopifyFetch<GetCartData>({
      query: GET_CART,
      variables: { cartId, country },
      cache: "no-store",
    });

    const existingLine = cartData.cart?.lines.edges.find(
      ({ node }) => node.merchandise?.id === variantId
    )?.node;

    // ----------------------------------
    // STEP 3a — Variant exists → update quantity
    // ----------------------------------
    if (existingLine) {
      const updateRes = await shopifyFetch<CartLinesUpdateData>({
        query: CART_LINES_UPDATE,
        variables: {
          cartId,
          lines: [{ id: existingLine.id, quantity: existingLine.quantity + quantity }],
          country,
        },
        cache: "no-store",
      });

      const userErrors = updateRes.cartLinesUpdate?.userErrors ?? [];
      if (userErrors.length) {
        return { ok: false, error: userErrors[0]?.message ?? "Failed to update cart quantity." };
      }

      const shopifyCart = updateRes.cartLinesUpdate?.cart;
      if (!shopifyCart) return { ok: false, error: "Failed to update cart quantity." };

      return { ok: true, cart: normalizeCart(shopifyCart) };
    }

    // ----------------------------------
    // STEP 3b — Variant is new → add line
    // ----------------------------------
    const addRes = await shopifyFetch<CartLinesAddData>({
      query: CART_LINES_ADD,
      variables: {
        cartId,
        lines: [{ merchandiseId: variantId, quantity }],
        country,
      },
    });

    const shopifyCart = addRes.cartLinesAdd?.cart;
    if (!shopifyCart) return { ok: false, error: "Failed to add to cart." };

    return { ok: true, cart: normalizeCart(shopifyCart) };

  } catch (err) {
    console.error("cartAddAction ERROR:", err);
    return { ok: false, error: "Unexpected error while adding to cart." };
  }
}