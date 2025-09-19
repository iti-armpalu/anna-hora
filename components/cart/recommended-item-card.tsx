import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Money } from "./money";


export function RecommendedItemCard({
  name, price, image, subtitle, onAdd,
}: {
  name: string; price: number; image: string; subtitle?: string;
  onAdd?: () => void // pass from a client parent when needed
}) {
  return (
    <div className="border border-stone-200 rounded-lg overflow-hidden bg-white group">
      <div className="relative aspect-[3/4]">
        <Image src={image || "/placeholder.svg"} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 1024px) 50vw, 320px" />
      </div>
      <div className="p-4">
        <h4 className="font-serif text-stone-800 mb-1">{name}</h4>
        {subtitle && <p className="text-sm text-stone-600 mb-3">{subtitle}</p>}
        <div className="flex items-center justify-between">
          <span className="font-medium text-stone-800"><Money amount={price} /></span>
          {onAdd && (
            <Button size="sm" className="bg-stone-800 hover:bg-stone-700 text-white" onClick={onAdd}>
              Add to Bag
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
