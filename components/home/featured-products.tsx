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
    <section className="section">
      <div className="container-site">
        <div className="mb-8 md:mb-12">
          <h2>{featuredProducts.heading}</h2>
          <p>{featuredProducts.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild variant="outline">
            <Link href={featuredProducts.cta.href}>
              {featuredProducts.cta.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}