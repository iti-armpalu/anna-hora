"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

import { Cart } from "@/lib/shopify/types/cart-normalized";

import { cartAddAction } from "@/lib/actions/cart/cart-add";
import { cartRemoveAction } from "@/lib/actions/cart/cart-remove";
import { cartUpdateAction } from "@/lib/actions/cart/cart-update";
import { getCartAction } from "@/lib/actions/cart/get-cart";

type CartContextType = {
  cart: Cart | null;
  loading: boolean;

  addToCart: (variantId: string, quantity: number) => Promise<AddToCartResult>;
  updateQuantity: (
    lineId: string,
    quantity: number
  ) => Promise<{ success: boolean; quantity: number }>;
  removeFromCart: (lineId: string) => Promise<{ ok: boolean }>;

  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export type AddToCartResult = { ok: boolean; error?: string };

const ADD_TO_CART_FALLBACK_ERROR = "Something went wrong. Please try again.";

export const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}

type CartProviderProps = {
  initialCartId: string | null;
  initialCart: Cart | null;
  children: ReactNode;
};

export function CartProvider({
  initialCartId,
  initialCart,
  children,
}: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [loading, setLoading] = useState(false);

  // Drawer UI
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!initialCartId) return; // no cart cookie → nothing to load
    if (cart) return; // already hydrated from SSR

    let active = true;

    async function load() {
      const res = await getCartAction();
      if (active && res.ok && res.cart) {
        setCart(res.cart);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, [initialCartId, cart]);

  // -----------------------------
  // Cart Mutations (Server Actions)
  // -----------------------------

  // Returns the outcome so the caller can show the right message — never assume success
  async function addToCart(
    variantId: string,
    quantity: number
  ): Promise<AddToCartResult> {
    setLoading(true);
    try {
      const res = await cartAddAction({ variantId, quantity });
      if (!res.ok || !res.cart) {
        return { ok: false, error: res.error ?? ADD_TO_CART_FALLBACK_ERROR };
      }
      setCart(res.cart);
      return { ok: true };
    } catch (err: unknown) {
      // Network failure reaching the server action itself
      console.error("addToCart error:", err instanceof Error ? err.message : err);
      return { ok: false, error: ADD_TO_CART_FALLBACK_ERROR };
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(
    lineId: string,
    quantity: number
  ): Promise<{ success: boolean; quantity: number }> {
    if (!cart) return { success: false, quantity };

    setLoading(true);
    let res: Awaited<ReturnType<typeof cartUpdateAction>>;
    try {
      res = await cartUpdateAction({ cartId: cart.id, lineId, quantity });
    } catch (err: unknown) {
      // Network failure reaching the server action — report it, never leave the cart locked
      console.error("updateQuantity error:", err instanceof Error ? err.message : err);
      return { success: false, quantity };
    } finally {
      setLoading(false);
    }

    if (!res.ok || !res.cart) {
      return { success: false, quantity };
    }

    const updatedCart = res.cart;
    setCart(updatedCart);

    const updatedLine = updatedCart.lines.find((l) => l.id === lineId);

    if (!updatedLine) {
      return { success: true, quantity: 0 };
    }

    const success = updatedLine.quantity === quantity;

    return { success, quantity: updatedLine.quantity };
  }

  async function removeFromCart(lineId: string): Promise<{ ok: boolean }> {
    if (!cart) return { ok: false };

    setLoading(true);
    try {
      const res = await cartRemoveAction({ cartId: cart.id, lineId });
      if (!res.ok || !res.cart) return { ok: false };
      setCart(res.cart);
      return { ok: true };
    } catch (err: unknown) {
      console.error("removeFromCart error:", err instanceof Error ? err.message : err);
      return { ok: false };
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        isOpen,
        open,
        close,
        toggle,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
