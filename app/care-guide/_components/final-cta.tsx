// app/care-guide/_components/final-cta.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Section, SectionInner } from "./section"

export function FinalCTA() {
  return (
    <Section className="py-16 lg:py-24">
      <SectionInner max="max-w-4xl">
        <div className="text-center">
          <h2 className="mb-8 text-3xl font-light text-stone-800 lg:text-4xl">
            Ready to Experience
            <br />
            <em className="font-serif italic">Pure Silk Luxury?</em>
          </h2>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-anna-green-950 px-8 py-3 text-white hover:bg-stone-700">
              <Link href="/shop">Shop Collection</Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-stone-300 bg-transparent px-8 py-3 text-stone-700 hover:bg-stone-100"
            >
              <Link href="/our-silk">Learn About Our Silk</Link>
            </Button>
          </div>
        </div>
      </SectionInner>
    </Section>
  )
}
