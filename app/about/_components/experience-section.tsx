import { siteConfig } from "@/lib/config/site"
import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"
import Image from "next/image"

export function ExperienceSection() {
  const { experience } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 order-2 lg:order-1">
            <SectionTitle
              titleLines={experience.titleLines}
              className="text-3xl lg:text-4xl font-light text-stone-800 leading-tight"
            />

            {experience.paragraphs.map((p, i) => (
              <p key={i} className="text-stone-600 leading-relaxed">
                {p}
              </p>
            ))}

          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative">
              <Image
                src={experience.image.src}
                alt={experience.image.alt}
                width={350}
                height={500}
                className="rounded-lg"
                sizes="(min-width:1024px) 500px, 90vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
