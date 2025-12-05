"use client"

import React, { useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import useEmblaCarousel from "embla-carousel-react"
import { ProductNormalized } from "@/lib/shopify/types/product-normalized"

type ProductImageCarouselProps = {
    product: ProductNormalized;
};

export default function ProductImageCarousel({ product }: ProductImageCarouselProps) {
    const [imageError, setImageError] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [currentIndex, setCurrentIndex] = useState(0)

    const images =
        product.images.length > 0
            ? product.images
            : [{ url: "/placeholder.svg", altText: "Placeholder" }];

    const scrollPrev = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (emblaApi) emblaApi.scrollPrev()
        },
        [emblaApi],
    )

    const scrollNext = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            if (emblaApi) emblaApi.scrollNext()
        },
        [emblaApi],
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setCurrentIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    React.useEffect(() => {
        if (!emblaApi) return

        emblaApi.on("select", onSelect)
        onSelect()

        return () => {
            emblaApi.off("select", onSelect)
        }
    }, [emblaApi, onSelect])

    return (
        <div className="relative w-full h-full">
            <div className="embla overflow-hidden h-full" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {images.map((image, index) => (
                        <div key={index} className="embla__slide relative w-full flex-[0_0_100%] h-full">
                            <div className="relative w-full h-full aspect-[3/4]">
                                <Image
                                    src={imageError ? "/placeholder.svg" : image.url}
                                    alt={`image.title - Image ${index + 1}`}
                                    width={768}
                                    height={1024}
                                    className="object-cover w-full h-full"
                                    onError={() => setImageError(true)}
                                    sizes="(max-width: 768px) 100vw, 33vw"

                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={scrollPrev}
                        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white w-8 h-8 z-10"
                    >
                        <ChevronLeft className="w-4 h-4 text-stone-600" />
                    </Button>
                    <Button
                        size="icon"
                        variant="secondary"
                        onClick={scrollNext}
                        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white w-8 h-8 z-10"
                    >
                        <ChevronRight className="w-4 h-4 text-stone-600" />
                    </Button>
                </>
            )}

            {images.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white w-4" : "bg-white/50"
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
