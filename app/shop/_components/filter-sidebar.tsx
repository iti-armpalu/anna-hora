"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/hooks/use-price";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type FilterOption = {
  label: string;
  value: string;
};

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selected: string[];
  onChange: (newValues: string[]) => void;
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
}: FilterSectionProps) {
  const [open, setOpen] = useState(true);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="py-4 border-b border-stone-200">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between"
      >
        <span className="text-sm font-medium text-stone-800">{title}</span>
        {open ? (
          <ChevronDown className="w-4 h-4 text-stone-600" />
        ) : (
          <ChevronRight className="w-4 h-4 text-stone-600" />
        )}
      </button>

      {open && (
        <div className="mt-3 space-y-3">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer"
            >
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggle(option.value)}
                className="border-stone-400 data-[state=checked]:bg-stone-800"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------
// SIDEBAR
// ---------------------------------------------

export interface FilterSidebarProps {
  fabrics: string[];
  sizes: string[];
  colors: string[];

  selectedFabric: string[];
  setSelectedFabric: (value: string[]) => void;

  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;

  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;

  selectedPrice: [number, number] | null;
  setSelectedPrice: (value: [number, number]) => void;

  priceBounds: [number, number];
  currency?: string;
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
}: FilterSidebarProps) {
  const [minBound, maxBound] = priceBounds;

  return (
    <aside className="hidden lg:block w-64 p-6 sticky top-24">
      {/* FABRIC */}
      <FilterSection
        title="Fabric"
        options={fabrics.map((f) => ({ label: f, value: f }))}
        selected={selectedFabric}
        onChange={setSelectedFabric}
      />

      {/* SIZE */}
      <FilterSection
        title="Size"
        options={sizes.map((s) => ({ label: s, value: s }))}
        selected={selectedSizes}
        onChange={setSelectedSizes}
      />

      {/* COLOR */}
      <FilterSection
        title="Color"
        options={colors.map((c) => ({ label: c, value: c }))}
        selected={selectedColors}
        onChange={setSelectedColors}
      />

      {/* PRICE */}
      <div className="py-4">
        <p className="text-sm font-medium text-stone-800 mb-4">Price</p>

        <Slider
          value={selectedPrice ?? priceBounds}
          onValueChange={(value) =>
            setSelectedPrice(value as [number, number])
          }
          min={minBound}
          max={maxBound}
          step={Math.max(1, Math.floor((maxBound - minBound) / 100))}
        />

        <div className="flex justify-between mt-3 text-sm text-stone-600">
          <span>
            {formatPrice({
              amount: selectedPrice?.[0] ?? minBound,
              currencyCode: currency,
            })}
          </span>
          <span>
            {formatPrice({
              amount: selectedPrice?.[1] ?? maxBound,
              currencyCode: currency,
            })}
          </span>
        </div>
      </div>
    </aside>
  );
}
