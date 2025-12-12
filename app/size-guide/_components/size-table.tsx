import { Card, CardContent } from "@/components/ui/card"
import type { SizeGuideContent } from "../_data"

interface SizeTableProps {
  category: SizeGuideContent["sizeCategories"][0]
}

export function SizeTable({ category }: SizeTableProps) {
  const sizeColumns = ["xs", "s", "m", "l", "xl"] as const

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-serif text-3xl text-stone-900 mb-3">{category.category}</h2>
        {category.description && <p className="text-stone-600 mb-4 leading-relaxed">{category.description}</p>}
      </div>

      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-stone-200">
              {category.table.headers.map((header, index) => (
                <th key={index} className="text-left py-4 px-4 font-medium text-stone-900 bg-stone-50">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {category.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-stone-100 hover:bg-stone-50/50">
                <td className="py-3 px-4 font-medium text-stone-900">{row.measurement}</td>
                {sizeColumns.map((size) =>
                  row[size] ? (
                    <td key={size} className="py-3 px-4 text-stone-600">
                      {row[size]}
                    </td>
                  ) : null,
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {category.fitNotes && (
        <Card className="border-stone-200 bg-stone-50">
          <CardContent className="p-6">
            <p className="text-stone-600 leading-relaxed italic">{category.fitNotes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
