import Image from "next/image"
import { silkContent } from "../_data"

export function HeroSection() {
    const { hero } = silkContent

    return (
        // Fills the screen below the sticky header (dvh tracks mobile browser chrome)
        <section className="relative flex h-[calc(100dvh-var(--header-height))] min-h-[32rem] items-center justify-center overflow-hidden">
            <Image src={hero.image} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />

            {/* Brand near-black wash so the text reads on any part of the photo */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/30 to-foreground/10" />

            <div className="container-site relative z-10 max-w-4xl text-center">
                <h1 className="text-background mb-6">
                    {hero.titleTop} <em>{hero.titleEm}</em>
                </h1>
                <p className="mx-auto max-w-2xl text-heading-sm font-light text-background/85">{hero.subtitle}</p>
            </div>
        </section>
    )
}
