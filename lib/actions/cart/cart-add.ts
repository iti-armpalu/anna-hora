"use server";

import { cookies } from "next/headers";
import { shopifyFetch } from "@/lib/shopify/fetch";

import {
  CART_LINES_ADD,
  CART_CREATE,
  CART_LINES_UPDATE,
  GET_CART,
} from "@/lib/shopify/queries/cart";
import { VARIANT_STOCK_QUERY } from "@/lib/shopify/queries/product";

import { normalizeCart } from "@/lib/normalizers/cart";
import { getStockStatus } from "@/lib/shopify/utils/stock-status";
import {
  PREORDER_LINE_ATTRIBUTE_KEY,
  getPreorderShippingText,
} from "@/lib/config/preorder";
import type { Cart } from "@/lib/shopify/types/cart-normalized";
import type { ShopifyCart, ShopifyCartAttribute } from "@/lib/shopify/types/cart";

// ----------------------------------
// Constants
// ----------------------------------
const CART_COOKIE = "cartId";
const CART_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const ERRORS = {
  invalidInput: "Invalid input for adding to cart.",
  soldOut: "Sorry — this size has just sold out.",
  createFailed: "We couldn't create your bag. Please try again.",
  addFailed: "We couldn't add this to your bag. Please try again.",
  unexpected: "Something went wrong. Please try again.",
} as const;

// ----------------------------------
// GraphQL Types
// ----------------------------------
interface UserError {
  message: string;
}

interface CartCreateData {
  cartCreate: { cart: ShopifyCart | null; userErrors: UserError[] };
}

interface CartLinesAddData {
  cartLinesAdd: { cart: ShopifyCart | null; userErrors: UserError[] };
}

interface CartLinesUpdateData {
  cartLinesUpdate: { cart: ShopifyCart | null; userErrors: UserError[] };
}

interface GetCartData {
  cart: ShopifyCart | null;
}

interface VariantStockData {
  node: {
    availableForSale: boolean;
    currentlyNotInStock: boolean;
    product: {
      preorderFabric: {
        reference: { leadTimeWeeks: { value: string | null } | null } | null;
      } | null;
    };
  } | null;
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
// Helpers
// ----------------------------------

/**
 * Checks stock at add time rather than trusting the status the page rendered with —
 * the page may be minutes old. Returns the line attributes for this add, or null if
 * the variant can't be bought.
 */
async function getLineAttributesForVariant(
  variantId: string
): Promise<ShopifyCartAttribute[] | null> {
  const { node: variant } = await shopifyFetch<VariantStockData>({
    query: VARIANT_STOCK_QUERY,
    variables: { variantId },
    cache: "no-store",
  });

  if (!variant) return null;

  const status = getStockStatus(variant);
  if (status === "sold_out") return null;
  if (status === "in_stock") return [];

  const leadTimeWeeks =
    variant.product.preorderFabric?.reference?.leadTimeWeeks?.value ?? null;

  return [
    { key: PREORDER_LINE_ATTRIBUTE_KEY, value: getPreorderShippingText(leadTimeWeeks) },
  ];
}

async function createCart(): Promise<ShopifyCart | null> {
  const { cartCreate } = await shopifyFetch<CartCreateData>({
    query: CART_CREATE,
    cache: "no-store",
  });

  if (cartCreate.userErrors.length || !cartCreate.cart) {
    console.error("cartCreate userErrors:", cartCreate.userErrors);
    return null;
  }

  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartCreate.cart.id, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: CART_COOKIE_MAX_AGE_SECONDS,
  });

  return cartCreate.cart;
}

/** Existing cart from the cookie, or a new one if there's none or it has expired. */
async function getOrCreateCart(): Promise<ShopifyCart | null> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;

  if (cartId) {
    const { cart } = await shopifyFetch<GetCartData>({
      query: GET_CART,
      variables: { cartId },
      cache: "no-store",
    });
    if (cart) return cart;
  }

  return createCart();
}

// ----------------------------------
// Server Action
// ----------------------------------
export async function cartAddAction(
  input: CartAddInput
): Promise<CartAddResult> {
  const { variantId, quantity } = input;

  if (!variantId || quantity <= 0) {
    return { ok: false, error: ERRORS.invalidInput };
  }

  try {
    // Independent requests — run in parallel
    const [attributes, cart] = await Promise.all([
      getLineAttributesForVariant(variantId),
      getOrCreateCart(),
    ]);

    if (!attributes) return { ok: false, error: ERRORS.soldOut };
    if (!cart) return { ok: false, error: ERRORS.createFailed };

    const existingLine = cart.lines.edges.find(
      ({ node }) => node.merchandise?.id === variantId
    )?.node;

    // Variant already in cart → update quantity (never add a duplicate line).
    // Attributes are re-sent so the pre-order note reflects current stock.
    if (existingLine) {
      const { cartLinesUpdate } = await shopifyFetch<CartLinesUpdateData>({
        query: CART_LINES_UPDATE,
        variables: {
          cartId: cart.id,
          lines: [
            { id: existingLine.id, quantity: existingLine.quantity + quantity, attributes },
          ],
        },
        cache: "no-store",
      });

      if (cartLinesUpdate.userErrors.length || !cartLinesUpdate.cart) {
        console.error("cartLinesUpdate userErrors:", cartLinesUpdate.userErrors);
        return { ok: false, error: ERRORS.addFailed };
      }

      return { ok: true, cart: normalizeCart(cartLinesUpdate.cart) };
    }

    const { cartLinesAdd } = await shopifyFetch<CartLinesAddData>({
      query: CART_LINES_ADD,
      variables: {
        cartId: cart.id,
        lines: [{ merchandiseId: variantId, quantity, attributes }],
      },
      cache: "no-store",
    });

    if (cartLinesAdd.userErrors.length || !cartLinesAdd.cart) {
      console.error("cartLinesAdd userErrors:", cartLinesAdd.userErrors);
      return { ok: false, error: ERRORS.addFailed };
    }

    return { ok: true, cart: normalizeCart(cartLinesAdd.cart) };
  } catch (err: unknown) {
    console.error(
      "cartAddAction error:",
      err instanceof Error ? err.message : err
    );
    return { ok: false, error: ERRORS.unexpected };
  }
}
