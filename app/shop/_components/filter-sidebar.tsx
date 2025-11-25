"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronRight } from "lucide-react";

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

function FilterSection({ title, options, selected, onChange }: FilterSectionProps) {
  const [open, setOpen] = useState(true);

  const toggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="py-4">
      <button
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
                className="border-stone-400 text-stone-800 data-[state=checked]:bg-stone-800"
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export interface FilterSidebarProps {
  selectedFabric: string[];
  setSelectedFabric: (value: string[]) => void;

  selectedSizes: string[];
  setSelectedSizes: (value: string[]) => void;

  selectedColors: string[];
  setSelectedColors: (value: string[]) => void;

  selectedPrice: [number, number];
  setSelectedPrice: (value: [number, number]) => void;
}

export function FilterSidebar({
  selectedFabric,
  setSelectedFabric,
  selectedSizes,
  setSelectedSizes,
  selectedColors,
  setSelectedColors,
  selectedPrice,
  setSelectedPrice,
}: FilterSidebarProps) {
  return (
    <aside className="hidden lg:block w-64 p-6 sticky top-24">

      {/* FABRIC */}
      <FilterSection
        title="Fabric"
        options={[
          { label: "100% Mulberry Silk", value: "silk" },
          { label: "Silk Blend", value: "blend" },
        ]}
        selected={selectedFabric}
        onChange={setSelectedFabric}
      />

      {/* SIZE */}
      <FilterSection
        title="Size"
        options={[
          { label: "XS", value: "XS" },
          { label: "S", value: "S" },
          { label: "M", value: "M" },
          { label: "L", value: "L" },
        ]}
        selected={selectedSizes}
        onChange={setSelectedSizes}
      />

      {/* COLOR */}
      <FilterSection
        title="Color"
        options={[
          { label: "Black", value: "black" },
          { label: "Ivory", value: "ivory" },
          { label: "Emerald Green", value: "green" },
          { label: "Champagne", value: "champagne" },
        ]}
        selected={selectedColors}
        onChange={setSelectedColors}
      />

      {/* PRICE */}
      <div className="py-4 border-b border-stone-200">
        <p className="text-sm font-medium text-stone-800 mb-4">Price</p>

        <Slider
          value={selectedPrice}
          onValueChange={setSelectedPrice}
          max={500}
          step={5}
          className="mt-2"
        />

        <div className="flex justify-between mt-3 text-sm text-stone-600">
          <span>${selectedPrice[0]}</span>
          <span>${selectedPrice[1]}</span>
        </div>
      </div>

    </aside>
  );
}
