"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
// import { CartDrawer } from "@/components/cart/cart-drawer"

import { FiltersPanel } from "./_components/filters-panel"
import { SortControl } from "./_components/sort-control"
import { ViewToggle } from "./_components/view-toggle"

import { ProductCard } from "@/components/shop/product-card"
import { Product } from "@/lib/types/product"
import { ShopifyCollection } from "@/lib/types/collection"


export default function ShopClient({ initialProducts, collections }: { initialProducts: Product[]; collections: ShopifyCollection[]; }) {
  const [selectedCollection, setSelectedCollection] = useState("all")
  const [selectedSort, setSelectedSort] = useState<"newest" | "price-low" | "price-high" | "bestsellers">("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  // const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (selectedCollection === "all") return initialProducts;

    return initialProducts.filter((p) =>
      p.options?.some(
        (o) =>
          o.name.toLowerCase() === "category" &&
          o.values.includes(selectedCollection)
      )
    );
  }, [initialProducts, selectedCollection]);

  function getProductPrice(product: Product) {
    return Number(product.priceRange.minVariantPrice.amount);
  }

  function hasFlag(product: Product, key: string) {
    return product.metafields?.some((m) => m.key === key && m.value === "true");
  }

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return getProductPrice(a) - getProductPrice(b);

        case "price-high":
          return getProductPrice(b) - getProductPrice(a);

        case "bestsellers":
          return (
            Number(hasFlag(b, "bestseller")) - Number(hasFlag(a, "bestseller"))
          );

        case "newest":
        default:
          return Number(hasFlag(b, "new")) - Number(hasFlag(a, "new"));
      }
    });
  }, [filteredProducts, selectedSort]);

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">The Collection</h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover pieces crafted from the finest mulberry silk, designed to elevate your most intimate moments with
            unparalleled comfort and timeless elegance.
          </p>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-16 z-40 bg-white border-b border-stone-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <FiltersPanel
            open={isFilterOpen}
            onOpenChange={setIsFilterOpen}
            collections={collections}
            selected={selectedCollection}
            onSelect={setSelectedCollection}
          />
          <div className="flex items-center gap-3">
            <SortControl value={selectedSort} onChange={setSelectedSort} />
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="container mx-auto px-4 py-8">
        <div className={`grid gap-8 items-stretch ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
          {sortedProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => console.log("test")}>
            Load More Products
          </Button>
        </div>
      </main>

      {/* <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> */}
    </div>
  )
}
