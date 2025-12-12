import { ABOUT_CONTENT } from "../_data"
import { SectionTitle } from "./section-title"

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

            <div className="pt-4">
              <h4 className="font-medium text-stone-800 mb-3">The ANNA HORA Promise</h4>
              <ul className="space-y-2 text-stone-600">
                {experience.promises.map((promise, i) => (
                  <li key={i} className="flex items-start">
                    <span className="w-2 h-2 bg-stone-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {promise}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
              {/* Image placeholder - add when available */}
            </div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-stone-200 rounded-full opacity-30 -z-10" />
          </div>
        </div>
      </div>
    </section>
  )
}
