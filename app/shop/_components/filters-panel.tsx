"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  collections: { handle: string; title: string }[];
  selected: string;
  onSelect: (handle: string) => void;
}

export function FiltersPanel({ open, onOpenChange, collections, selected, onSelect }: Props) {

  // Remove Shopify Home Page + sort alphabetically
  const filteredCollections = [...collections]
    .sort((a, b) => a.title.localeCompare(b.title));


  return (
    <>
      {/* Mobile Filter Drawer */}
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="lg:hidden border-stone-300 bg-transparent">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-white">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            {collections.map((col) => (
              <button
                key={col.handle}
                onClick={() => {
                  onSelect(col.handle)
                  onOpenChange(false)
                }}
                className={`block w-full text-left py-2 text-sm ${selected === col.handle ? "font-medium text-stone-900" : "text-stone-600"
                  }`}
              >
                {col.title}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div className="hidden lg:flex items-center space-x-6">
        {filteredCollections.map(col => (
          <button
            key={col.handle}
            onClick={() => onSelect(col.handle)}
            className={`text-sm transition-colors ${selected === col.handle
              ? "text-stone-900 font-medium border-b border-stone-300"
              : "text-stone-600 hover:text-stone-900"
              }`}
          >
            {col.title}
          </button>
        ))}
      </div>
    </>
  )
}
