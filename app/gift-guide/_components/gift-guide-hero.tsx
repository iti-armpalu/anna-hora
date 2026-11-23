import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { giftGuideContent } from "../_data"

export function GiftGuideHero() {
    const { hero } = giftGuideContent

    return (
        <section className="section">
            <div className="container-site grid grid-cols-1 items-center gap-block lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-field lg:max-w-lg">
                    <h1 className="text-heading-lg font-light mb-0">
                        {hero.titleLines.join(" ")} <em>{hero.titleEm}</em>
                    </h1>
                    {hero.paragraphs.map((paragraph) => (
                        <p key={paragraph} className="text-muted-foreground">
                            {paragraph}
                        </p>
                    ))}
                    <Button asChild size="lg" className="mt-tight w-fit">
                        <Link href={`#${hero.ctaScrollTarget}`}>{hero.ctaLabel}</Link>
                    </Button>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                    <Image
                        src={hero.image.src}
                        alt={hero.image.alt}
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover"
                    />
                </div>
            </div>
        </section>
    )
}
