"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  value: "newest" | "price-low" | "price-high" | "bestsellers"
  onChange: (val: Props["value"]) => void
}

export function SortControl({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Props["value"])}>
      {/* Borderless trigger styled as a toolbar label; the dropdown items stay in sentence case */}
      <SelectTrigger
        aria-label="Sort products"
        className="h-9 gap-2 border-0 bg-transparent px-0 text-xs uppercase tracking-widest text-foreground"
      >
        <span className="text-muted-foreground">Sort:</span>
        <SelectValue placeholder="Newest" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="bestsellers">Bestsellers</SelectItem>
      </SelectContent>
    </Select>
  )
}