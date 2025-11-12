"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, Plus, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { WishlistButton } from "@/components/wishlist-button"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number | null
  category: string
  color: string
  fabric: string
  sizes: string[]
  image: string
  hoverImage?: string
  isNew?: boolean
  isBestseller?: boolean
  isLimited?: boolean
  rating: number
  reviews: number
  stock: number
}

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
  viewMode?: "grid" | "list"
}

export function ProductCard({ product, onQuickView, viewMode = "grid" }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onQuickView) {
      onQuickView(product)
    }
  }

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
        <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">
          <Image
            src={imageError ? "/placeholder.svg" : product.image}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          {product.hoverImage && !imageError && (
            <Image
              src={product.hoverImage || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-all duration-500 opacity-0 group-hover:opacity-100"
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 space-y-2">
            {product.isNew && <Badge className="bg-stone-800 text-white">New</Badge>}
            {product.isBestseller && <Badge className="bg-amber-600 text-white">Bestseller</Badge>}
            {product.isLimited && <Badge className="bg-red-600 text-white">Limited</Badge>}
            {product.originalPrice && <Badge variant="destructive">Sale</Badge>}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <WishlistButton
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice,
                image: product.image,
                color: product.color,
                stock: product.stock,
                category: product.category,
              }}
              variant="icon"
            />
            {onQuickView && (
              <Button size="icon" variant="secondary" onClick={handleQuickView} className="bg-white/90 hover:bg-white">
                <Eye className="w-4 h-4 text-stone-600" />
              </Button>
            )}
          </div>

          {/* Quick Add Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>

          {/* Stock Indicator */}
          {product.stock <= 5 && (
            <div className="absolute bottom-4 left-4">
              <Badge variant="outline" className="bg-white/90 text-stone-600 border-stone-300">
                Only {product.stock} left
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-0">
          <div className="space-y-2">
            <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">{product.name}</h3>
            <p className="text-sm text-stone-600">{product.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through">${product.originalPrice}</span>
                )}
                <span className="font-medium text-stone-800">${product.price}</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating) ? "fill-stone-400 text-stone-400" : "text-stone-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-500">({product.reviews})</span>
              </div>
            </div>
            <p className="text-xs text-stone-500">
              {product.color} • {product.fabric}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
