import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface FeaturedProductCardProps {
  productImage: string
  productName: string
  productPrice?: string
}

export function FeaturedProductCard({ productImage, productName, productPrice }: FeaturedProductCardProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-stone-500 font-light">Featured product in the article</p>
      <Card className="h-fit border-stone-200 shadow-sm max-w-[280px]">
        <CardContent className="p-3">
          <div className="relative w-full aspect-square overflow-hidden rounded-lg mb-2">
            <Image src={productImage || "/placeholder.svg"} alt={productName} fill className="object-cover" />
          </div>
          <h4 className="text-sm font-light text-stone-800 mb-1">{productName}</h4>
          {productPrice && <p className="text-xs text-stone-600 mb-2">{productPrice}</p>}
          <Button className="w-full bg-stone-800 hover:bg-stone-700 text-white text-xs py-1.5">Shop Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}
