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

  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (
    lineId: string,
    quantity: number
  ) => Promise<{ success: boolean; quantity: number }>;
  removeFromCart: (lineId: string) => Promise<void>;

  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

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

  async function addToCart(variantId: string, quantity: number) {
    setLoading(true);

    const res = await cartAddAction({ variantId, quantity });

    if (!res.ok || !res.cart) {
      console.error("Add to cart failed:", res.error);
      setLoading(false);
      return;
    }

    setCart(res.cart);
    setLoading(false);
  }

  async function updateQuantity(
    lineId: string,
    quantity: number
  ): Promise<{ success: boolean; quantity: number }> {
    if (!cart) return { success: false, quantity };

    setLoading(true);
    const res = await cartUpdateAction({ lineId, quantity });
    setLoading(false);

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

  async function removeFromCart(lineId: string) {
    if (!cart) return;

    setLoading(true);
    const res = await cartRemoveAction({ lineId });
    if (res.ok && res.cart) setCart(res.cart);
    setLoading(false);
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
