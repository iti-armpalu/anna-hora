"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { SizeCategory, Unit } from "../_data"

const UNITS: Unit[] = ["cm", "in"]

type Props = {
  category: SizeCategory
  defaultUnit?: Unit
}

/**
 * One garment's measurements with a cm/in toggle. Used on the Size guide page and in the
 * product page's size guide dialog — the heading is left to the caller.
 */
export function SizeTable({ category, defaultUnit = "cm" }: Props) {
  const [unit, setUnit] = useState<Unit>(defaultUnit)
  const table = category.tables[unit]
  const sizeKeys = table.headers.slice(1).map((header) => header.toLowerCase())

  return (
    <div className="flex flex-col gap-field">
      <div className="flex items-start justify-between gap-6">
        {category.description && <p className="text-small">{category.description}</p>}
        <div className="ml-auto flex shrink-0 items-center gap-3" role="group" aria-label="Units">
          {UNITS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setUnit(option)}
              aria-pressed={unit === option}
              className={cn(
                "text-xs uppercase tracking-widest transition-colors",
                unit === option ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Scrolls sideways on narrow screens; the measurement column stays pinned */}
      <div className="overflow-x-auto border-y border-border">
        <table className="w-full border-collapse text-small">
          <thead>
            <tr className="border-b border-border">
              {table.headers.map((header, index) => (
                <th
                  key={header}
                  scope="col"
                  className={cn(
                    "whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground",
                    index === 0 && "sticky left-0 z-10 bg-background pl-0"
                  )}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {table.rows.map((row) => (
              <tr key={row.measurement}>
                <th scope="row" className="sticky left-0 whitespace-nowrap bg-background py-3 pr-4 text-left font-normal text-foreground">
                  {row.measurement}
                </th>
                {sizeKeys.map((key) => (
                  <td key={key} className="whitespace-nowrap px-4 py-3 tabular-nums text-foreground">
                    {row[key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {category.fitNotes && <p className="text-xs text-muted-foreground">{category.fitNotes}</p>}
    </div>
  )
}
