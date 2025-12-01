"use client"

import { useState } from "react"
import Image from "next/image"
import ProductLightbox from "./product-lightbox"
import { ProductImage } from "@/lib/shopify/types/product"

interface ProductGalleryProps {
    images: ProductImage[];
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const openLightbox = (index: number) => {
        setActiveIndex(index);
        setLightboxOpen(true);
    };

    return (
        <>
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto space-y-4 scrollbar-hide">
                {/* <div className="grid grid-cols-2 gap-1"> */}
                <div className="grid grid-cols-1 gap-1">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative aspect-[4/5] overflow-hidden bg-white cursor-zoom-in"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={image.url}
                                alt={image.altText ?? ""}
                                fill
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay lightbox */}
            <ProductLightbox
                images={images}
                open={lightboxOpen}
                activeIndex={activeIndex}
                onClose={() => setLightboxOpen(false)}
            />
        </>
    )
}
