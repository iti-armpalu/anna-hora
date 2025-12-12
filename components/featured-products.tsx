import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./shop/product-card"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"



interface FeaturedProductsProps {
  products: ProductNormalized[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <div>
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Featured Pieces</h3>
            <p className="text-stone-600">Handpicked selections for your most cherished moments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
          >
            <Link href="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
