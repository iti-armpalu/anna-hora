"use client";

import { createContext, useContext } from "react";

type CartShippingContextValue = {
  threshold: number;
  currencyCode?: string;
};

const CartShippingContext =
  createContext<CartShippingContextValue | null>(null);

export function CartShippingProvider({
  threshold,
  currencyCode,
  children,
}: CartShippingContextValue & { children: React.ReactNode }) {
  return (
    <CartShippingContext.Provider
      value={{ threshold, currencyCode }}
    >
      {children}
    </CartShippingContext.Provider>
  );
}

export function useCartShipping() {
  const context = useContext(CartShippingContext);

  if (!context) {
    throw new Error(
      "useCartShipping must be used within CartShippingProvider"
    );
  }

  return context;
}
