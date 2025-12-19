"use client";

import Image from "next/image";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { QuantitySelector } from "./quantity-selector";
import { formatPrice } from "@/hooks/use-price";

export type CartLineItemVariant = "page" | "drawer";

type CartLineItemProps = {
  variant: CartLineItemVariant;

  id: string;
  title: string;
  image?: string | null;
  size?: string | null;

  quantity: number;
  totalAmount: number;
  currencyCode: string;

  loading: boolean;
  onRemove: (id: string) => void;
};

export function CartLineItem({
  variant,
  id,
  title,
  image,
  size,
  quantity,
  totalAmount,
  currencyCode,
  loading,
  onRemove,
}: CartLineItemProps) {
  const isDrawer = variant === "drawer";

  const formattedTotal = formatPrice({
    amount: totalAmount,
    currencyCode,
  });

  return (
    <Card
      className={
        isDrawer
          ? "border-0 shadow-none bg-transparent"
          : "border-0 shadow-sm bg-white"
      }
    >
      <CardContent className={isDrawer ? "p-0" : "p-6"}>
        <div className="flex gap-4">
          {/* Image */}
          <div
            className={
              isDrawer
                ? "relative w-20 aspect-[3/4] overflow-hidden rounded-md"
                : "relative w-32 h-40 overflow-hidden rounded-lg"
            }
          >
            <Image
              src={image ?? "/placeholder.svg"}
              alt={title}
              fill
              sizes={isDrawer ? "80px" : "128px"}
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4 mb-1">
              <h3
                className={
                  isDrawer
                    ? "font-serif text-sm text-stone-800 leading-tight"
                    : "font-serif text-xl text-stone-800"
                }
              >
                {title}
              </h3>

              <Button
                variant="ghost"
                size="icon"
                aria-label={`Remove ${title} from cart`}
                className={
                  isDrawer
                    ? "h-6 w-6 text-stone-400 hover:text-stone-600"
                    : "text-stone-400 hover:text-stone-600"
                }
                onClick={() => onRemove(id)}
              >
                <X className={isDrawer ? "h-3 w-3" : "h-4 w-4"} />
              </Button>
            </div>

            {size && (
              <p
                className={
                  isDrawer
                    ? "text-xs text-stone-600 mb-2"
                    : "text-sm text-stone-600 mb-2"
                }
              >
                Size: {size}
              </p>
            )}

            <div className="flex items-center justify-between">
              <QuantitySelector
                value={quantity}
                lineId={id}
                variant={isDrawer ? "compact" : "large"}
                loading={loading}
              />

              <span
                className={
                  isDrawer
                    ? "font-medium text-sm text-stone-800"
                    : "font-medium text-xl text-stone-800"
                }
              >
                {formattedTotal}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
