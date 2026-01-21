import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/hooks/use-price"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import Image from "next/image"
import Link from "next/link"

export function FeaturedProductCard({ product }: { product: ProductNormalized }) {
  // Defensive: never create a broken link
  if (!product.handle) return null

  const imageUrl =
    product.featuredImage?.url ?? product.images?.[0]?.url ?? "/placeholder.svg"

  const price = formatPrice({
    amount: Number(product.minPrice),
    currencyCode: product.currencyCode,
  })

  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-stone-500 font-light">Featured product in the article</p>
      <Card className="h-fit border-stone-200 shadow-sm max-w-[280px]">
        <CardContent className="p-3">
          <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-2">
            <Image
              src={imageUrl}
              alt={product.featuredImage?.altText ?? product.title}
              fill
              className="object-cover" />
          </div>
          <h4 className="text-sm font-light text-stone-800 mb-1">{product.title}</h4>
          <p className="text-xs text-stone-600 mb-2">{price}</p>
          <Button
            asChild
            className="w-full bg-anna-green-950 hover:bg-stone-700 text-white text-xs py-1.5"
          >
            <Link
              href={`/products/${product.handle}`}
            >
              Shop Now
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div >
  )
}
