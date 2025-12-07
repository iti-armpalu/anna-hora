"use client"

import Image from "next/image"
import { X } from "lucide-react"

import { Money } from "./money";
import { QuantityControl } from "./quantity-control";
import { Button } from "../ui/button";


export interface CartLine {
  id: number; name: string; image: string; color: string; size: string;
  price: number; quantity: number; stock: number
}

export function CartLineItem({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: CartLine
  onRemove: (id: number) => void
  onQuantityChange: (id: number, next: number) => void
}) {
  return (
    <div className="flex gap-6">
      <div className="relative w-32 h-40 flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" sizes="128px" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-serif text-xl text-stone-800 mb-1">{item.name}</h3>
            <p className="text-sm text-stone-600">{item.color} • {item.size}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-stone-400 hover:text-stone-600"
            onClick={() => onRemove(item.id)}
            aria-label={`Remove ${item.name}`}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        {item.stock <= 3 && (
          <p className="text-sm text-amber-600 mb-4">Only {item.stock} left in stock</p>
        )}

        <div className="flex items-center justify-between mt-4">
          <QuantityControl
            quantity={item.quantity}
            min={1}
            max={item.stock}
            onChange={(next) => onQuantityChange(item.id, next)}
            label={item.name}
          />
          <span className="font-medium text-xl text-stone-800">
            <Money amount={item.price * item.quantity} />
          </span>
        </div>
      </div>
    </div>
  )
}
