"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  color: string
  size: string
  price: number
  quantity: number
  image: string
  stock: number
}

interface CartContextType {
  cartItems: CartItem[]
  setCartItems: (items: CartItem[]) => void
  totalItems: number
  subtotal: number
  updateQuantity: (id: number, newQuantity: number) => void
  removeItem: (id: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Midnight Silk Robe",
      color: "Midnight Navy",
      size: "M",
      price: 298,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=90&text=Midnight silk robe",
      stock: 8,
    },
    {
      id: 2,
      name: "Morning Mist Camisole Set",
      color: "Pearl Grey",
      size: "S",
      price: 189,
      quantity: 2,
      image: "/placeholder.svg?height=120&width=90&text=Pearl grey camisole set",
      stock: 12,
    },
    {
      id: 3,
      name: "Cashmere Touch Eye Mask",
      color: "Warm Beige",
      size: "One Size",
      price: 45,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=90&text=Silk eye mask",
      stock: 2,
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems((items) => items.filter((item) => item.id !== id))
    } else {
      setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        totalItems,
        subtotal,
        updateQuantity,
        removeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
