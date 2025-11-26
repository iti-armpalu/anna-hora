"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { useAuth } from "./auth-context";

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

async function fetchShopifyWishlist(): Promise<WishlistItem[]> {
  // TODO: Replace with Shopify customer API query using customerAccessToken
  return [];
}

async function updateShopifyWishlist(_items: WishlistItem[]) {
  // TODO: Replace with Shopify metafield mutation
}

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
  const { customer, loading } = useAuth(); // optional for now
  const isLoggedIn = Boolean(customer);
  const [items, setItems] = useState<WishlistItem[]>([]);

  // Load wishlist on init
  useEffect(() => {
    if (loading) return;

    async function init() {
      if (isLoggedIn) {
        const guest = loadGuestWishlist();
        const shopify = await fetchShopifyWishlist();

        const merged = mergeWishlists(guest, shopify);
        setItems(merged);

        if (merged.length > 0) {
          await updateShopifyWishlist(merged);
        }

        // Clear guest localStorage after sync
        localStorage.removeItem(LOCAL_KEY);
      } else {
        setItems(loadGuestWishlist());
      }
    }

    init();
  }, [loading, isLoggedIn]);

  // Sync to localStorage only for guest users
  useEffect(() => {
    if (!isLoggedIn) {
      saveGuestWishlist(items);
    }
  }, [items, isLoggedIn]);

  // Add item
  const add = (item: Omit<WishlistItem, "addedAt">) => {
    if (isInWishlist(item.id)) return toast.error("Already in wishlist");

    const newItem: WishlistItem = {
      ...item,
      addedAt: Date.now(),
    };

    const updated = [...items, newItem];
    setItems(updated);

    if (isLoggedIn) updateShopifyWishlist(updated);

    toast.success("Added to wishlist");
  };

  // Remove item
  const remove = (variantId: string) => {
    const updated = items.filter((i) => i.id !== variantId);
    setItems(updated);

    if (isLoggedIn) updateShopifyWishlist(updated);

    toast.success("Removed from wishlist");
  };

  // Clear all
  const clear = () => {
    setItems([]);

    if (isLoggedIn) {
      updateShopifyWishlist([]);
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
  };

  const isInWishlist = (variantId: string) =>
    items.some((i) => i.id === variantId);

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, add, remove, clear }}>
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
