"use client";

import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { FiltersPanel } from "./_components/filters-panel";
import { SortControl } from "./_components/sort-control";
import { ViewToggle } from "./_components/view-toggle";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "./_components/filter-sidebar";

import { Product } from "@/lib/shopify/types/product";
import { ShopifyCollection } from "@/lib/shopify/types/collection";

interface Props {
  initialProducts: Product[];
  initialPageInfo: { hasNextPage: boolean; endCursor: string | null };
  collections: ShopifyCollection[];
  initialCollectionHandle?: string;
}

export default function ShopClient({
  initialProducts,
  initialPageInfo,
  collections,
  initialCollectionHandle
}: Props) {
  // ----------------------------------
  // COLLECTION + PRODUCTS
  // ----------------------------------
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollectionHandle || "all"
  );

  const [products, setProducts] = useState<Product[]>(initialProducts);

  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loadingMore, setLoadingMore] = useState(false);

  // ----------------------------------
  // SORT + VIEW
  // ----------------------------------
  const [selectedSort, setSelectedSort] = useState<
    "newest" | "price-low" | "price-high" | "bestsellers"
  >("newest");

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // ----------------------------------
  // FILTER STATES (NEW)
  // ----------------------------------

  const [fabric, setFabric] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);


  // -------------------------------------------------
  // Fetch products when a collection is selected
  // -------------------------------------------------
  useEffect(() => {
    async function load() {
      // Reset pagination whenever filter changes
      setPageInfo(initialPageInfo);

      if (selectedCollection === "all") {
        setProducts(initialProducts);
        return;
      }

      const res = await fetch(`/api/collections/${selectedCollection}`);
      const data = await res.json();

      setProducts(data.products ?? []);

      // collections do NOT paginate
      setPageInfo({
        hasNextPage: false,
        endCursor: null
      });
    }

    load();
  }, [selectedCollection, initialProducts, initialPageInfo]);

  // -------------------------------------------------
  // Helpers
  // -------------------------------------------------
  function getProductPrice(product: Product) {
    return Number(product.priceRange.minVariantPrice.amount);
  }

  function hasFlag(product: Product, key: string) {
    return product.metafields?.some((m) => m.key === key && m.value === "true");
  }

  // -------------------------------------------------
  // FILTERING (fabric, size, color, price)
  // -------------------------------------------------
  const filteredProducts = useMemo(() => {
    let arr = [...products];

    // FABRIC — multi-select
    if (fabric.length > 0) {
      arr = arr.filter((p) =>
        p.options?.some(
          (opt) =>
            opt.name.toLowerCase() === "fabric" &&
            opt.values.some((value) => fabric.includes(value))
        )
      );
    }


    // SIZES — multi-select
    if (sizes.length > 0) {
      arr = arr.filter((p) =>
        p.options?.some(
          (opt) =>
            opt.name.toLowerCase() === "size" &&
            opt.values.some((value) => sizes.includes(value))
        )
      );
    }

    // COLOR — multi-select
    if (colors.length > 0) {
      arr = arr.filter((p) =>
        p.options?.some(
          (opt) =>
            opt.name.toLowerCase() === "color" &&
            opt.values.some((value) => colors.includes(value))
        )
      );
    }

    // PRICE RANGE — single
    if (priceRange) {
      const [min, max] = priceRange;

      arr = arr.filter((p) => {
        const price = Number(p.priceRange.minVariantPrice.amount);
        return price >= min && price <= max;
      });
    }

    return arr;
  }, [products, fabric, sizes, colors, priceRange]);

  // -------------------------------------------------
  // Sorting
  // -------------------------------------------------
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (selectedSort) {
        case "price-low":
          return getProductPrice(a) - getProductPrice(b);

        case "price-high":
          return getProductPrice(b) - getProductPrice(a);

        case "bestsellers":
          return (
            Number(hasFlag(b, "bestseller")) -
            Number(hasFlag(a, "bestseller"))
          );

        case "newest":
        default:
          return Number(hasFlag(b, "new")) - Number(hasFlag(a, "new"));
      }
    });
  }, [filteredProducts, selectedSort]);

  // -------------------------------------------------
  // LOAD MORE (only "ALL" collection)
  // -------------------------------------------------
  async function loadMore() {
    if (!pageInfo?.hasNextPage) return;

    setLoadingMore(true);

    const res = await fetch(`/api/products?after=${pageInfo.endCursor}`);
    const data = await res.json();

    setProducts((prev) => [...prev, ...data.products]);
    setPageInfo(data.pageInfo);

    setLoadingMore(false);
  }

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
            The Collection
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Discover pieces crafted from the finest mulberry silk.
          </p>
        </div>
      </section>

      {/* FILTER + SORT */}
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

      {/* GRID + SIDEBAR */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* LEFT SIDEBAR */}
          <aside className="hidden lg:block">
            <FilterSidebar
              selectedFabric={fabric}
              setSelectedFabric={setFabric}
              selectedSizes={sizes}
              setSelectedSizes={setSizes}
              selectedColors={colors}
              setSelectedColors={setColors}
              selectedPrice={priceRange}
              setSelectedPrice={setPriceRange}
            />
          </aside>

          {/* PRODUCT GRID */}
          <div className="lg:col-span-3">
            <div
              className={`grid gap-8 items-stretch ${viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
                }`}
            >
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {selectedCollection === "all" && pageInfo.hasNextPage && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  disabled={loadingMore}
                  onClick={loadMore}
                >
                  {loadingMore ? "Loading..." : "Load More Products"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
