import { PRESS_CONTENT } from "../_data"
import { PublicationLogos } from "./publication-logos"

export function PressHero() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-6xl font-light text-stone-800 mb-6">{PRESS_CONTENT.hero.title}</h2>
          <p className="text-lg lg:text-xl text-stone-600 leading-relaxed max-w-3xl mx-auto">
            {PRESS_CONTENT.hero.subtitle}
          </p>
          <PublicationLogos />
        </div>
      </div>
    </section>
  )
}
