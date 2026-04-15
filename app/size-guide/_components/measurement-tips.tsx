import { Card, CardContent } from "@/components/ui/card"
import { sizeGuideContent } from "../_data"

export function MeasurementTips() {
  const { measurementTips } = sizeGuideContent

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl text-stone-900 mb-6 text-center">
            {measurementTips.title}
          </h2>
          <p className="text-stone-600 text-center mb-8 leading-relaxed">
            {measurementTips.description}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {measurementTips.measurements.map((measurement) => (
              <Card key={measurement.name} className="border-stone-200 py-0">
                <CardContent className="p-6">
                  <h3 className="font-medium text-stone-900 mb-2">
                    {measurement.name}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {measurement.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}