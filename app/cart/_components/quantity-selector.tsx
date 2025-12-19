"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Optional: only import CartContext if caller wants to use cart mode
import { useCart } from "@/context/cart-context";

interface QuantitySelectorProps {
  value: number;
  lineId?: string; // required if using CartContext mode
  onChange?: (qty: number) => void | Promise<void>;
  variant?: "compact" | "default" | "large";
  disabled?: boolean;
  loading?: boolean;
}

export function QuantitySelector({
  value,
  lineId,
  onChange,
  variant = "default",
  disabled = false,
  loading,
}: QuantitySelectorProps) {
  const cart = useCart(); // optional usage

  // Style variants
  const sizeClasses = {
    compact: "h-6 w-6 text-xs",
    default: "h-7 w-7 text-sm",
    large: "h-9 w-9 text-base",
  };

  const textClasses = {
    compact: "text-xs min-w-[1.5rem]",
    default: "text-sm min-w-[2rem]",
    large: "text-base min-w-[2.25rem]",
  };

  // Decide mode:
  // If `lineId` exists and cart context is present → cart mode
  // Otherwise → external (product page) mode
  const isCartMode = lineId && cart;

  async function handleIncrease() {
    const newQty = value + 1;

    if (isCartMode) {
      const result = await cart.updateQuantity(lineId!, newQty);

      if (!result.success || result.quantity === value) {
        toast.info("No more available", {
          description: "You've reached the maximum available quantity.",
        });
      }
    } else if (onChange) {
      onChange(newQty);
    }
  }

  async function handleDecrease() {
    const newQty = value - 1;
    if (newQty < 1) return;

    if (isCartMode) {
      await cart.updateQuantity(lineId!, newQty);
    } else if (onChange) {
      onChange(newQty);
    }
  }

  const isDisabledDecrease = disabled || value <= 1 || loading;
  const isDisabledIncrease = disabled || loading;

  return (
    <div className="flex items-center border border-stone-300 rounded-md">
      <Button
        variant="ghost"
        size="icon"
        disabled={isDisabledDecrease}
        onClick={handleDecrease}
        className={cn("rounded-none", sizeClasses[variant])}
      >
        <Minus className="h-3 w-3" />
      </Button>

      <span
        className={cn(
          "px-3 py-1 font-medium text-center",
          textClasses[variant]
        )}
      >
        {value}
      </span>

      <Button
        variant="ghost"
        size="icon"
        disabled={isDisabledIncrease}
        onClick={handleIncrease}
        className={cn("rounded-none", sizeClasses[variant])}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  );
}
