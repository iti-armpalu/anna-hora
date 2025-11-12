"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  value: "newest" | "price-low" | "price-high" | "bestsellers"
  onChange: (val: Props["value"]) => void
}

export function SortControl({ value, onChange }: Props) {
  return (
    <Select value={value} onValueChange={v => onChange(v as Props["value"])}>
      <SelectTrigger className="w-40 border-stone-300">
        <SelectValue placeholder="Sort by" />
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
