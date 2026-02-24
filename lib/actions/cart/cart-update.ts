"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import type { ShopifyCart } from "@/lib/shopify/types/cart";
import { normalizeCart } from "@/lib/normalizers/cart";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import { CART_LINES_UPDATE } from "@/lib/shopify/queries/cart";

interface CartLinesUpdateData {
    cartLinesUpdate: {
        cart: ShopifyCart | null;
    };
}

export interface CartUpdateInput {
    lineId: string;
    quantity: number;
}

export interface CartUpdateResult {
    ok: boolean;
    cart?: Cart;
    error?: string;
}

export async function cartUpdateAction(
    input: CartUpdateInput
): Promise<CartUpdateResult> {
    const { lineId, quantity } = input;

    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;
    const country = cookieStore.get("country")?.value || "CZ";

    if (!cartId) {
        return { ok: false, error: "No cartId found in cookies." };
    }

    if (!lineId) {
        return { ok: false, error: "lineId are required." };
    }

    if (quantity <= 0) {
        return { ok: false, error: "Quantity must be at least 1." };
    }

    try {
        const data = await shopifyFetch<CartLinesUpdateData>({
            query: CART_LINES_UPDATE,
            variables: {
                cartId,
                lines: [{ id: lineId, quantity }],
                country,
            },
        });

        const shopifyCart = data.cartLinesUpdate.cart;

        if (!shopifyCart) {
            return { ok: false, error: "Failed to update cart line." };
        }

        const cart = normalizeCart(shopifyCart);

        return { ok: true, cart: cart! };
    } catch (err) {
        console.error("cartUpdateLineAction error:", err);
        return { ok: false, error: "Unexpected error updating cart line." };
    }
}
