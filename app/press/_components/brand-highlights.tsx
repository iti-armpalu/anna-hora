import { PRESS_CONTENT } from "../_data"

export function BrandHighlights() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
              Moments of <em className="font-serif italic">Recognition</em>
            </h3>
            <p className="text-stone-600 leading-relaxed">
              ANNA HORA continues to inspire conversations in design, craftsmanship, and the art of refined living —
              featured by leading publications around the world.
            </p>
          </div>

          <div className="space-y-6">
            {PRESS_CONTENT.highlights.map((highlight) => (
              <div key={highlight.id} className="border-l-2 border-stone-300 pl-6 py-2">
                <p className="text-lg text-stone-700 leading-relaxed">
                  {highlight.text}
                  <span className="text-stone-500 italic ml-2">— {highlight.publication}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
