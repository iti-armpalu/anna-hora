"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Filter } from "lucide-react";
import { CollectionNormalized } from "@/lib/shopify/types/collection-normalized";

interface Props {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  collections: CollectionNormalized[];
  activeCollection: string | null; // ← server-driven
}

export function FiltersPanel({
  open,
  onOpenChange,
  collections,
  activeCollection,
}: Props) {
  // -----------------------------------------
  // Sort Shopify collections alphabetically
  // -----------------------------------------
  const sortedCollections = useMemo(() => {
    return [...collections]
      .filter((c) => c.handle !== "all")
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [collections]);

  // -----------------------------------------
  // Include "All Products" entry (Shop All)
  // -----------------------------------------
  const finalCollections = [
    { handle: "all", title: "All Products" },
    ...sortedCollections,
  ];

  // -----------------------------------------
  // RENDER
  // -----------------------------------------
  return (
    <>
      {/* MOBILE FILTER DRAWER */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="lg:hidden border-stone-300 bg-transparent"
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-80 bg-white">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-6">
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
                  className={`block w-full text-left py-2 text-sm ${
                    isActive
                      ? "font-medium text-stone-900"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {col.title}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>

      {/* DESKTOP LINKS */}
      <div className="hidden lg:flex items-center space-x-6">
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
              className={`text-sm transition-colors pb-1 ${
                isActive
                  ? "text-stone-900 font-medium border-b border-stone-300"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {col.title}
            </Link>
          );
        })}
      </div>
    </>
  );
}
