"use client"

import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  categories: { id: string; name: string }[]
  selected: string
  onSelect: (id: string) => void
}

export function FiltersPanel({ open, onOpenChange, categories, selected, onSelect }: Props) {
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
            {categories.map(c => (
              <button
                key={c.id}
                className={`block w-full text-left py-2 text-sm ${
                  selected === c.id ? "font-medium text-stone-900" : "text-stone-600"
                }`}
                onClick={() => {
                  onSelect(c.id)
                  onOpenChange(false)
                }}
              >
                {c.name}
              </button>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop */}
      <div className="hidden lg:flex items-center space-x-6">
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => onSelect(c.id)}
            className={`text-sm transition-colors ${
              selected === c.id
                ? "text-stone-900 font-medium border-b border-stone-300"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </>
  )
}
