import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "../shop/product-card"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { homeContent } from "@/components/home/_data"

interface FeaturedProductsProps {
  products: ProductNormalized[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { featuredProducts } = homeContent

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
            {featuredProducts.heading}
          </h2>
          <p className="text-stone-600">{featuredProducts.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href={featuredProducts.cta.href}>
              {featuredProducts.cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}