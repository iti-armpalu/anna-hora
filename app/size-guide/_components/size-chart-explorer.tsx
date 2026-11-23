"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { EDITS, GARMENTS, sizeGuideContent, type Edit, type Garment, type SizeCategory } from "../_data"
import { SizeTable } from "./size-table"

type Props = {
  /** Chart to open on, e.g. from the product page's "View full size guide" link */
  initialCategory: SizeCategory
}

type OptionRowProps<T extends string> = {
  label: string
  options: { id: T; label: string }[]
  value: T
  isAvailable: (id: T) => boolean
  onChange: (id: T) => void
}

function OptionRow<T extends string>({ label, options, value, isAvailable, onChange }: OptionRowProps<T>) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2" role="group" aria-label={label}>
      <span className="label-uppercase w-20 shrink-0">{label}</span>
      {options.filter(({ id }) => isAvailable(id)).map((option) => (
        <button
          key={option.id}
          type="button"
          onClick={() => onChange(option.id)}
          aria-pressed={value === option.id}
          className={cn(
            "text-small transition-colors",
            value === option.id
              ? "text-foreground underline underline-offset-8 decoration-1"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

/** Pick an Edit and a garment to see one chart at a time, instead of scrolling through all nine. */
export function SizeChartExplorer({ initialCategory }: Props) {
  const { sizeCategories, ui } = sizeGuideContent
  const [edit, setEdit] = useState<Edit>(initialCategory.edit)
  const [garment, setGarment] = useState<Garment>(initialCategory.garment)

  const findChart = (e: Edit, g: Garment): SizeCategory | undefined =>
    sizeCategories.find((c) => c.edit === e && c.garment === g)

  function handleEditChange(nextEdit: Edit): void {
    setEdit(nextEdit)
    // Keep the garment if this Edit has it; otherwise fall back to the Edit's first chart
    if (!findChart(nextEdit, garment)) {
      const first = sizeCategories.find((c) => c.edit === nextEdit)
      if (first) setGarment(first.garment)
    }
  }

  const chart = findChart(edit, garment) ?? initialCategory

  return (
    <div className="flex flex-col gap-block">
      <div className="flex flex-col gap-field border-b border-border pb-block">
        <OptionRow
          label={ui.editLabel}
          options={EDITS}
          value={edit}
          isAvailable={(id) => sizeCategories.some((c) => c.edit === id)}
          onChange={handleEditChange}
        />
        <OptionRow
          label={ui.garmentLabel}
          options={GARMENTS}
          value={garment}
          isAvailable={(id) => Boolean(findChart(edit, id))}
          onChange={setGarment}
        />
      </div>

      <div className="flex flex-col gap-field">
        <h3 className="text-heading-sm mb-0" aria-live="polite">
          {chart.category}
        </h3>
        {/* key: reset the unit toggle state cleanly when switching charts */}
        <SizeTable key={chart.id} category={chart} />
      </div>
    </div>
  )
}
