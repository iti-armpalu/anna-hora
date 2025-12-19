import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export function CartEmptyState() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <ShoppingBag className="h-24 w-24 text-stone-300 mx-auto mb-6" />

      <h2 className="text-2xl font-serif text-stone-800 mb-4">
        Your bag is empty
      </h2>

      <p className="text-stone-600 mb-8 max-w-md mx-auto">
        Discover our collection of premium silk loungewear, crafted for moments
        of quiet luxury.
      </p>

      <Link href="/shop">
        <Button className="bg-anna-green-950 hover:bg-stone-700 text-white px-8">
          Continue Shopping
        </Button>
      </Link>
    </div>
  );
}
