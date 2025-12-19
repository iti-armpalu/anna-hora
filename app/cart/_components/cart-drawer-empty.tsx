"use client";

import { Button } from "@/components/ui/button";

type CartDrawerEmptyProps = {
  onClose: () => void;
};

export function CartDrawerEmpty({ onClose }: CartDrawerEmptyProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
      <h3 className="text-lg font-serif text-stone-800 mb-2">
        Your bag is empty
      </h3>

      <p className="text-stone-600 mb-6 max-w-sm">
        Discover our collection of premium silk loungewear, crafted for moments
        of quiet luxury.
      </p>

      <Button
        onClick={onClose}
        className="bg-anna-green-950 hover:bg-stone-700 text-white"
      >
        Continue Shopping
      </Button>
    </div>
  );
}
