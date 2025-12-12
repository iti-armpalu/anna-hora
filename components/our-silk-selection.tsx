import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const silkFeatures = [
  {
    title: "22 Momme Weight",
    description: "The perfect balance of durability and drape",
  },
  {
    title: "Grade 6A Quality",
    description: "The highest grade of mulberry silk",
  },
]

export default function OurSilkSection() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <Image
              src="/anna-hora-silk.webp"
              alt="Premium silk texture"
              width={500}
              height={600}
              className="rounded-lg"
            />
          </div>
          <div className="space-y-6">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800">
              The art of <em className="font-serif italic">Mulberry Silk</em>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              Our silk reflects everything ANNA HORA stands for — quiet luxury, integrity, and thoughtful design. It's
              chosen with care, crafted with intention, and worn with ease. We only partner with skilled artisans who
              honour tradition while designing for those who value beauty with purpose.
            </p>
            <p className="text-stone-600 leading-relaxed">
              It took 18 months to find a silk that felt right — not just to the touch, but in principle. It had to meet
              our standards for comfort, quality, and consciousness. The result? A fabric that moves like water, wears
              like second skin, and elevates the everyday. It's silk that speaks to confidence, calm, and the freedom to
              feel — the ANNA HORA way of living.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              {silkFeatures.map((feature) => (
                <div key={feature.title}>
                  <h4 className="font-medium text-stone-800 mb-2">{feature.title}</h4>
                  <p className="text-sm text-stone-600">{feature.description}</p>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            >
              <Link href="/our-silk">Learn More About Our Silk</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
