// "use client";

// import { Checkbox } from "@/components/ui/checkbox";
// import { Slider } from "@/components/ui/slider";
// import { formatPrice } from "@/hooks/use-price";
// import { ChevronDown, ChevronRight } from "lucide-react";
// import { useState } from "react";

// type FilterOption = {
//   label: string;
//   value: string;
// };

// interface FilterSectionProps {
//   title: string;
//   options: FilterOption[];
//   selected: string[];
//   onChange: (newValues: string[]) => void;
// }

// function FilterSection({
//   title,
//   options,
//   selected,
//   onChange,
// }: FilterSectionProps) {
//   const [open, setOpen] = useState(true);

//   const toggle = (value: string) => {
//     if (selected.includes(value)) {
//       onChange(selected.filter((v) => v !== value));
//     } else {
//       onChange([...selected, value]);
//     }
//   };

//   return (
//     <div className="py-4 border-b border-stone-200">
//       <button
//         type="button"
//         onClick={() => setOpen(!open)}
//         className="flex w-full items-center justify-between"
//       >
//         <span className="text-sm font-medium text-stone-800">{title}</span>
//         {open ? (
//           <ChevronDown className="w-4 h-4 text-stone-600" />
//         ) : (
//           <ChevronRight className="w-4 h-4 text-stone-600" />
//         )}
//       </button>

//       {open && (
//         <div className="mt-3 space-y-3">
//           {options.map((option) => (
//             <label
//               key={option.value}
//               className="flex items-center gap-3 text-sm text-stone-700 cursor-pointer"
//             >
//               <Checkbox
//                 checked={selected.includes(option.value)}
//                 onCheckedChange={() => toggle(option.value)}
//                 className="border-stone-400 data-[state=checked]:bg-stone-800"
//               />
//               {option.label}
//             </label>
//           ))}
//         </div>
//       )}
//     </div>
//   );

// }

// // ---------------------------------------------
// // SIDEBAR
// // ---------------------------------------------

// export interface FilterSidebarProps {
//   fabrics: string[];
//   sizes: string[];
//   colors: string[];

//   selectedFabric: string[];
//   setSelectedFabric: (value: string[]) => void;

//   selectedSizes: string[];
//   setSelectedSizes: (value: string[]) => void;

//   selectedColors: string[];
//   setSelectedColors: (value: string[]) => void;

//   selectedPrice: [number, number] | null;
//   setSelectedPrice: (value: [number, number]) => void;

//   priceBounds: [number, number];
//   currency?: string;
// }


// export function FilterSidebar({
//   fabrics,
//   sizes,
//   colors,
//   selectedFabric,
//   setSelectedFabric,
//   selectedSizes,
//   setSelectedSizes,
//   selectedColors,
//   setSelectedColors,
//   selectedPrice,
//   setSelectedPrice,
//   priceBounds,
//   currency,
// }: FilterSidebarProps) {
//   const [minBound, maxBound] = priceBounds;

//   return (
//     <aside className="hidden lg:block w-64 pr-6 sticky top-24">
//       {/* FABRIC */}
//       <FilterSection
//         title="Fabric"
//         options={fabrics.map((f) => ({ label: f, value: f }))}
//         selected={selectedFabric}
//         onChange={setSelectedFabric}
//       />

//       {/* SIZE */}
//       <FilterSection
//         title="Size"
//         options={sizes.map((s) => ({ label: s, value: s }))}
//         selected={selectedSizes}
//         onChange={setSelectedSizes}
//       />

//       {/* COLOR */}
//       <FilterSection
//         title="Color"
//         options={colors.map((c) => ({ label: c, value: c }))}
//         selected={selectedColors}
//         onChange={setSelectedColors}
//       />

//       {/* PRICE */}
//       <div className="py-4">
//         <p className="text-sm font-medium text-stone-800 mb-4">Price</p>

//         <Slider
//           value={selectedPrice ?? priceBounds}
//           onValueChange={(value) =>
//             setSelectedPrice(value as [number, number])
//           }
//           min={minBound}
//           max={maxBound}
//           step={Math.max(1, Math.floor((maxBound - minBound) / 100))}
//         />

//         <div className="flex justify-between mt-3 text-sm text-stone-600">
//           <span>
//             {formatPrice({
//               amount: selectedPrice?.[0] ?? minBound,
//               currencyCode: currency,
//             })}
//           </span>
//           <span>
//             {formatPrice({
//               amount: selectedPrice?.[1] ?? maxBound,
//               currencyCode: currency,
//             })}
//           </span>
//         </div>
//       </div>
//     </aside>
//   );
// }


"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { formatPrice } from "@/hooks/use-price";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: FilterSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

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
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 ${active
          ? "bg-stone-900 text-white shadow-sm"
          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
        }`}
    >
      {label}
    </button>
  );
}

function SizeChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-3 text-xs font-medium transition-all duration-200 ${active
          ? "bg-stone-900 text-white shadow-sm"
          : "bg-stone-100 text-stone-700 hover:bg-stone-200"
        }`}
    >
      {label}
    </button>
  );
}

function toggleValue(
  arr: string[],
  val: string,
  setter: (value: string[]) => void
) {
  setter(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
}

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

  const priceRange = selectedPrice ?? priceBounds;

  const activeCount =
    selectedFabric.length +
    selectedSizes.length +
    selectedColors.length +
    (selectedPrice &&
      (selectedPrice[0] !== minBound || selectedPrice[1] !== maxBound)
      ? 1
      : 0);

  const clearAll = () => {
    setSelectedFabric([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedPrice([minBound, maxBound]);
  };

  return (
    <aside className="sticky top-24 hidden w-60 shrink-0  py-5 lg:block">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-base font-medium tracking-tight text-stone-900">
          Filters
        </h2>

        {activeCount > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-stone-500 transition-colors hover:text-stone-900"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <FilterSection title="Fabric">
        <div className="flex flex-wrap gap-2">
          {fabrics.map((fabric) => (
            <Chip
              key={fabric}
              label={fabric}
              active={selectedFabric.includes(fabric)}
              onClick={() =>
                toggleValue(selectedFabric, fabric, setSelectedFabric)
              }
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
              onClick={() =>
                toggleValue(selectedColors, color, setSelectedColors)
              }
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
            <span>
              {formatPrice({
                amount: priceRange[0],
                currencyCode: currency,
              })}
            </span>
            <span>
              {formatPrice({
                amount: priceRange[1],
                currencyCode: currency,
              })}
            </span>
          </div>
        </div>
      </FilterSection>
    </aside>
  );
}