"use client"

import { Card, CardContent } from "@/components/ui/card"
import { WishlistButton } from "../wishlist-button"
import ProductImageCarousel from "../product-image-carousel"
import { Badge } from "../ui/badge"
import { Product } from "@/lib/shopify/types/product"
import { formatPrice } from "@/hooks/use-price"
import { Button } from "../ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export function ProductCard({
  product,
  viewMode = "grid",
}: {
  product: Product
  viewMode?: "grid" | "list"
}) {
  const price = formatPrice({
    amount: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
  })

  const BADGE_MAP = {
    bestseller: { label: "Bestseller", color: "bg-anna-green-900" },
    limited: { label: "Limited", color: "bg-anna-green-900" },
    new: { label: "New", color: "bg-anna-green-900" },
  }

  // -------------------------
  // LIST VIEW
  // -------------------------
  if (viewMode === "list") {
    return (
      <Card className="group cursor-pointer border border-stone-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
            <ProductImageCarousel product={product} />

            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.metafields?.map((mf) => {
                const badge = BADGE_MAP[mf.key as keyof typeof BADGE_MAP]
                if (!badge || mf.value !== "true") return null
                return (
                  <Badge key={mf.key} className={`${badge.color} text-white`}>
                    {badge.label}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* Info */}
          <CardContent className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-light text-stone-800 group-hover:text-stone-600 transition-colors mb-2">
                  {product.title}
                </h3>

                <p className="text-stone-600 mb-3">{product.description}</p>
                <p className="text-sm text-stone-500">
                  Midnight Navy • Mulberry silk
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-medium text-stone-800">{price}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="relative flex items-center gap-3 mt-6">
              <WishlistButton product={product} />
              <Button
                size="icon"
                variant="outline"
                // onClick={handleQuickView}
                className="border-stone-300 text-stone-600 hover:bg-stone-100 bg-transparent"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    )
  }

  // -------------------------
  // GRID VIEW (default)
  // -------------------------
  return (
    <Card className="flex flex-col h-full group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden gap-0">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden">
        <WishlistButton product={product} />
        <ProductImageCarousel product={product} />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.metafields?.map((mf) => {
            const badge = BADGE_MAP[mf.key as keyof typeof BADGE_MAP]
            if (!badge || mf.value !== "true") return null
            return (
              <Badge key={mf.key} className={`${badge.color} text-white`}>
                {badge.label}
              </Badge>
            )
          })}
        </div>
      </div>

      <Link href={`/product/${product.handle}`} prefetch={false}>
        <CardContent className="flex flex-col justify-between flex-1 p-0 mx-4">
          <div className="space-y-2">
            <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">
              {product.title}
            </h3>

            <p className="text-sm text-stone-600 line-clamp-2 min-h-[2.5rem]">
              {product.description}
            </p>

            <div className="flex flex-row justify-between items-start mt-4">
              <p className="text-medium text-stone-800 font-medium">{price}</p>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
