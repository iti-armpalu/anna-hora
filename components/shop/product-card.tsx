"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "../ui/button"
import { WishlistButton } from "../wishlist-button"
import { toast } from "sonner"
import ProductImageCarousel from "../product-image-carousel"
import { Badge } from "../ui/badge"
import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Product } from "@/lib/types/product"
import { formatPrice } from "@/hooks/use-price"

export function ProductCard({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const sizeOption = product.options?.find(opt => opt.name.toLowerCase() === "size");

  const sizes = sizeOption
    ? sizeOption.values.map((size) => {
      const variantForSize = product.variants?.edges.find((v) =>
        v.node.selectedOptions.some(
          (opt) => opt.name.toLowerCase() === "size" && opt.value === size
        )
      );

      return {
        size,
        inStock: variantForSize?.node.availableForSale ?? false,
      };
    })
    : [];

  const price = formatPrice({
    amount: product.priceRange.minVariantPrice.amount,
    currencyCode: product.priceRange.minVariantPrice.currencyCode
  });


  // --- Handle Quick Add ---
  const handleQuickAdd = () => {
    // For now, no cart logic — just a toast confirmation
    toast.success(`"${product.title}" added to your bag`);

  };

  const BADGE_MAP = {
    bestseller: { label: "Bestseller", color: "bg-anna-green-900" },
    limited: { label: "Limited", color: "bg-anna-green-900" },
    new: { label: "New", color: "bg-anna-green-900" },
  };

  return (


    <Card className="flex flex-col h-full group cursor-pointer border-0 shadow-none bg-transparent overflow-hidden">
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg">

        {/* Wishlist heart */}
        <WishlistButton product={product} />
        
        <ProductImageCarousel product={product} />


        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {product.metafields?.map((mf) => {
            const badge = BADGE_MAP[mf.key as keyof typeof BADGE_MAP];
            if (badge && mf.value === "true") {
              return (
                <Badge key={mf.key} className={`${badge.color} text-white`}>
                  {badge.label}
                </Badge>
              );
            }
            return null;
          })}
        </div>

        {/* Quick Add */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            onClick={handleQuickAdd}
            className="w-full bg-stone-800 hover:bg-stone-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      <Link href={`/product/${product.handle}`} prefetch={false}>
        <CardContent className="flex flex-col justify-between flex-1 p-0">
          <div className="space-y-2">
            <h3 className="font-medium text-stone-800 group-hover:text-stone-600 transition-colors">{product.title}</h3>
            <p className="text-sm text-stone-600 line-clamp-2 min-h-[2.5rem]">{product.description}</p>

            <p className="text-medium text-stone-800 font-medium">
              {price}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {sizes.map(({ size, inStock }) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (inStock) {
                      setSelectedSize(size);
                    }
                  }}
                  disabled={!inStock}
                  className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${selectedSize === size
                    ? "bg-stone-800 text-white border-stone-800"
                    : inStock
                      ? "bg-white text-stone-800 border-stone-300 hover:border-stone-800"
                      : "bg-stone-100 text-stone-400 border-stone-200 line-through cursor-not-allowed opacity-60"
                    }
                `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>

  )
}
