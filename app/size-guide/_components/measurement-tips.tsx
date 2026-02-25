import { Card, CardContent } from "@/components/ui/card"
import { SIZE_GUIDE_CONTENT } from "../_data"

export function MeasurementTips() {
  const { title, description, measurements } = SIZE_GUIDE_CONTENT.measurementTips

  return (
    <div className="mb-16">
      <h2 className="font-serif text-3xl text-stone-900 mb-6 text-center">{title}</h2>
      <p className="text-stone-600 text-center mb-8 leading-relaxed">{description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {measurements.map((measurement, index) => (
          <Card key={index} className="border-stone-200 py-0">
            <CardContent className="p-6">
              <h3 className="font-medium text-stone-900 mb-2">{measurement.name}</h3>
              <p className="text-stone-600 text-sm leading-relaxed">{measurement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
