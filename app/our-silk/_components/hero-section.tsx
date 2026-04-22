import Image from "next/image"
import { silkContent } from "../_data"

export function HeroSection() {
    const { hero } = silkContent

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
                <Image
                    src={hero.image}
                    alt={hero.alt}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-anna-cement-100 mb-6 leading-tight">
                    {hero.titleTop}
                    <br />
                    <em className="font-serif italic">{hero.titleEm}</em>
                </h1>
                <p className="text-lg md:text-xl text-anna-cement-300 max-w-2xl mx-auto font-light leading-relaxed">
                    {hero.subtitle}
                </p>
            </div>
        </section>
    )
}