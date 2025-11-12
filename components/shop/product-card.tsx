"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ProductNode } from "@/queries/get-products"

export function ProductCard({ product }: { product: ProductNode }) {
  const price = product.priceRange.minVariantPrice
  const imageUrl = product.featuredImage?.url
  const alt = product.featuredImage?.altText ?? product.title

  return (
    <Card className="border-0 shadow-sm bg-white overflow-hidden group">
      <Link href={`/products/${product.handle}`}>
        {/* Product image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          )}
        </div>

        {/* Product info */}
        <CardContent className="p-4 text-center">
          <h3 className="text-sm font-medium text-stone-800 mb-1">{product.title}</h3>
          <p className="text-sm text-stone-600">
            {price.amount} {price.currencyCode}
          </p>
        </CardContent>
      </Link>
    </Card>
  )
}
