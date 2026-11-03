"use client"

import { LayoutGrid, Grid3x3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type GridDensity = "comfortable" | "compact"

interface ViewToggleProps {
  value: GridDensity
  onChange: (value: GridDensity) => void
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center h-9">
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange("compact")}
        aria-label="Compact grid"
        aria-pressed={value === "compact"}
        className={cn("h-full", value === "compact" ? "text-foreground" : "text-muted-foreground")}
      >
        <Grid3x3 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange("comfortable")}
        aria-label="Comfortable grid"
        aria-pressed={value === "comfortable"}
        className={cn("h-full", value === "comfortable" ? "text-foreground" : "text-muted-foreground")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
    </div>
  )
}