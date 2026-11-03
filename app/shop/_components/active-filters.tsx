"use client"

import { X } from "lucide-react"

export interface ActiveFilterChip {
  /** Unique per chip, e.g. "fabric:Mulberry Silk" */
  id: string
  label: string
  onRemove: () => void
}

interface Props {
  chips: ActiveFilterChip[]
  onClearAll: () => void
}

/**
 * Applied filters above the grid — always visible, even when the sidebar is closed
 * or on mobile, so shoppers can see and undo each filter individually.
 */
export function ActiveFilters({ chips, onClearAll }: Props) {
  if (!chips.length) return null

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Applied filters">
      {chips.map((chip) => (
        <button
          key={chip.id}
          type="button"
          onClick={chip.onRemove}
          aria-label={`Remove filter: ${chip.label}`}
          className="inline-flex h-8 items-center gap-2 border border-input px-3 text-xs text-foreground transition-colors hover:border-foreground"
        >
          {chip.label}
          <X className="h-3 w-3 text-muted-foreground" aria-hidden="true" />
        </button>
      ))}

      {/* Only worth offering once there's more than one thing to clear */}
      {chips.length > 1 && (
        <button
          type="button"
          onClick={onClearAll}
          className="ml-2 text-xs uppercase tracking-widest text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Clear all
        </button>
      )}
    </div>
  )
}
