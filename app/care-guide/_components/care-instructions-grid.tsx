import { careGuideContent } from "../_data"
import { Card, CardContent } from "@/components/ui/card"
import { Section, SectionInner, SectionTitle } from "./section"

export function CareInstructionsGrid() {
  const { careInstructions } = careGuideContent

  return (
    <Section className="bg-white py-16 lg:py-24">
      <SectionInner max="max-w-6xl">
        <div className="mb-16">
          <SectionTitle
            title={careInstructions.title}
            subtitle={careInstructions.subtitle}
            description={careInstructions.description}
          />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {careInstructions.instructions.map((instruction) => (
            <Card key={instruction.step} className="border-0 bg-stone-50 shadow-sm">
              <CardContent className="p-8">
                <div className="mb-4 flex items-start gap-4">

                  <div className="w-16 h-16 bg-anna-cement-100 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-anna-cement-600 leading-none translate-y-[-8px]">
                      {instruction.step}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="mb-2 text-xl font-light text-stone-800">{instruction.title}</h3>
                    <p className="mb-4 text-sm text-stone-600">{instruction.description}</p>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-stone-600">
                  {instruction.details.map((detail) => (
                    <li key={detail} className="flex items-start">
                      <span className="mt-2 mr-3 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-stone-400" />
                      <span className="leading-relaxed">{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionInner>
    </Section>
  )
}
