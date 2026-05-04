"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";

import { FiltersPanel } from "./_components/filters-panel";
import { SortControl } from "./_components/sort-control";
import { ViewToggle } from "./_components/view-toggle";
import { ProductCard } from "@/components/shop/product-card";
import { FilterSidebar } from "./_components/filter-sidebar";
import { MobileFilterSheet } from "./_components/mobile-filter-sheet";

import { ProductNormalized } from "@/lib/shopify/types/product-normalized";
import { CollectionNormalized } from "@/lib/shopify/types/collection-normalized";
import { buildFilterData } from "@/lib/filters/build-filter-data";

type GridDensity = "comfortable" | "compact"

interface Props {
  initialProducts: ProductNormalized[];
  collections: CollectionNormalized[];
  activeCollection: string | null;
}

export default function ShopClient({
  initialProducts,
  collections,
  activeCollection,
}: Props) {
  // -------------------------------------------------
  // Base products
  // -------------------------------------------------
  const [products] = useState<ProductNormalized[]>(initialProducts);

  // -------------------------------------------------
  // SORT + VIEW
  // -------------------------------------------------
  const [selectedSort, setSelectedSort] = useState<
    "newest" | "price-low" | "price-high" | "bestsellers"
  >("newest");

  const [density, setDensity] = useState<GridDensity>("compact")
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [hideFloatingFilterButton, setHideFloatingFilterButton] = useState(false);

  // -------------------------------------------------
  // FILTER STATES
  // -------------------------------------------------
  const [fabric, setFabric] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] =
    useState<[number, number] | null>(null);

  // -------------------------------------------------
  // PRICE BOUNDS
  // -------------------------------------------------
  const priceBounds = useMemo<[number, number]>(() => {
    if (products.length === 0) return [0, 0];

    const prices = products
      .map((p) => Number(p.minPrice))
      .filter((n) => !Number.isNaN(n));

    return [Math.min(...prices), Math.max(...prices)];
  }, [products]);

  useEffect(() => {
    setPriceRange(priceBounds);
  }, [priceBounds]);

  // -------------------------------------------------
  // ACTIVE FILTER COUNT (for mobile button)
  // -------------------------------------------------
  const activeFilterCount =
    fabric.length +
    sizes.length +
    colors.length +
    (priceRange &&
      (priceRange[0] !== priceBounds[0] ||
        priceRange[1] !== priceBounds[1])
      ? 1
      : 0);

  // -------------------------------------------------
  // HELPERS
  // -------------------------------------------------
  function getProductPrice(product: ProductNormalized) {
    return Number(product.minPrice);
  }

  type ProductBooleanFlag = "isBestseller" | "isLimited" | "isNew";

  const hasFlag = useCallback(
    (product: ProductNormalized, key: ProductBooleanFlag) => {
      return product.metafields[key] === true;
    },
    []
  );

  // -------------------------------------------------
  // FILTER DATA
  // -------------------------------------------------
  const filterData = useMemo(() => {
    return buildFilterData(products);
  }, [products]);

  // -------------------------------------------------
  // FILTERING
  // -------------------------------------------------
  const filteredProducts = useMemo(() => {
    let arr = [...products];

    if (fabric.length > 0) {
      arr = arr.filter((p) =>
        p.metafields.fabricShort
          ? fabric.includes(p.metafields.fabricShort)
          : false
      );
    }

    if (sizes.length > 0) {
      arr = arr.filter((product) =>
        product.variants.some((variant) => {
          if (!variant.availableForSale) return false;

          const sizeOpt = variant.selectedOptions.find(
            (opt) => opt.name.toLowerCase() === "size"
          );

          return sizeOpt && sizes.includes(sizeOpt.value);
        })
      );
    }

    if (colors.length > 0) {
      arr = arr.filter((p) =>
        p.options.some(
          (opt) =>
            opt.name.toLowerCase() === "color" &&
            opt.values.some((v) => colors.includes(v))
        )
      );
    }

    if (priceRange) {
      const [min, max] = priceRange;

      arr = arr.filter((p) => {
        const price = Number(p.minPrice);
        return price >= min && price <= max;
      });
    }

    return arr;
  }, [products, fabric, sizes, colors, priceRange]);

  // -------------------------------------------------
  // SORTING
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
            Number(hasFlag(b, "isBestseller")) -
            Number(hasFlag(a, "isBestseller"))
          );

        case "newest":
        default:
          return Number(hasFlag(b, "isNew")) - Number(hasFlag(a, "isNew"));
      }
    });
  }, [filteredProducts, selectedSort, hasFlag]);

  useEffect(() => {
    const footer = document.querySelector("[data-mobile-filter-footer]");
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideFloatingFilterButton(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const gridClass = density === "comfortable"
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-2 sm:grid-cols-3"

  return (
    <div className="bg-stone-50">

      {/* Hero */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-light text-stone-800 lg:text-4xl">
            {activeCollection ? "Collection" : "The Collection"}
          </h1>
          <p className="mx-auto max-w-2xl text-stone-600">
            Discover pieces designed to elevate the everyday.
          </p>
        </div>
      </section>

      {/* Toolbar */}
      <section className="sticky top-16 z-40 border-b border-stone-200 bg-white lg:top-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <FiltersPanel
              collections={collections}
              activeCollection={activeCollection}
            />
            <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
              <SortControl value={selectedSort} onChange={setSelectedSort} />
              <ViewToggle value={density} onChange={setDensity} />
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <main className="container mx-auto px-4 py-8 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <aside className="hidden lg:block">
            <FilterSidebar
              fabrics={filterData.fabrics}
              sizes={filterData.sizes}
              colors={filterData.colors}
              selectedFabric={fabric}
              setSelectedFabric={setFabric}
              selectedSizes={sizes}
              setSelectedSizes={setSizes}
              selectedColors={colors}
              setSelectedColors={setColors}
              selectedPrice={priceRange}
              setSelectedPrice={setPriceRange}
              priceBounds={priceBounds}
              currency={products[0]?.currencyCode}
            />
          </aside>

          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <div className="py-24 text-center">
                <p className="text-stone-500">No products match your filters.</p>
              </div>
            ) : (
              <div className={`grid items-stretch gap-x-6 gap-y-12 ${gridClass}`}>
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    density={density}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile filter sheet */}
      <MobileFilterSheet
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        collections={collections}
        activeCollection={activeCollection}
        fabrics={filterData.fabrics}
        sizes={filterData.sizes}
        colors={filterData.colors}
        selectedFabric={fabric}
        setSelectedFabric={setFabric}
        selectedSizes={sizes}
        setSelectedSizes={setSizes}
        selectedColors={colors}
        setSelectedColors={setColors}
        selectedPrice={priceRange}
        setSelectedPrice={setPriceRange}
        priceBounds={priceBounds}
        currency={products[0]?.currencyCode}
      />

      {/* Mobile floating filter button */}
      <button
        onClick={() => setIsFilterOpen(true)}
        className={`fixed left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 bg-forest-900 px-5 py-3 text-sm font-medium text-white shadow-lg transition-all duration-300 active:scale-95 md:hidden ${hideFloatingFilterButton
            ? "pointer-events-none translate-y-4 opacity-0"
            : "bottom-[calc(1.5rem+env(safe-area-inset-bottom))] opacity-100"
          }`}
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ""}
      </button>
    </div>
  )
}