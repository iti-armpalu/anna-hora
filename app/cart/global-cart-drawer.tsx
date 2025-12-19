"use client";

import { useCart } from "@/context/cart-context";
import { CartDrawer } from "./cart-drawer";

export function GlobalCartDrawer() {
  const { isOpen, close } = useCart();

  return (
    <CartDrawer
      isOpen={isOpen}
      onClose={close}
    />
  );
}
