"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// -----------------------------
// TYPES
// -----------------------------
type CartLine = {
  id: string;
  quantity: number;
  title: string;
  variantId: string;
  image?: string;
  size?: string | null;

  cost: {
    amountPerQuantity: string;
    subtotalAmount: string;
    totalAmount: string;
    currencyCode: string;
  };
};

type CartType = {
  id: string;
  totalQuantity: number;
  checkoutUrl: string;
  cost: {
    subtotalAmount: string;
    totalAmount: string;
    currencyCode: string;
  };
  lines: CartLine[];
};

type ShopifyCartLineEdge = {
  node: {
    id: string;
    quantity: number;
    merchandise?: {
      id: string;
      product?: {
        title?: string;
        featuredImage?: { url?: string };
      };
      image?: { url?: string };
      selectedOptions?: { name: string; value: string }[];
    };
    cost: {
      amountPerQuantity: { amount: string; currencyCode: string };
      subtotalAmount: { amount: string; currencyCode: string };
      totalAmount: { amount: string; currencyCode: string };
    };
  };
};

type ShopifySelectedOption = {
  name: string;
  value: string;
};


type CartContextType = {
  cart: CartType | null;
  loading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
};



// -----------------------------
// CONTEXT SETUP
// -----------------------------

const CartContext = createContext<CartContextType | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

// -----------------------------
// NORMALIZER — converts Shopify shape → Frontend shape
// -----------------------------
function normalizeCart(shopifyCart: unknown): CartType | null {
  if (!shopifyCart || typeof shopifyCart !== "object") return null;

  // Cast to a minimal internal type (safe & ESLint approved)
  const cart = shopifyCart as {
    id: string;
    totalQuantity: number;
    checkoutUrl: string;
    cost?: {
      subtotalAmount?: { amount: string; currencyCode: string };
      totalAmount?: { amount: string; currencyCode: string };
    };
    lines?: { edges: ShopifyCartLineEdge[] };
  };

  return {
    id: cart.id,
    totalQuantity: cart.totalQuantity,
    checkoutUrl: cart.checkoutUrl,

    cost: {
      subtotalAmount: cart.cost?.subtotalAmount?.amount ?? "0.00",
      totalAmount: cart.cost?.totalAmount?.amount ?? "0.00",
      currencyCode: cart.cost?.subtotalAmount?.currencyCode ?? "USD",
    },

    lines:
      cart.lines?.edges?.map((edge: ShopifyCartLineEdge) => {
        const line = edge.node;

        // Extract size option safely
        const sizeOption = line.merchandise?.selectedOptions?.find(
          (opt: ShopifySelectedOption) =>
            opt.name?.toLowerCase() === "size"
        );

        return {
          id: line.id,
          quantity: line.quantity,
          title: line.merchandise?.product?.title || "",
          variantId: line.merchandise?.id ?? "",
          size: sizeOption?.value ?? null,

          image:
            line.merchandise?.image?.url ??
            line.merchandise?.product?.featuredImage?.url ??
            "",

          cost: {
            amountPerQuantity: line.cost.amountPerQuantity.amount,
            subtotalAmount: line.cost.subtotalAmount.amount,
            totalAmount: line.cost.totalAmount.amount,
            currencyCode: line.cost.totalAmount.currencyCode,
          },
        };
      }) ?? [],
  };
}


// -----------------------------
// PROVIDER
// -----------------------------
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // HELPERS
  // -----------------------------
  async function loadCart(cartId: string) {
    const res = await fetch(`/api/cart?cartId=${cartId}`);
    const data = await res.json();
    setCart(normalizeCart(data.cart));
  }

  async function createCart() {
    const res = await fetch("/api/cart/create", { method: "POST" });
    const data = await res.json();

    const newId = data.cart.id;
    localStorage.setItem("cartId", newId);

    await loadCart(newId);
    return newId;
  }

  async function getOrCreateCartId() {
    const saved = localStorage.getItem("cartId");
    if (saved) return saved;
    return await createCart();
  }

  // -----------------------------
  // MUTATIONS
  // -----------------------------
  async function addToCart(variantId: string, quantity: number) {
    setLoading(true);

    const cartId = await getOrCreateCartId();

    const res = await fetch("/api/cart/add", {
      method: "POST",
      body: JSON.stringify({
        cartId,
        variantId,
        quantity,
      }),
    });

    const data = await res.json();
    setCart(normalizeCart(data.cart));

    setLoading(false);
  }

  async function updateQuantity(lineId: string, quantity: number) {
    if (!cart) return;

    setLoading(true);

    const res = await fetch("/api/cart/update", {
      method: "POST",
      body: JSON.stringify({
        cartId: cart.id,
        lineId,
        quantity,
      }),
    });

    const data = await res.json();
    setCart(normalizeCart(data.cart));

    setLoading(false);
  }

  async function removeFromCart(lineId: string) {
    if (!cart) return;

    setLoading(true);

    const res = await fetch("/api/cart/remove", {
      method: "POST",
      body: JSON.stringify({
        cartId: cart.id,
        lineId,
      }),
    });

    const data = await res.json();
    setCart(normalizeCart(data.cart));

    setLoading(false);
  }

  // -----------------------------
  // LOAD CART ON FIRST VISIT
  // -----------------------------
  useEffect(() => {
    const saved = localStorage.getItem("cartId");
    if (saved) {
      loadCart(saved);
    } else {
      createCart();
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
