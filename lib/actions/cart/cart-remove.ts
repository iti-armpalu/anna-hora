// lib/actions/cart/cart-remove.ts
"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { normalizeCart } from "@/lib/normalizers/cart";

import type { ShopifyCart } from "@/lib/shopify/types/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";

import { CART_LINES_REMOVE } from "@/lib/shopify/queries/cart";

type ShopifyUserError = { field: string[]; message: string };

interface CartLinesRemoveData {
  cartLinesRemove: {
    cart: ShopifyCart | null;
    userErrors: ShopifyUserError[];
  };
}

export interface CartRemoveInput {
  cartId: string;   // IMPORTANT: pass cart.id from UI
  lineId: string;
}

export interface CartRemoveResult {
  ok: boolean;
  cart?: Cart;
  error?: string;
}

function isValidShopifyGid(value: string) {
  return typeof value === "string" && value.startsWith("gid://shopify/");
}

export async function cartRemoveAction(
  input: CartRemoveInput
): Promise<CartRemoveResult> {
  const { cartId, lineId } = input;

  if (!cartId || !isValidShopifyGid(cartId)) {
    return { ok: false, error: "Missing or invalid cartId." };
  }

  if (!lineId || !isValidShopifyGid(lineId)) {
    return { ok: false, error: "Missing or invalid lineId." };
  }

  const cookieStore = await cookies();
  const country = cookieStore.get("shippingCountry")?.value || "CZ";

  // Keep cookie in sync with the cart currently used in UI
  const cookieCartId = cookieStore.get("cartId")?.value;
  if (cookieCartId !== cartId) {
    cookieStore.set("cartId", cartId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  try {
    const data = await shopifyFetch<CartLinesRemoveData>({
      query: CART_LINES_REMOVE,
      variables: {
        cartId,
        lineIds: [lineId],
        country,
      },
      cache: "no-store",
      revalidate: 0,
    });

    const payload = data.cartLinesRemove;

    if (payload.userErrors?.length) {
      const msg =
        payload.userErrors[0]?.message ?? "Shopify error removing cart line.";
      console.error("[cartRemoveAction] userErrors", payload.userErrors);
      return { ok: false, error: msg };
    }

    if (!payload.cart) {
      return { ok: false, error: "Shopify returned no cart from cartLinesRemove." };
    }

    return { ok: true, cart: normalizeCart(payload.cart) };
  } catch (err) {
    console.error("cartRemoveAction error:", err);
    return { ok: false, error: "Unexpected error removing cart line." };
  }
}