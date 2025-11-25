"use client";

import Image from "next/image";
import { X, ChevronUp, ChevronDown } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ProductLightboxProps = {
    images: { url: string; altText?: string | null }[];
    open: boolean;
    activeIndex: number;
    onClose: () => void;
};

export default function ProductLightbox({
    images,
    open,
    activeIndex,
    onClose,
}: ProductLightboxProps) {
    const [selectedIndex, setSelectedIndex] = useState(activeIndex);
    const thumbsViewportRef = useRef<HTMLDivElement | null>(null);

    const THUMB_SIZE = 120
    const VISIBLE_THUMBS = 4;
    const GAP = 12;

    const THUMB_VIEWPORT_HEIGHT = THUMB_SIZE * VISIBLE_THUMBS + GAP * (VISIBLE_THUMBS - 1);


    // MAIN CAROUSEL
    const [emblaMainRef, emblaMain] = useEmblaCarousel({ loop: true });

    // THUMBNAIL CAROUSEL (VERTICAL)
    const [emblaThumbsRef, emblaThumbs] = useEmblaCarousel({
        axis: "y",
        dragFree: true,
        // containScroll: false,
        align: "start",
        containScroll: false,
        skipSnaps: true,     // << important!!
    });

    const [canScrollUp, setCanScrollUp] = useState(false);
    const [canScrollDown, setCanScrollDown] = useState(false);

    // Helper: check scroll progress to enable/disable buttons
    const updateScrollButtons = useCallback(() => {
        if (!emblaThumbs) return;
        const progress = emblaThumbs.scrollProgress();
        setCanScrollUp(progress > 0.001);
        setCanScrollDown(progress < 0.999);
    }, [emblaThumbs]);

    // MAIN → THUMB SYNC
    const syncThumbs = useCallback(() => {
        if (!emblaMain || !emblaThumbs) return;

        const idx = emblaMain.selectedScrollSnap();
        setSelectedIndex(idx);
        emblaThumbs.scrollTo(idx);

        updateScrollButtons();
    }, [emblaMain, emblaThumbs, updateScrollButtons]);

    // On open scroll to selected image
    useEffect(() => {
        if (emblaMain && open) emblaMain.scrollTo(activeIndex, false);
    }, [emblaMain, activeIndex, open]);

    // Sync on slide change
    useEffect(() => {
        if (!emblaMain) return;
        emblaMain.on("select", syncThumbs);
        emblaMain.on("reInit", syncThumbs);
    }, [emblaMain, syncThumbs]);

    // Watch vertical thumb scroll
    useEffect(() => {
        if (!emblaThumbs) return;
        emblaThumbs.on("scroll", updateScrollButtons);
        emblaThumbs.on("reInit", updateScrollButtons);
        updateScrollButtons();
    }, [emblaThumbs, updateScrollButtons]);

    useEffect(() => {
        const viewport = thumbsViewportRef.current;
        if (!viewport || !emblaThumbs) return;

        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            if (e.deltaY > 0) emblaThumbs.scrollNext();
            else emblaThumbs.scrollPrev();
        };

        viewport.addEventListener("wheel", onWheel, { passive: false });

        return () => {
            viewport.removeEventListener("wheel", onWheel);
        };
    }, [emblaThumbs]);



    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-white flex items-center justify-center">

            {/* CLOSE BUTTON */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-black"
            >
                <X size={28} />
            </button>

            <div className="w-[95vw] max-w-6xl h-[90vh] flex gap-6">

                {/* ----------------------- */}
                {/* Thumbnail Column + Controls */}
                {/* ----------------------- */}
                <div className="flex flex-col items-center justify-center w-32">

                    {/* UP BUTTON */}
                    <button
                        onClick={() => emblaThumbs?.scrollPrev()}
                        disabled={!canScrollUp}
                        className={`text-black p-2 mb-2 rounded-full transition ${canScrollUp ? "bg-white/20 hover:bg-white/40" : "opacity-30"
                            }`}
                    >
                        <ChevronUp size={20} />
                    </button>

                    {/* VERTICAL THUMBNAIL VIEWPORT */}
                    <div
                        ref={(node) => {
                            thumbsViewportRef.current = node;     // your real .current ref
                            emblaThumbsRef(node);                 // Embla callback ref
                        }}
                        style={{ height: THUMB_VIEWPORT_HEIGHT }}
                        className="overflow-hidden w-full"
                    >
                        <div className="flex flex-col gap-3">
                            {images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => emblaMain?.scrollTo(idx)}
                                    className={`relative w-full aspect-[4/5] overflow-hidden border ${idx === selectedIndex ? "border-white" : "border-transparent"
                                        }`}
                                >
                                    <Image
                                        src={img.url}
                                        alt={img.altText ?? ""}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* DOWN BUTTON */}
                    <button
                        onClick={() => emblaThumbs?.scrollNext()}
                        disabled={!canScrollDown}
                        className={`text-black p-2 mt-2 rounded-full transition ${canScrollDown ? "bg-white/20 hover:bg-white/40" : "opacity-30"
                            }`}
                    >
                        <ChevronDown size={20} />
                    </button>
                </div>


                {/* MAIN IMAGE CAROUSEL */}
                <div className="flex-1 overflow-hidden" ref={emblaMainRef}>
                    <div className="flex h-full">
                        {images.map((img, idx) => (
                            <div
                                key={idx}
                                className="flex-[0_0_100%] flex items-center justify-center"
                            >
                                <div className="relative w-full h-full max-h-[80vh]">
                                    <Image
                                        src={img.url}
                                        alt={img.altText ?? ""}
                                        fill
                                        className="object-contain"
                                        sizes="80vw"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
