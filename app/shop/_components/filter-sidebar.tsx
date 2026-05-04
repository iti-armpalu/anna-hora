"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/hooks/use-price"

interface FilterSectionProps {
  title: string
  defaultOpen?: boolean
  children: React.ReactNode
}

function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-stone-200 py-4">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between text-sm font-medium tracking-wide text-stone-800"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-stone-500" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium transition-all duration-200 ${active
          ? "bg-forest-800 text-white"
          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
        }`}
    >
      {label}
    </button>
  )
}

function SizeChip({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center px-3 text-xs font-medium transition-all duration-200 ${active
          ? "bg-forest-800 text-white"
          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
        }`}
    >
      {label}
    </button>
  )
}

function toggleValue(arr: string[], val: string, setter: (value: string[]) => void) {
  setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val])
}

export interface FilterSidebarProps {
  fabrics: string[]
  sizes: string[]
  colors: string[]
  selectedFabric: string[]
  setSelectedFabric: (value: string[]) => void
  selectedSizes: string[]
  setSelectedSizes: (value: string[]) => void
  selectedColors: string[]
  setSelectedColors: (value: string[]) => void
  selectedPrice: [number, number] | null
  setSelectedPrice: (value: [number, number]) => void
  priceBounds: [number, number]
  currency?: string
  className?: string
}

export function FilterSidebar({
  fabrics,
  sizes,
  colors,
  selectedFabric,
  setSelectedFabric,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedPrice,
  setSelectedPrice,
  priceBounds,
  currency,
  className = "",
}: FilterSidebarProps) {
  const [minBound, maxBound] = priceBounds
  const priceRange = selectedPrice ?? priceBounds

  const activeCount =
    selectedFabric.length +
    selectedSizes.length +
    selectedColors.length +
    (selectedPrice &&
      (selectedPrice[0] !== minBound || selectedPrice[1] !== maxBound)
      ? 1
      : 0)

  const clearAll = () => {
    setSelectedFabric([])
    setSelectedSizes([])
    setSelectedColors([])
    setSelectedPrice([minBound, maxBound])
  }

  return (
    <div className={className}>

      <FilterSection title="Fabric">
        <div className="flex flex-wrap gap-2">
          {fabrics.map((f) => (
            <Chip
              key={f}
              label={f}
              active={selectedFabric.includes(f)}
              onClick={() => toggleValue(selectedFabric, f, setSelectedFabric)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Size">
        <div className="flex flex-wrap gap-1.5">
          {sizes.map((size) => (
            <SizeChip
              key={size}
              label={size}
              active={selectedSizes.includes(size)}
              onClick={() => toggleValue(selectedSizes, size, setSelectedSizes)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Color">
        <div className="flex flex-wrap gap-1.5">
          {colors.map((color) => (
            <Chip
              key={color}
              label={color}
              active={selectedColors.includes(color)}
              onClick={() => toggleValue(selectedColors, color, setSelectedColors)}
            />
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Price">
        <div className="px-1">
          <Slider
            min={minBound}
            max={maxBound}
            step={Math.max(1, Math.floor((maxBound - minBound) / 100))}
            value={priceRange}
            onValueChange={(value) => setSelectedPrice(value as [number, number])}
            className="my-2"
          />
          <div className="mt-2 flex justify-between text-xs text-stone-500">
            <span>{formatPrice({ amount: priceRange[0], currencyCode: currency })}</span>
            <span>{formatPrice({ amount: priceRange[1], currencyCode: currency })}</span>
          </div>
        </div>
      </FilterSection>
    </div>
  )
}