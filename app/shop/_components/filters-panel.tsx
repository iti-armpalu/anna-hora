"use client";

import { useMemo } from "react";
import Link from "next/link";
import { CollectionNormalized } from "@/lib/shopify/types/collection-normalized";

interface Props {
  collections: CollectionNormalized[];
  activeCollection: string | null; // ← server-driven
}

export function FiltersPanel({
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

    <div className="flex lg:flex items-center space-x-6">
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
            className={`text-sm transition-colors pb-1 ${isActive
                ? "text-stone-900 font-medium border-b border-stone-300"
                : "text-stone-600 hover:text-stone-900"
              }`}
          >
            {col.title}
          </Link>
        );
      })}
    </div>

  );
}
