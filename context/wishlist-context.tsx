"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"
import { toast } from "sonner"

// ---------------------------------------------------
// Types
// ---------------------------------------------------

export interface WishlistItem {
  id: string
  handle: string
  title: string
  price: string
  currencyCode: string
  image: string
  images: Array<{ url: string; altText?: string | null }>
  sizes: Array<{ size: string; inStock: boolean }>
  fabricShort?: string
  size?: string
  addedAt: number
}

interface WishlistContextType {
  items: WishlistItem[]
  isInWishlist: (id: string) => boolean
  add: (item: Omit<WishlistItem, "addedAt">) => void
  remove: (id: string) => void
  clear: () => void
}

// ---------------------------------------------------
// Context
// ---------------------------------------------------

const WishlistContext = createContext<WishlistContextType | null>(null)

// ---------------------------------------------------
// localStorage helpers
// ---------------------------------------------------

const LOCAL_KEY = "guest-wishlist"
const EXPIRY_DAYS = 14

function loadWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as WishlistItem[]
    const cutoff = Date.now() - EXPIRY_DAYS * 24 * 60 * 60 * 1000
    const valid = parsed.filter((i) => i.addedAt > cutoff)
    if (valid.length !== parsed.length) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(valid))
    }
    return valid
  } catch {
    return []
  }
}

function saveWishlist(items: WishlistItem[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(items))
}

// ---------------------------------------------------
// Provider
// ---------------------------------------------------

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    setItems(loadWishlist())
    setHydrated(true)
  }, [])

  // Save to localStorage on change
  useEffect(() => {
    if (!hydrated) return
    saveWishlist(items)
  }, [items, hydrated])

  const isInWishlist = (id: string) => items.some((i) => i.id === id)

  const add = (item: Omit<WishlistItem, "addedAt">) => {
    if (isInWishlist(item.id)) {
      toast.error("Already in wishlist")
      return
    }
    setItems((prev) => [...prev, { ...item, addedAt: Date.now() }])
    toast.success("Added to wishlist")
  }

  const remove = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    toast.success("Removed from wishlist")
  }

  const clear = () => setItems([])

  return (
    <WishlistContext.Provider value={{ items, isInWishlist, add, remove, clear }}>
      {children}
    </WishlistContext.Provider>
  )
}

// ---------------------------------------------------
// Hook
// ---------------------------------------------------

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within a <WishlistProvider>")
  return ctx
}