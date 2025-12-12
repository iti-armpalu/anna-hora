import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"

export function HeroSection() {
  const { hero } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <SectionTitle
            titleLines={hero.titleLines}
            className="text-4xl lg:text-5xl font-light text-stone-800 mb-6 leading-tight"
          />

          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xl md:text-2xl font-light text-stone-700 leading-relaxed mb-8">{hero.introLead}</p>
            <p className="text-lg text-stone-600 leading-relaxed">{hero.introText}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
