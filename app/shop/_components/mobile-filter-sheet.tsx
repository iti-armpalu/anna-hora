"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
      <SheetContent
        side="left"
        className="w-full max-w-sm overflow-y-auto bg-white"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <div className="p-4">
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