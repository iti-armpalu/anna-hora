import { sizeGuideContent } from "../_data"

export function HeroSection() {
  const { hero } = sizeGuideContent

  return (
    <section className="py-16 lg:py-24 bg-white border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl text-stone-900 mb-6 text-balance">
            {hero.title}
          </h1>
          <p className="text-xl text-stone-600 mb-6 leading-relaxed max-w-3xl mx-auto text-pretty">
            {hero.subtitle}
          </p>
          <p className="text-stone-500 leading-relaxed max-w-2xl mx-auto">
            {hero.supportingText}
          </p>
        </div>
      </div>
    </section>
  )
}