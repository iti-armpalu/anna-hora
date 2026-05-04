"use client"

import { useMemo } from "react"
import Link from "next/link"
import { CollectionNormalized } from "@/lib/shopify/types/collection-normalized"

interface Props {
  collections: CollectionNormalized[]
  activeCollection: string | null
}

export function FiltersPanel({ collections, activeCollection }: Props) {
  const sortedCollections = useMemo(() => {
    return [...collections]
      .filter((c) => c.handle !== "all")
      .sort((a, b) => a.title.localeCompare(b.title))
  }, [collections])

  const finalCollections = [
    { handle: "all", title: "All Products" },
    ...sortedCollections,
  ]

  return (
    <nav className="flex items-center gap-6">
      {finalCollections.map((col) => {
        const isActive =
          (col.handle === "all" && activeCollection === null) ||
          col.handle === activeCollection

        const href = col.handle === "all" ? "/shop" : `/collections/${col.handle}`

        return (
          <Link
            key={col.handle}
            href={href}
            className={`text-sm transition-colors pb-1 whitespace-nowrap ${isActive
                ? "text-stone-900 font-medium border-b border-stone-900"
                : "text-stone-500 hover:text-stone-900"
              }`}
          >
            {col.title}
          </Link>
        )
      })}
    </nav>
  )
}