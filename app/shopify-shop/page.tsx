// app/products/page.tsx
import { getProducts } from "@/lib/queries/get-products"
import Image from "next/image"
import Link from "next/link"

export const revalidate = 60 // revalidate every 60s (optional)

export default async function ShopifyShopPage() {
  const products = await getProducts(1) // fetch just one to test

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-serif mb-6">Products (from Shopify)</h1>

      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((p) => {
          const price = p.priceRange.minVariantPrice
          return (
            <li key={p.id} className="border rounded-lg p-4">
              <Link href={`/products/${p.handle}`}>
                <div className="relative aspect-[4/5] rounded overflow-hidden">
                  {p.featuredImage && (
                    <Image
                      src={p.featuredImage.url}
                      alt={p.featuredImage.altText ?? p.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="mt-3">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-stone-600">
                    {price.amount} {price.currencyCode}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </main>
  )
}
