import Image from "next/image"
import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"

export function FounderSection() {
  const { founder } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <Image
              src={founder.image.src || "/placeholder.svg"}
              alt={founder.image.alt}
              width={450}
              height={600}
              className="rounded-lg mx-auto"
              sizes="(min-width:1024px) 500px, 90vw"
            />
          </div>

          <div className="space-y-6">
            <SectionTitle
              titleLines={founder.titleLines}
              className="text-3xl lg:text-4xl font-light text-stone-800 leading-tight"
            />

            {founder.paragraphs.map((p, i) => (
              <p key={i} className="text-stone-600 leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
