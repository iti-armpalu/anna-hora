"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

import { Cart } from "@/lib/shopify/types/cart-normalized";
import { Customer } from "@/lib/shopify/types/customer-normalized";

import { cartAddAction } from "@/lib/actions/cart/cart-add";
import { cartRemoveAction } from "@/lib/actions/cart/cart-remove";
import { cartUpdateAction } from "@/lib/actions/cart/cart-update";
import { getCartAction } from "@/lib/actions/cart/get-cart";
import { cartSetBuyerIdentityAction } from "@/lib/actions/cart/cart-set-buyer-identity";



type CartContextType = {
  cart: Cart | null;
  loading: boolean;

  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<{ success: boolean; quantity: number }>;
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
  initialCustomer: Customer | null;
  children: ReactNode;
};

export function CartProvider({
  initialCartId,
  initialCart,
  initialCustomer,
  children,
}: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [customer] = useState<Customer | null>(initialCustomer);

  const [loading, setLoading] = useState(false);

  // Drawer UI
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((prev) => !prev);

  useEffect(() => {

    if (!initialCartId) return;   // no cart cookie → nothing to load
    if (cart) return;             // already hydrated from SSR

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

  //   async function loadInitialCart() {
  //     const res = await getCartAction();
  //     if (active && res.ok && res.cart) {
  //       setCart(res.cart);
  //     }
  //   }

  //   loadInitialCart();

  //   return () => {
  //     active = false;
  //   };
  // }, [initialCartId]); // <-- this is now safe


  useEffect(() => {
    if (!customer || !cart) return;

    // Do NOT await — fire and forget. 
    // If it fails, cart still works.
    cartSetBuyerIdentityAction({
      customerAccessToken: customer.accessToken,
      email: customer.email,
      phone: customer.phone ?? undefined,
    });
  }, [customer?.accessToken, cart?.id]);

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
    // setIsOpen(true); // open drawer automatically
  }

  async function updateQuantity(
    lineId: string,
    quantity: number
  ): Promise<{ success: boolean; quantity: number }> {
    if (!cart) return { success: false, quantity };

    setLoading(true);

    // 🚀 Call server action instead of API route
    const res = await cartUpdateAction({ lineId, quantity });

    setLoading(false);

    if (!res.ok || !res.cart) {
      return { success: false, quantity };
    }

    const updatedCart = res.cart;
    setCart(updatedCart);

    // Find updated line
    const updatedLine = updatedCart.lines.find((l) => l.id === lineId);

    // If Shopify removed the line (quantity = 0)
    if (!updatedLine) {
      return { success: true, quantity: 0 };
    }

    // Shopify may reject invalid quantity and return original quantity
    const success = updatedLine.quantity === quantity;

    return {
      success,
      quantity: updatedLine.quantity,
    };
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



// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// // -----------------------------
// // TYPES
// // -----------------------------
// type CartLine = {
//   id: string;
//   quantity: number;
//   title: string;
//   variantId: string;
//   image?: string;
//   size?: string | null;

//   cost: {
//     amountPerQuantity: string;
//     subtotalAmount: string;
//     totalAmount: string;
//     currencyCode: string;
//   };
// };

// type CartType = {
//   id: string;
//   totalQuantity: number;
//   checkoutUrl: string;
//   cost: {
//     subtotalAmount: string;
//     totalAmount: string;
//     currencyCode: string;
//   };
//   lines: CartLine[];
// };

// type ShopifyCartLineEdge = {
//   node: {
//     id: string;
//     quantity: number;
//     merchandise?: {
//       id: string;
//       product?: {
//         title?: string;
//         featuredImage?: { url?: string };
//       };
//       image?: { url?: string };
//       selectedOptions?: { name: string; value: string }[];
//     };
//     cost: {
//       amountPerQuantity: { amount: string; currencyCode: string };
//       subtotalAmount: { amount: string; currencyCode: string };
//       totalAmount: { amount: string; currencyCode: string };
//     };
//   };
// };

// type ShopifySelectedOption = {
//   name: string;
//   value: string;
// };


// type CartContextType = {
//   cart: CartType | null;
//   loading: boolean;
//   addToCart: (variantId: string, quantity: number) => Promise<void>;
//   updateQuantity: (lineId: string, quantity: number) => Promise<{ success: boolean; quantity: number }>;
//   removeFromCart: (lineId: string) => Promise<void>;

//   // Cart Drawer UI state
//   isOpen: boolean;
//   open: () => void;
//   close: () => void;
//   toggle: () => void;
// };



// // -----------------------------
// // CONTEXT SETUP
// // -----------------------------

// const CartContext = createContext<CartContextType | null>(null);

// export function useCart() {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
//   return ctx;
// }

// // -----------------------------
// // NORMALIZER — converts Shopify shape → Frontend shape
// // -----------------------------
// function normalizeCart(shopifyCart: unknown): CartType | null {
//   if (!shopifyCart || typeof shopifyCart !== "object") return null;

//   // Cast to a minimal internal type (safe & ESLint approved)
//   const cart = shopifyCart as {
//     id: string;
//     totalQuantity: number;
//     checkoutUrl: string;
//     cost?: {
//       subtotalAmount?: { amount: string; currencyCode: string };
//       totalAmount?: { amount: string; currencyCode: string };
//     };
//     lines?: { edges: ShopifyCartLineEdge[] };
//   };

//   return {
//     id: cart.id,
//     totalQuantity: cart.totalQuantity,
//     checkoutUrl: cart.checkoutUrl,

//     cost: {
//       subtotalAmount: cart.cost?.subtotalAmount?.amount ?? "0.00",
//       totalAmount: cart.cost?.totalAmount?.amount ?? "0.00",
//       currencyCode: cart.cost?.subtotalAmount?.currencyCode ?? "USD",
//     },

//     lines:
//       cart.lines?.edges?.map((edge: ShopifyCartLineEdge) => {
//         const line = edge.node;

//         // Extract size option safely
//         const sizeOption = line.merchandise?.selectedOptions?.find(
//           (opt: ShopifySelectedOption) =>
//             opt.name?.toLowerCase() === "size"
//         );

//         return {
//           id: line.id,
//           quantity: line.quantity,
//           title: line.merchandise?.product?.title || "",
//           variantId: line.merchandise?.id ?? "",
//           size: sizeOption?.value ?? null,

//           image:
//             line.merchandise?.image?.url ??
//             line.merchandise?.product?.featuredImage?.url ??
//             "",

//           cost: {
//             amountPerQuantity: line.cost.amountPerQuantity.amount,
//             subtotalAmount: line.cost.subtotalAmount.amount,
//             totalAmount: line.cost.totalAmount.amount,
//             currencyCode: line.cost.totalAmount.currencyCode,
//           },
//         };
//       }) ?? [],
//   };
// }


// // -----------------------------
// // PROVIDER
// // -----------------------------
// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartType | null>(null);
//   const [loading, setLoading] = useState(false);

//   // UI State
//   const [isOpen, setIsOpen] = useState(false);

//   const open = () => setIsOpen(true);
//   const close = () => setIsOpen(false);
//   const toggle = () => setIsOpen((prev) => !prev);

//   // -----------------------------
//   // HELPERS
//   // -----------------------------
//   async function loadCart(cartId: string) {
//     const res = await fetch(`/api/cart?cartId=${cartId}`);
//     const data = await res.json();
//     setCart(normalizeCart(data.cart));
//   }

//   async function createCart() {
//     const res = await fetch("/api/cart/create", { method: "POST" });
//     const data = await res.json();

//     const newId = data.cart.id;
//     localStorage.setItem("cartId", newId);

//     await loadCart(newId);
//     return newId;
//   }

//   async function getOrCreateCartId() {
//     const saved = localStorage.getItem("cartId");
//     if (saved) return saved;
//     return await createCart();
//   }

//   // -----------------------------
//   // MUTATIONS
//   // -----------------------------
//   async function addToCart(variantId: string, quantity: number) {
//     setLoading(true);

//     const cartId = await getOrCreateCartId();

//     const res = await fetch("/api/cart/add", {
//       method: "POST",
//       body: JSON.stringify({
//         cartId,
//         variantId,
//         quantity,
//       }),
//     });

//     const data = await res.json();
//     setCart(normalizeCart(data.cart));

//     setLoading(false);
//   }

//   async function updateQuantity(
//     lineId: string,
//     quantity: number
//   ): Promise<{ success: boolean; quantity: number }> {
//     if (!cart) return { success: false, quantity };

//     setLoading(true);

//     const res = await fetch("/api/cart/update", {
//       method: "POST",
//       body: JSON.stringify({
//         cartId: cart.id,
//         lineId,
//         quantity,
//       }),
//     });

//     const data = await res.json();
//     const normalized = normalizeCart(data.cart);

//     setCart(normalized);
//     setLoading(false);

//     // CASE 1: Shopify returned null cart
//     if (!normalized || !normalized.lines) {
//       return { success: false, quantity };
//     }

//     // Find the updated line
//     const updatedLine = normalized.lines.find((l) => l.id === lineId);

//     // CASE 2: Line removed (quantity 0)
//     if (!updatedLine) {
//       return { success: true, quantity: 0 };
//     }

//     // CASE 3: Shopify rejected the update
//     // (quantity did NOT change)
//     const success = updatedLine.quantity === quantity;

//     return {
//       success,
//       quantity: updatedLine.quantity,
//     };
//   }



//   async function removeFromCart(lineId: string) {
//     if (!cart) return;

//     setLoading(true);

//     const res = await fetch("/api/cart/remove", {
//       method: "POST",
//       body: JSON.stringify({
//         cartId: cart.id,
//         lineId,
//       }),
//     });

//     const data = await res.json();
//     setCart(normalizeCart(data.cart));

//     setLoading(false);
//   }

//   // -----------------------------
//   // LOAD CART ON FIRST VISIT
//   // -----------------------------
//   useEffect(() => {
//     const saved = localStorage.getItem("cartId");
//     if (saved) {
//       loadCart(saved);
//     } else {
//       createCart();
//     }
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         loading,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         isOpen,
//         open,
//         close,
//         toggle,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
