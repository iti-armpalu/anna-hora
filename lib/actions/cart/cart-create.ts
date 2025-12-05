"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import { CART_CREATE } from "@/lib/shopify/queries/cart";
import type { ShopifyCart } from "@/lib/shopify/types/cart";
import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";


interface CartCreateData {
  cartCreate: {
    cart: ShopifyCart | null;
  };
}

export type CartCreateResult = {
  ok: boolean;
  cart: Cart | null;
  error?: string;
};

export async function cartCreateAction(): Promise<CartCreateResult> {
  const cookieStore = await cookies();
  const country = cookieStore.get("country")?.value || "GB";

  try {
    const data = await shopifyFetch<CartCreateData>({
      query: CART_CREATE,
      variables: { country },
    });

    const shopifyCart = data.cartCreate.cart;

    if (!shopifyCart) {
      return { ok: false, cart: null, error: "Failed to create cart." };
    }

    cookieStore.set("cartId", shopifyCart.id, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
      // Shopify carts never expire automatically, so 30 days is safe
      maxAge: 60 * 60 * 24 * 30
    });

    return {
      ok: true,
      cart: normalizeCart(shopifyCart),
    };
  } catch (err) {
    console.error("cartCreateAction error:", err);
    return { ok: false, cart: null, error: "Unexpected error creating cart." };
  }
}
