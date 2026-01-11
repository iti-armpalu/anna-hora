"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Publication {
    name: string
    quote?: string
    url?: string
}

const publications: Publication[] = [
    {
        name: "VOGUE",
        url: "https://www.vogue.cz/clanek/fashion/fotografie/magda-zurkova/oslava-jara-a-lokalni-mody",
    },
    {
        name: "ELLE",
        url: "#",
    },
    {
        name: "HARPER'S BAZAAR",
        url: "#",
    },
    {
        name: "MARIE CLAIRE",
        url: "#",
    }
]

export default function AsSeenIn() {
    const [currentIndex, setCurrentIndex] = useState(0)
    // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [isAutoPlaying, setIsAutoPlaying] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    // Auto-scroll functionality
    useEffect(() => {
        if (!isAutoPlaying) return

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % publications.length)
        }, 4000)

        return () => clearInterval(interval)
    }, [isAutoPlaying])

    const scrollToIndex = (index: number) => {
        setCurrentIndex(index)
        setIsAutoPlaying(false)

        // Resume auto-play after 10 seconds of inactivity
        setTimeout(() => setIsAutoPlaying(true), 10000)
    }

    const handlePrevious = () => {
        scrollToIndex((currentIndex - 1 + publications.length) % publications.length)
    }

    const handleNext = () => {
        scrollToIndex((currentIndex + 1) % publications.length)
    }

    // Calculate visible publications for responsive design
    const getVisibleCount = () => {
        if (typeof window === "undefined") return 4
        if (window.innerWidth < 768) return 2
        if (window.innerWidth < 1024) return 3
        return 4
    }

    const [visibleCount, setVisibleCount] = useState(4)

    useEffect(() => {
        const handleResize = () => setVisibleCount(getVisibleCount())
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-8 md:mb-12">
                    <h2 className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">As Featured In vs As Seen In</h2>
                    <p className="text-stone-600 max-w-4xl mx-auto">
                        ANNA HORA has been recognised by leading fashion and lifestyle publications for its quiet approach
                        to luxury, its dedication to thoughtful design, and its celebration of self-expression through craft.
                        From silk loungewear to lifestyle rituals — our story continues to resonate. And we’re so grateful you’re
                        part of that journey.
                    </p>
                </div>

                {/* Slider Container */}
                <div className="relative">

                    {/* Publications Slider */}
                    <div
                        ref={containerRef}
                        className="overflow-hidden"
                        onMouseEnter={() => setIsAutoPlaying(false)}
                        onMouseLeave={() => setIsAutoPlaying(false)}
                    >
                        <div
                            className="flex transition-transform duration-700 ease-in-out"
                            style={{
                                transform: `translateX(-${(currentIndex * 100) / visibleCount}%)`,
                            }}
                        >
                            {publications.map((publication, index) => (
                                <div
                                    key={index}
                                    className="flex-shrink-0 px-4 md:px-6"
                                    style={{ width: `${100 / visibleCount}%` }}
                                >
                                    <a href={publication.url} target="_blank" rel="noopener noreferrer" className="block group">
                                        <div className="flex flex-col items-center justify-center min-h-[120px] md:min-h-[140px] px-4 py-4 rounded-lg transition-colors duration-300 hover:bg-muted/30">
                                            {/* Publication Name (Logo Typography) */}
                                            <div className="text-center mb-4">
                                                <span className="font-serif text-xl md:text-2xl tracking-wider text-muted-foreground/60 group-hover:text-foreground transition-colors duration-300">
                                                    {publication.name}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {publications.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-8 bg-foreground"
                                    : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
                    >
                        <Link href="/press">
                            Explore Press & Recognition
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}
