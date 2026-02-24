"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";
import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import type { ShopifyCart } from "@/lib/shopify/types/cart";
import { CART_BUYER_IDENTITY_UPDATE } from "@/lib/shopify/queries/cart";

type CartBuyerIdentityUpdateData = {
  cartBuyerIdentityUpdate: {
    cart: ShopifyCart | null;
    userErrors: { field: string[]; message: string }[];
  };
};

export type SetBuyerIdentityInput = {
  email?: string;
  phone?: string;
};

export type SetBuyerIdentityResult = {
  ok: boolean;
  cart?: Cart;
  error?: string;
};

export async function cartSetBuyerIdentityAction(
  input: SetBuyerIdentityInput = {}
): Promise<SetBuyerIdentityResult> {
  const { email, phone } = input;

  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const country = cookieStore.get("country")?.value || "CZ";

  if (!cartId) return { ok: false, error: "Cart not found." };

  try {
    const res = await shopifyFetch<CartBuyerIdentityUpdateData>({
      query: CART_BUYER_IDENTITY_UPDATE,
      variables: {
        cartId,
        buyerIdentity: {
          ...(email ? { email } : {}),
          ...(phone ? { phone } : {}),
          // IMPORTANT: no customerAccessToken here in the OIDC setup
        },
        country,
      },
    });

    const shopifyCart = res.cartBuyerIdentityUpdate.cart;
    if (!shopifyCart) {
      return {
        ok: false,
        error: res.cartBuyerIdentityUpdate.userErrors?.[0]?.message ?? "Unknown error",
      };
    }

    return { ok: true, cart: normalizeCart(shopifyCart)! };
  } catch (err) {
    console.error("cartSetBuyerIdentityAction ERROR:", err);
    return { ok: false, error: "Failed to update buyer identity." };
  }
}
