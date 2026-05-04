"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"

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
            diff > 0
                ? setIndex((i) => (i === images.length - 1 ? 0 : i + 1))
                : setIndex((i) => (i === 0 ? images.length - 1 : i - 1))
        }
        touchStartX.current = null
    }

    return (
        <div
            className="relative w-full h-full overflow-hidden"
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
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronLeft className="w-4 h-4 text-stone-600" />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next image"
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white w-8 h-8 flex items-center justify-center"
                    >
                        <ChevronRight className="w-4 h-4 text-stone-600" />
                    </button>
                </>
            )}

            {/* Dots */}
            {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {images.map((image, i) => (
                        <div
                            key={image.url}
                            className={`h-1.5 rounded-full transition-all duration-300 bg-white ${i === index ? "w-4 opacity-100" : "w-1.5 opacity-50"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}