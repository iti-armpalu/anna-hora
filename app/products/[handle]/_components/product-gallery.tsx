"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronUp, ChevronDown } from "lucide-react"
import type { ProductImageNormalized } from "@/lib/shopify/types/product-normalized"

const THUMB_WIDTH = 100
const THUMB_HEIGHT = THUMB_WIDTH * (5 / 4)
const VISIBLE_THUMBS = 5
const GAP = 8
const THUMB_VIEWPORT_HEIGHT = THUMB_HEIGHT * VISIBLE_THUMBS + GAP * (VISIBLE_THUMBS - 1)

interface ProductGalleryProps {
    images: ProductImageNormalized[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const [thumbOffset, setThumbOffset] = useState(0)
    const [zoomed, setZoomed] = useState(false)
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
    const mainRef = useRef<HTMLDivElement>(null)

    const maxOffset = Math.max(0, images.length - VISIBLE_THUMBS)
    const visibleImages = images.slice(thumbOffset, thumbOffset + VISIBLE_THUMBS)
    const activeImage = images[activeIndex]

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!zoomed || !mainRef.current) return
        const rect = mainRef.current.getBoundingClientRect()
        setZoomPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        })
    }

    // Remove the h-6 arrow buttons from the column flow
    // and make the thumbnail container start at the same top as the main image

    return (
        <div className="lg:sticky lg:top-24 flex gap-3 items-start">

            {/* Thumbnail strip */}
            {images.length > 1 && (
                <div className="relative flex flex-col shrink-0" style={{ width: THUMB_WIDTH }}>

                    {/* Thumbnails */}
                    <div
                        className="flex flex-col overflow-hidden"
                        style={{ gap: GAP, height: THUMB_VIEWPORT_HEIGHT }}
                    >
                        {visibleImages.map((image, i) => {
                            const realIndex = i + thumbOffset
                            return (
                                <button
                                    key={image.url}
                                    onClick={() => {
                                        setActiveIndex(realIndex)
                                        setZoomed(false)
                                    }}
                                    aria-label={`View image ${realIndex + 1}`}
                                    className={`relative shrink-0 overflow-hidden transition-all duration-200 ${realIndex === activeIndex
                                            ? "opacity-100"
                                            : "opacity-35 hover:opacity-70"
                                        }`}
                                    style={{ width: THUMB_WIDTH, height: THUMB_HEIGHT }}
                                >
                                    <Image
                                        src={image.url}
                                        alt={image.altText ?? `Product image ${realIndex + 1}`}
                                        fill
                                        className="object-cover"
                                        sizes={`${THUMB_WIDTH}px`}
                                    />
                                </button>
                            )
                        })}
                    </div>

                    {/* Arrows below thumbnails */}
                    {maxOffset > 0 && (
                        <div className="flex flex-col items-center gap-1 mt-2">
                            <button
                                onClick={() => setThumbOffset((p) => Math.max(0, p - 1))}
                                disabled={thumbOffset === 0}
                                aria-label="Scroll thumbnails up"
                                className={`text-stone-400 transition-opacity ${thumbOffset === 0 ? "opacity-20 pointer-events-none" : "hover:opacity-100 opacity-50"
                                    }`}
                            >
                                <ChevronUp size={14} />
                            </button>
                            <button
                                onClick={() => setThumbOffset((p) => Math.min(maxOffset, p + 1))}
                                disabled={thumbOffset >= maxOffset}
                                aria-label="Scroll thumbnails down"
                                className={`text-stone-400 transition-opacity ${thumbOffset >= maxOffset ? "opacity-20 pointer-events-none" : "hover:opacity-100 opacity-50"
                                    }`}
                            >
                                <ChevronDown size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Main image */}
            <div className="flex-1">
                <div
                    ref={mainRef}
                    className={`relative aspect-[4/5] overflow-hidden bg-stone-50 ${zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                        }`}
                    onClick={() => {
                        setZoomed((p) => !p)
                        setZoomPos({ x: 50, y: 50 })
                    }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={() => setZoomed(false)}
                >
                    {activeImage && (
                        <Image
                            src={activeImage.url}
                            alt={activeImage.altText ?? "Product image"}
                            fill
                            className="object-cover transition-transform duration-300 ease-out"
                            style={
                                zoomed
                                    ? {
                                        transform: "scale(2.5)",
                                        transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                    }
                                    : { transform: "scale(1)" }
                            }
                            priority
                            sizes="(min-width: 1024px) 45vw, 100vw"
                            draggable={false}
                        />
                    )}

                    {!zoomed && (
                        <span className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm text-stone-500 text-xs px-2 py-1 pointer-events-none">
                            Click to zoom
                        </span>
                    )}

                    {images.length > 1 && (
                        <span className="absolute bottom-3 left-3 text-xs text-stone-400 bg-white/80 backdrop-blur-sm px-2 py-1 pointer-events-none">
                            {activeIndex + 1} / {images.length}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}