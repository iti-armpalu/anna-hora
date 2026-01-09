// app/care-guide/_components/storage-tips-grid.tsx
import { Card, CardContent } from "@/components/ui/card"
import { Icon, type IconName } from "./icon"
import { Section, SectionInner, SectionTitle } from "./section"

export function StorageTipsGrid({
  storage,
}: {
  storage: {
    title: string
    subtitle: string
    description: string
    tips: Array<{ icon: IconName; title: string; description: string }>
  }
}) {
  return (
    <Section className="bg-white py-16 lg:py-24">
      <SectionInner max="max-w-6xl">
        <div className="mb-16">
          <SectionTitle title={storage.title} subtitle={storage.subtitle} description={storage.description} />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {storage.tips.map((tip) => (
            <Card key={tip.title} className="border-0 bg-stone-50 text-center shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-light text-stone-800">{tip.title}</h3>
                <p className="text-sm leading-relaxed text-stone-600">{tip.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionInner>
    </Section>
  )
}
