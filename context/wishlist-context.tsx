"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

// ---------------------------------------------------
// Types
// ---------------------------------------------------

export interface WishlistItem {
  id: string;
  title: string;
  price: string;
  currencyCode: string;
  image: string;
  size?: string;
  addedAt: number;
}

interface WishlistContextType {
  items: WishlistItem[];
  isInWishlist: (variantId: string) => boolean;
  add: (item: Omit<WishlistItem, "addedAt">) => void;
  remove: (variantId: string) => void;
  clear: () => void;
}

// ---------------------------------------------------
// Context
// ---------------------------------------------------

const WishlistContext = createContext<WishlistContextType | null>(null);

// ---------------------------------------------------
// Local Storage Helpers
// ---------------------------------------------------

const LOCAL_KEY = "guest-wishlist";
const EXPIRY_DAYS = 14;

function loadGuestWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw) as WishlistItem[];
    const cutoff = Date.now() - EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    const valid = parsed.filter((i) => i.addedAt > cutoff);

    // Cleanup expired
    if (valid.length !== parsed.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(valid));
    }

    return valid;
  } catch {
    return [];
  }
}

function saveGuestWishlist(items: WishlistItem[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
}

// ---------------------------------------------------
// Shopify Wishlist (Stubbed for future integration)
// ---------------------------------------------------


// async function updateShopifyWishlist(_items: WishlistItem[]) {
  // TODO: Replace with Shopify metafield mutation
// }

// ---------------------------------------------------
// Merge logic: dedupe by variant ID
// ---------------------------------------------------

function mergeWishlists(a: WishlistItem[], b: WishlistItem[]) {
  const map = new Map<string, WishlistItem>();
  [...a, ...b].forEach((item) => map.set(item.id, item));
  return [...map.values()];
}

// ---------------------------------------------------
// Provider
// ---------------------------------------------------

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  /**
   * Load wishlist on mount or when login state changes.
   * Because isAuthenticated comes from the server during hydration,
   * there's no loading/flicker issue.
   */

  /**
   * Save guest wishlist updates to localStorage
   */


  /**
   * Add item to wishlist
   */
  const add = (item: Omit<WishlistItem, "addedAt">) => {
    if (isInWishlist(item.id)) {
      return toast.error("Already in wishlist");
    }

    const newItem: WishlistItem = {
      ...item,
      addedAt: Date.now(),
    };

    const updated = [...items, newItem];
    setItems(updated);


    toast.success("Added to wishlist");
  };

  /**
   * Remove item from wishlist
   */
  const remove = (variantId: string) => {
    const updated = items.filter((i) => i.id !== variantId);
    setItems(updated);


    toast.success("Removed from wishlist");
  };

  /**
   * Clear all wishlist items
   */
  const clear = () => {
    setItems([]);


  };

  /**
   * Check if item is already in wishlist
   */
  const isInWishlist = (variantId: string) =>
    items.some((i) => i.id === variantId);

  return (
    <WishlistContext.Provider
      value={{ items, isInWishlist, add, remove, clear }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ---------------------------------------------------
// Hook
// ---------------------------------------------------

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) {
    throw new Error("useWishlist must be used within a <WishlistProvider>");
  }
  return ctx;
}
