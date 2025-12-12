import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"
import type { Pillar } from "../_data"

function PillarCard({ title, text }: Pillar) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6">
        <div className="w-8 h-8 bg-stone-400 rounded-full" />
      </div>
      <h4 className="text-xl font-light text-stone-800 mb-4">{title}</h4>
      <p className="text-stone-600 leading-relaxed">{text}</p>
    </div>
  )
}

export function PhilosophySection() {
  const { philosophy } = ABOUT_CONTENT

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionTitle
            titleLines={philosophy.titleLines}
            className="text-3xl lg:text-4xl font-light text-stone-800 mb-6 leading-tight"
          />
          <p className="text-lg text-stone-600 leading-relaxed">{philosophy.text}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {philosophy.pillars.map((pillar) => (
            <PillarCard key={pillar.title} {...pillar} />
          ))}
        </div>
      </div>
    </section>
  )
}
