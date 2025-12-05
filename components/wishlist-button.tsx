"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/context/wishlist-context";
import { Button } from "./ui/button";
import { ProductNormalized } from "@/lib/shopify/types/product-normalized";

type WishlistButtonProps = {
  product: ProductNormalized;
};

function getPrimaryImage(product: ProductNormalized): string {
  return (
    product.featuredImage?.url ??
    product.images[0]?.url ??
    "/placeholder.svg"
  );
}


export function WishlistButton({ product }: WishlistButtonProps) {
  const { isInWishlist, add, remove } = useWishlist();

  // Product-level wishlist for now (you can switch to variant later)
  const wishlistId = product.id;
  const active = isInWishlist(wishlistId);

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent navigation from <Link>

    if (active) {
      remove(wishlistId);
    } else {
      add({
        id: wishlistId,
        title: product.title,
        price: product.minPrice,           // normalized
        currencyCode: product.currencyCode, // normalized
        image: getPrimaryImage(product), 
        size: undefined,
      });
    }
  };

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={handleClick}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className="relative rounded-md bg-white/90 shadow-sm p-2
                 transition-all duration-200 hover:bg-white hover:shadow-md active:scale-95"
    >
      <Heart
        className={`h-5 w-5 transition-transform duration-200 ${active
            ? "fill-red-500 stroke-red-500 scale-110"
            : "stroke-stone-700"
          }`}
      />
    </Button>
  );
}
