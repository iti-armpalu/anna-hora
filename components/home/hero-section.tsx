import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config/site"
import { homeContent } from "@/components/home/_data"

export default function HeroSection() {
  const { hero } = homeContent

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          className="object-cover"
          style={{ objectPosition: "50% center" }}
          priority
        />
        {/* Gradient overlay — stronger on mobile where text lands on light area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/50 md:via-black/20 md:to-transparent" />
      </div>

      <div className="relative z-10 w-full text-left px-8">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-none">
          {hero.heading.top}
          <br />
          <em className="font-serif italic">{hero.heading.em}</em>
        </h1>

        <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl font-light">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          {/* Light button intentional — sits over dark image overlay */}
          <Button asChild size="lg" className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
            <Link href={hero.ctas.primary.href}>{hero.ctas.primary.label}</Link>
          </Button>
          {/* White outline intentional — sits over dark image overlay */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
          >
            <Link href={hero.ctas.secondary.href}>
              {hero.ctas.secondary.label}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}