import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config/site"

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-100 to-stone-200">
        <Image
          src="/anna-hora-hero-1.webp"
          alt="Silk loungewear hero"
          fill
          className="object-cover opacity-100"
          priority
        />
      </div>

      <div className="relative z-10 w-full text-left px-8">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-stone-200 mb-6 leading-tight text-left">
          For the moments
          <br />
          <em className="font-serif italic">you keep to yourself</em>
        </h2>

        <p className="text-lg md:text-xl text-stone-400 mb-8 max-w-2xl font-light text-left">
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
            className="border-stone-300 text-stone-300 hover:bg-stone-100 px-8 py-3 bg-transparent"
          >
            <Link href="/about">About ${siteConfig.name.toUpperCase()}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
