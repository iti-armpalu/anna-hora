"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { cn } from "@/lib/utils"

export default function ProductImageCarousel({ product }: { product: ProductNormalized }) {
    const [index, setIndex] = useState(0)
    const touchStartX = useRef<number | null>(null)

    const images = product.images.length > 0
        ? product.images
        : [{ url: "/placeholder.svg", altText: "Placeholder" }]

    function prev(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
    }

    function next(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
    }

    function onTouchStart(e: React.TouchEvent) {
        touchStartX.current = e.touches[0].clientX
    }

    function onTouchEnd(e: React.TouchEvent) {
        if (touchStartX.current === null) return
        const diff = touchStartX.current - e.changedTouches[0].clientX
        if (Math.abs(diff) > 40) {
            // Swipe left → next image, swipe right → previous
            if (diff > 0) setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
            else setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
        }
        touchStartX.current = null
    }

    return (
        <div
            className="relative w-full aspect-[3/4] overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            {/* Sliding track */}
            <div
                className="flex h-full transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${index * 100}%)` }}
            >
                {images.map((image, i) => (
                    <div
                        key={image.url}
                        className="relative w-full h-full flex-shrink-0"
                        style={{ width: "100%" }}
                    >
                        <Image
                            src={image.url}
                            alt={image.altText || `${product.title} - Image ${i + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            priority={i === 0}
                        />
                    </div>
                ))}
            </div>

            {/* Prev / Next */}
            {images.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        aria-label="Previous image"
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 hover:bg-background w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronLeft className="w-4 h-4 text-foreground" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-background/90 hover:bg-background w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronRight className="w-4 h-4 text-foreground" />
                    </button>
                </>
            )}

            {/* Position indicator — hairline segments, one per image.
                mix-blend-difference keeps them visible on light and dark photos alike. */}
            {images.length > 1 && (
                <div
                    aria-hidden="true"
                    className="absolute inset-x-4 bottom-3 z-10 flex gap-1 mix-blend-difference transition-opacity duration-300 group-hover:opacity-0"
                >
                    {images.map((image, i) => (
                        <div
                            key={image.url}
                            className={cn(
                                "h-0.5 flex-1 bg-white transition-opacity duration-300",
                                i === index ? "opacity-100" : "opacity-30"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}