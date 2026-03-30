"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { CollectionNormalized } from "@/lib/shopify/types/collection-normalized";
import { FilterSidebar } from "./filter-sidebar";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;

  collections: CollectionNormalized[];
  activeCollection: string | null;

  fabrics: string[];
  sizes: string[];
  colors: string[];

  selectedFabric: string[];
  setSelectedFabric: (value: string[]) => void;

  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;

  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;

  selectedPrice: [number, number] | null;
  setSelectedPrice: (value: [number, number]) => void;

  priceBounds: [number, number];
  currency?: string;
}

export function MobileFilterSheet({
  open,
  onOpenChange,
  collections,
  activeCollection,
  fabrics,
  sizes,
  colors,
  selectedFabric,
  setSelectedFabric,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedPrice,
  setSelectedPrice,
  priceBounds,
  currency,
}: Props) {
  const sortedCollections = useMemo(() => {
    return [...collections]
      .filter((c) => c.handle !== "all")
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [collections]);

  const finalCollections = [
    { handle: "all", title: "All Products" },
    ...sortedCollections,
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden border-stone-300 bg-transparent"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-full max-w-sm overflow-y-auto bg-white">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <div className="border-b border-stone-200 pb-4">
            <p className="mb-3 text-sm font-medium text-stone-900">Collection</p>

            <div className="flex flex-wrap gap-2">
              {finalCollections.map((col) => {
                const isActive =
                  (col.handle === "all" && activeCollection === null) ||
                  col.handle === activeCollection;

                const href =
                  col.handle === "all" ? "/shop" : `/collections/${col.handle}`;

                return (
                  <Link
                    key={col.handle}
                    href={href}
                    onClick={() => onOpenChange(false)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-stone-900 text-white"
                        : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                    }`}
                  >
                    {col.title}
                  </Link>
                );
              })}
            </div>
          </div>

          <FilterSidebar
            fabrics={fabrics}
            sizes={sizes}
            colors={colors}
            selectedFabric={selectedFabric}
            setSelectedFabric={setSelectedFabric}
            selectedSizes={selectedSizes}
            setSelectedSizes={setSelectedSizes}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedPrice={selectedPrice}
            setSelectedPrice={setSelectedPrice}
            priceBounds={priceBounds}
            currency={currency}
            className="py-2"
          />
        </div>

        <SheetFooter className="mt-6">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            View products
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}