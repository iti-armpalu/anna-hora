"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Check } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { wishlistContent } from "@/data/wishlist-content"
// import { getProducts, type Product } from "@/data/products"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"


import { useWishlist } from "@/context/wishlist-context"
import { CartDrawer } from "@/components/cart/cart-drawer"

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

export default function WishlistPage() {
  const { isAuthenticated } = useAuth()
  const { cartItems, setCartItems } = useCart()
  const { wishlistItems, removeFromWishlist } = useWishlist()
  // const [products, setProducts] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showAccountModal, setShowAccountModal] = useState(false)
  const [showToastPrompt, setShowToastPrompt] = useState(false)

  // useEffect(() => {
  //   const loadData = async () => {
  //     const allProducts = await getProducts()
  //     setProducts(allProducts)
  //   }
  //   loadData()
  // }, [])

  const addToBag = (item: WishlistItem) => {
    const cartItem = {
      id: item.id,
      name: item.name,
      color: item.color,
      size: item.size || "M",
      price: item.price,
      quantity: 1,
      image: item.image,
      stock: item.stock,
    }

    const existingItem = cartItems.find(
      (ci) => ci.id === item.id && ci.color === item.color && ci.size === cartItem.size,
    )

    if (existingItem) {
      const updatedItems = cartItems.map((ci) =>
        ci.id === item.id && ci.color === item.color && ci.size === cartItem.size
          ? { ...ci, quantity: ci.quantity + 1 }
          : ci,
      )
      setCartItems(updatedItems)
    } else {
      setCartItems([...cartItems, cartItem])
    }

    toast.success("Added to bag")
  }

  const getStockMessage = (stock: number) => {
    if (stock === 0) return wishlistContent.stockMessages.outOfStock
    if (stock <= 5) return wishlistContent.stockMessages.lowStock(stock)
    return null
  }

  return (
    <div className="min-h-screen bg-stone-50">

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {!isAuthenticated && (
          <div className="mb-8">
            <div className="bg-stone-100 border border-stone-200 rounded-lg p-4 text-center">
              <p className="text-stone-700 text-sm">
                We will keep your saved items for 14 days. Sign in or register to ensure your saved items are always
                available.
              </p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">{wishlistContent.hero.title}</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">{wishlistContent.hero.subtitle}</p>
        </div>

        {/* Account Creation Prompt */}
        {!isAuthenticated && wishlistItems.length > 0 && (
          <Card className="mb-8 border-stone-200 bg-stone-100/50">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-stone-700 mb-4 lg:mb-0">{wishlistContent.accountPrompt.title}</p>
                  <div className="hidden lg:block">
                    <ul className="text-sm text-stone-600 space-y-1">
                      {wishlistContent.accountPrompt.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-stone-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:w-48">
                  <Button
                    onClick={() => setShowAccountModal(true)}
                    className="bg-stone-800 hover:bg-stone-700 text-white"
                  >
                    {wishlistContent.accountPrompt.ctaButtons.createAccount}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAccountModal(true)}
                    className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                  >
                    {wishlistContent.accountPrompt.ctaButtons.login}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Wishlist Content */}
        {wishlistItems.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="relative w-32 h-32 mx-auto mb-8">
              <Image
                src="/placeholder.svg?height=128&width=128&text=Silk fabric texture in soft lighting"
                alt="Empty wishlist"
                fill
                className="object-cover rounded-full opacity-60"
              />
            </div>
            <h2 className="text-2xl font-light text-stone-800 mb-4">{wishlistContent.emptyState.title}</h2>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">{wishlistContent.emptyState.subtitle}</p>
            <Link href={wishlistContent.emptyState.ctaLink}>
              <Button className="bg-stone-800 hover:bg-stone-700 text-white">
                {wishlistContent.emptyState.ctaText}
              </Button>
            </Link>
          </div>
        ) : (
          /* Wishlist Items */
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-medium text-stone-800">
                {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((item) => {
                const stockMessage = getStockMessage(item.stock)

                return (
                  <Card key={item.id} className="group border-stone-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="relative mb-4">
                        <Link href={`/product/${item.id}`}>
                          <div className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </Link>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => removeFromWishlist(item.id)}
                          className="absolute top-2 right-2 bg-white/80 hover:bg-white shadow-sm"
                        >
                          <X className="w-4 h-4" />
                        </Button>

                        {stockMessage && (
                          <div className="absolute bottom-2 left-2">
                            <Badge variant={item.stock === 0 ? "destructive" : "secondary"} className="text-xs">
                              {stockMessage}
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="font-medium text-stone-800 hover:text-stone-600 transition-colors cursor-pointer">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-stone-600">{item.color}</p>
                          {item.size && <p className="text-sm text-stone-500">Size: {item.size}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                          {item.originalPrice && (
                            <span className="text-sm text-stone-400 line-through">${item.originalPrice}</span>
                          )}
                          <span className="font-medium text-stone-800">${item.price}</span>
                        </div>

                        <Button
                          onClick={() => addToBag(item)}
                          disabled={item.stock === 0}
                          className="w-full bg-stone-800 hover:bg-stone-700 text-white disabled:bg-stone-300"
                        >
                          {item.stock === 0
                            ? wishlistContent.stockMessages.outOfStock
                            : wishlistContent.buttons.addToBag}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </main>

      {/* Account Modal */}
      <Dialog open={showAccountModal} onOpenChange={setShowAccountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Save Your Wishlist</DialogTitle>
            <DialogDescription className="text-center">
              Create an account to keep your saved items safe and get exclusive benefits.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <ul className="text-sm text-stone-600 space-y-2">
              {wishlistContent.accountPrompt.benefits.map((benefit, index) => (
                <li key={index} className="flex items-center">
                  <Check className="w-4 h-4 text-stone-500 mr-3" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 pt-4">
              <Link href="/signup">
                <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white">
                  {wishlistContent.accountPrompt.ctaButtons.createAccount}
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="w-full border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                >
                  {wishlistContent.accountPrompt.ctaButtons.login}
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Prompt */}
      {showToastPrompt && (
        <div className="fixed bottom-4 right-4 z-50">
          <Card className="border-stone-200 shadow-lg max-w-sm">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <p className="text-sm text-stone-700">{wishlistContent.toastMessage}</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => setShowToastPrompt(false)} className="p-1 h-auto">
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => {
                    setShowAccountModal(true)
                    setShowToastPrompt(false)
                  }}
                  className="bg-stone-800 hover:bg-stone-700 text-white text-xs"
                >
                  Create Account
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setShowToastPrompt(false)} className="text-xs">
                  Maybe Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
