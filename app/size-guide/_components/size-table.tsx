// app/size-guide/_components/SizeTable.tsx
"use client"

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SizeCategory, Unit } from "../_data"

type Props = {
  category: SizeCategory
  defaultUnit?: Unit
}

export function SizeTable({ category, defaultUnit = "cm" }: Props) {
  const [unit, setUnit] = React.useState<Unit>(defaultUnit)

  const table = category.tables[unit]
  const headers = table.headers
  const sizeHeaders = headers.slice(1)
  const sizeKeys = sizeHeaders.map((h) => h.toLowerCase())

  return (
    <section aria-labelledby={`size-${category.id}`}>
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h2 id={`size-${category.id}`} className="font-serif text-3xl text-stone-900">
            {category.category}
          </h2>

          {category.description && (
            <p className="mt-2 text-stone-600 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>

        {/* Unit toggle */}
        <div className="flex rounded-lg border border-stone-200 bg-white p-1">
          <Button
            size="sm"
            variant={unit === "cm" ? "default" : "ghost"}
            onClick={() => setUnit("cm")}
          >
            cm
          </Button>
          <Button
            size="sm"
            variant={unit === "in" ? "default" : "ghost"}
            onClick={() => setUnit("in")}
          >
            in
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-stone-200">
        <table className="min-w-[640px] w-full border-collapse text-sm">
          <thead>
            <tr className="bg-stone-50 border-b border-stone-200">
              {headers.map((header, index) => (
                <th
                  key={header}
                  className={`px-4 py-3 text-left font-medium text-stone-900 whitespace-nowrap ${index === 0 ? "sticky left-0 bg-stone-50 z-10" : ""
                    }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {table.rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-stone-100 hover:bg-stone-50/50"
              >
                <td className="px-4 py-3 font-medium text-stone-900 whitespace-nowrap sticky left-0 bg-white">
                  {row.measurement}
                </td>

                {sizeKeys.map((key) => (
                  <td
                    key={key}
                    className="px-4 py-3 text-stone-700 whitespace-nowrap"
                  >
                    {row[key] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Fit notes */}
      {category.fitNotes && (
        <div>
          <ul className="list-disc pl-4 space-y-1 mt-2 text-xs text-stone-600 leading-relaxed italic">
            <li>{category.fitNotes}</li>
          </ul>
        </div>
      )}
    </section>
  )
}