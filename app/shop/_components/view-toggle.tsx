"use client"

import { LayoutGrid, Grid3x3 } from "lucide-react"
import { Button } from "@/components/ui/button"

type GridDensity = "comfortable" | "compact"

interface ViewToggleProps {
  value: GridDensity
  onChange: (value: GridDensity) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border border-stone-200 bg-white">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange("compact")}
        aria-label="Compact grid"
        aria-pressed={value === "compact"}
        className={value === "compact" ? "text-stone-900" : "text-stone-400"}
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange("comfortable")}
        aria-label="Comfortable grid"
        aria-pressed={value === "comfortable"}
        className={value === "comfortable" ? "text-stone-900" : "text-stone-400"}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  )
}