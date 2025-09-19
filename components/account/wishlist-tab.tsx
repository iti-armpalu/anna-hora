import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, X } from "lucide-react"
import Image from "next/image"

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  inStock: boolean
}

interface WishlistTabProps {
  wishlistItems: WishlistItem[]
}

export function WishlistTab({ wishlistItems }: WishlistTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-serif text-stone-800">Your Wishlist</h3>
        <p className="text-stone-600">{wishlistItems.length} items</p>
      </div>

      {wishlistItems.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-stone-800 mb-2">Your wishlist is empty</h4>
            <p className="text-stone-600 mb-4">Save items you love for later</p>
            <Button>Continue Shopping</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button size="sm" variant="ghost" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <h4 className="font-medium text-stone-800 mb-2">{item.name}</h4>
                <p className="text-lg font-light text-stone-800 mb-3">${item.price}</p>
                <div className="flex gap-2">
                  <Button className="flex-1" disabled={!item.inStock}>
                    {item.inStock ? "Add to Cart" : "Out of Stock"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
