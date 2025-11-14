"use client"

import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { CartDrawer } from "@/components/cart/cart-drawer"

import { FiltersPanel } from "./_components/filters-panel"
import { SortControl } from "./_components/sort-control"
import { ViewToggle } from "./_components/view-toggle"

import { ProductCard } from "@/components/shop/product-card"
import { Product } from "@/lib/types/product"


export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedSort, setSelectedSort] = useState<"newest" | "price-low" | "price-high" | "bestsellers">("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const categories = [
    { id: "all", name: "All Products" },
    { id: "loungewear", name: "Loungewear" },
    { id: "sleepwear", name: "Sleepwear" },
    { id: "robes", name: "Robes" },
    { id: "accessories", name: "Accessories" },
  ]

  // const filtered = useMemo(
  //   () => initialProducts.filter(p => selectedCategory === "all" || p.category === selectedCategory),
  //   [initialProducts, selectedCategory]
  // )

  // const products = useMemo(() => {
  //   const arr = [...filtered]
  //   switch (selectedSort) {
  //     case "price-low": return arr.sort((a, b) => a.price - b.price)
  //     case "price-high": return arr.sort((a, b) => b.price - a.price)
  //     case "bestsellers": return arr.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0))
  //     default: return arr.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
  //   }
  // }, [filtered, selectedSort])

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
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
          <div className="flex items-center gap-3">
            <SortControl value={selectedSort} onChange={setSelectedSort} />
            <ViewToggle value={viewMode} onChange={setViewMode} />
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="container mx-auto px-4 py-8">
        <div
          className={`grid gap-8 items-stretch ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            }`}
        >
          {initialProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => setIsCartOpen(true)}>
            Load More Products
          </Button>
        </div>
      </main>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}
