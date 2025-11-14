"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
// import { useAuth } from "./auth-context"
import { toast } from "sonner"

interface WishlistItem {
  id: number
  name: string
  price: number
  originalPrice?: number | null
  image: string
  color: string
  size?: string
  stock: number
  category: string
  addedAt: number
}

interface WishlistContextType {
  wishlistItems: WishlistItem[]
  addToWishlist: (product: Omit<WishlistItem, "addedAt">) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
  clearWishlist: () => void
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  // const authContext = useAuth()
  // const { isLoading } = authContext
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])

  // useEffect(() => {
  //   if (!isLoading) {
  //     loadWishlistFromStorage()
  //   }
  // }, [isLoading])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (wishlistItems.length > 0) {
      saveWishlistToStorage(wishlistItems)
    }
  }, [wishlistItems])

  // const loadWishlistFromStorage = () => {
  //   try {
  //     const stored = localStorage.getItem("guest-wishlist")
  //     if (stored) {
  //       const parsed = JSON.parse(stored)
  //       // Filter out expired items (older than 30 days)
  //       const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
  //       const validItems = parsed.filter((item: WishlistItem) => item.addedAt > thirtyDaysAgo)
  //       setWishlistItems(validItems)

  //       // Update storage with filtered items
  //       if (validItems.length !== parsed.length) {
  //         localStorage.setItem("guest-wishlist", JSON.stringify(validItems))
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to load wishlist from storage:", error)
  //     localStorage.removeItem("guest-wishlist")
  //   }
  // }

  const saveWishlistToStorage = (items: WishlistItem[]) => {
    try {
      localStorage.setItem("guest-wishlist", JSON.stringify(items))
    } catch (error) {
      console.error("Failed to save wishlist to storage:", error)
    }
  }

  const addToWishlist = (product: Omit<WishlistItem, "addedAt">) => {
    const existingItem = wishlistItems.find((item) => item.id === product.id)

    if (existingItem) {
      toast.error("Item already in wishlist")
      return
    }

    const newItem: WishlistItem = {
      ...product,
      addedAt: Date.now(),
    }

    const updatedItems = [...wishlistItems, newItem]
    setWishlistItems(updatedItems)
    saveWishlistToStorage(updatedItems)
    toast.success("Added to wishlist")
  }

  const removeFromWishlist = (productId: number) => {
    const updatedItems = wishlistItems.filter((item) => item.id !== productId)
    setWishlistItems(updatedItems)
    saveWishlistToStorage(updatedItems)
    toast.success("Removed from wishlist")
  }

  const isInWishlist = (productId: number) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  const clearWishlist = () => {
    setWishlistItems([])
    localStorage.removeItem("guest-wishlist")
  }

  const wishlistCount = wishlistItems.length

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}
