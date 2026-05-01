import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift } from "lucide-react"
import { giftGuideContent } from "../_data"

export function GiftGuideHero() {
    const { hero } = giftGuideContent

    return (
        <section className="py-16 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="space-y-6">
                        <h1 className="text-4xl lg:text-5xl font-light text-stone-800 leading-tight">
                            {hero.titleLines[0]}
                            <br />
                            <em className="font-serif italic">{hero.titleEm}</em>
                        </h1>

                        {hero.paragraphs.map((p) => (
                            <p key={p.slice(0, 40)} className="text-lg text-stone-600 leading-relaxed">
                                {p}
                            </p>
                        ))}

                        <Button asChild>
                            <Link href={`#${hero.ctaScrollTarget}`}>
                                <Gift className="w-4 h-4 mr-2" />
                                {hero.ctaLabel}
                            </Link>
                        </Button>
                    </div>

                    <div className="relative">
                        <Image
                            src={hero.image.src}
                            alt={hero.image.alt}
                            width={600}
                            height={700}
                            priority
                            sizes="(min-width: 1024px) 500px, 90vw"
                        />
                        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-stone-200 rounded-full opacity-30 -z-10" />
                    </div>
                </div>
            </div>
        </section>
    )
}