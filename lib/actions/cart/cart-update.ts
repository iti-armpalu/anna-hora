// lib/actions/cart/cart-update.ts
"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { normalizeCart } from "@/lib/normalizers/cart";

import type { ShopifyCart } from "@/lib/shopify/types/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";

import { CART_LINES_UPDATE } from "@/lib/shopify/queries/cart";

type ShopifyUserError = { field: string[]; message: string };

interface CartLinesUpdateData {
  cartLinesUpdate: {
    cart: ShopifyCart | null;
    userErrors: ShopifyUserError[];
  };
}

export interface CartUpdateInput {
  cartId: string; // IMPORTANT: pass the cart id the UI is currently using
  lineId: string;
  quantity: number;
}

export interface CartUpdateResult {
  ok: boolean;
  cart?: Cart;
  error?: string;
}

function isValidShopifyGid(value: string) {
  // Basic sanity check; not strict parsing
  return typeof value === "string" && value.startsWith("gid://shopify/");
}

export async function cartUpdateAction(
  input: CartUpdateInput
): Promise<CartUpdateResult> {
  const { cartId, lineId, quantity } = input;

  if (!cartId || !isValidShopifyGid(cartId)) {
    return { ok: false, error: "Missing or invalid cartId." };
  }

  if (!lineId || !isValidShopifyGid(lineId)) {
    return { ok: false, error: "Missing or invalid lineId." };
  }

  if (!Number.isInteger(quantity) || quantity < 1) {
    return { ok: false, error: "Quantity must be an integer >= 1." };
  }

  const cookieStore = await cookies();
  const country = cookieStore.get("shippingCountry")?.value || "CZ";

  // Keep cookie in sync with the cart the UI is using.
  // This prevents mismatch after OIDC redirects / multi-tab / etc.
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
    const data = await shopifyFetch<CartLinesUpdateData>({
      query: CART_LINES_UPDATE,
      variables: {
        cartId,
        lines: [{ id: lineId, quantity }],
        country,
      },
      cache: "no-store",
      revalidate: 0,
    });

    const payload = data.cartLinesUpdate;

    if (payload.userErrors?.length) {
      // Don't overwrite client cart with empty/incorrect data on Shopify errors
      const msg = payload.userErrors[0]?.message ?? "Shopify error updating cart.";
      console.error("[cartUpdateAction] userErrors", payload.userErrors);
      return { ok: false, error: msg };
    }

    if (!payload.cart) {
      return { ok: false, error: "Shopify returned no cart from cartLinesUpdate." };
    }

    return { ok: true, cart: normalizeCart(payload.cart) };
  } catch (err) {
    console.error("cartUpdateAction error:", err);
    return { ok: false, error: "Unexpected error updating cart line." };
  }
}