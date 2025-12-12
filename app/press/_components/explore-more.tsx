import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PRESS_CONTENT } from "../_data"

export function ExploreMore() {
  const { exploreMore } = PRESS_CONTENT

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">{exploreMore.title}</h3>
          <p className="text-lg text-stone-600 leading-relaxed mb-8">{exploreMore.description}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-stone-800 hover:bg-stone-700 text-white">
              <Link href="/journal">{exploreMore.journalCta}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-100 bg-transparent"
            >
              <Link href="/about">{exploreMore.aboutCta}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
