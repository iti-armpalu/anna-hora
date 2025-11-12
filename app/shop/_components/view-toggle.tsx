"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"

type Props = {
  value: "grid" | "list"
  onChange: (mode: "grid" | "list") => void
}

export function ViewToggle({ value, onChange }: Props) {
  return (
    <div className="hidden sm:flex items-center space-x-1 border border-stone-300 rounded-md">
      <Button
        variant={value === "grid" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("grid")}
        className="rounded-r-none"
      >
        <Grid3X3 className="w-4 h-4" />
      </Button>
      <Button
        variant={value === "list" ? "default" : "ghost"}
        size="sm"
        onClick={() => onChange("list")}
        className="rounded-l-none"
      >
        <List className="w-4 h-4" />
      </Button>
    </div>
  )
}
