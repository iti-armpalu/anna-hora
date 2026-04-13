import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config/site"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/anna-hora-hero-1.webp"
          alt="A woman seated on the floor in a white silk lounge shirt, looking down."
          fill
          className="object-cover"
          // on mobile focus on the top/face area, desktop shows full image
          style={{ objectPosition: "50% center" }}
          priority
        />
        {/* Gradient overlay — stronger on mobile where text lands on light area */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent md:from-black/50 md:via-black/20 md:to-transparent" />
      </div>

      <div className="relative z-10 w-full text-left px-8">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-6 leading-none">
          For the moments
          <br />
          <em className="font-serif italic">you keep to yourself</em>
        </h2>

        <p className="text-lg md:text-xl text-stone-200 mb-8 max-w-2xl font-light">
          Not just silk. A ritual. A feeling. A way to come home to yourself.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-start">
          <Button asChild size="lg" className="bg-stone-200 hover:bg-stone-300 text-black px-8 py-3">
            <Link href="/shop">Explore Collection</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent"
          >
            <Link href="/about">About {siteConfig.name.toUpperCase()}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
