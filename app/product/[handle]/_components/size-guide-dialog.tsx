"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { sizeGuideData } from "../_data"
import { useState } from "react"

interface SizeGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SizeGuideDialog({ open, onOpenChange }: SizeGuideProps) {
  const [unit, setUnit] = useState<"cm" | "inches">("cm")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-stone-600 hover:text-stone-800 p-0 underline">
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{sizeGuideData.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-stone-600">{sizeGuideData.description}</p>
            <div className="flex items-center gap-1 bg-stone-100 rounded-md p-1">
              <button
                onClick={() => setUnit("cm")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  unit === "cm" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                CM
              </button>
              <button
                onClick={() => setUnit("inches")}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  unit === "inches" ? "bg-white text-stone-900 shadow-sm" : "text-stone-600 hover:text-stone-900"
                }`}
              >
                IN
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200">
                  {sizeGuideData.headers.map((header) => (
                    <th key={header} className="text-left py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sizeGuideData.measurements.map((row, index) => (
                  <tr
                    key={row.size}
                    className={index < sizeGuideData.measurements.length - 1 ? "border-b border-stone-100" : ""}
                  >
                    <td className="py-2">{row.size}</td>
                    <td className="py-2">{row.bust[unit]}</td>
                    <td className="py-2">{row.length[unit]}</td>
                    <td className="py-2">{row.sleeve[unit]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-stone-500 pt-2 border-t border-stone-200">
            Keep in mind we offer free returns within 30 days.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
