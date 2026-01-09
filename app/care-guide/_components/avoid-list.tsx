// app/care-guide/_components/avoid-list.tsx
import { AlertCircle } from "lucide-react"
import { Section, SectionInner } from "./section"

export function AvoidList({
  avoidSection,
}: {
  avoidSection: { title: string; items: string[] }
}) {
  return (
    <Section className="bg-stone-100 py-16 lg:py-24">
      <SectionInner max="max-w-4xl">
        <h2 className="mb-8 text-center text-3xl font-light text-stone-800 lg:text-4xl">
          {avoidSection.title}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {avoidSection.items.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-4">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-stone-500" aria-hidden="true" />
              <p className="leading-relaxed text-stone-600">{item}</p>
            </div>
          ))}
        </div>
      </SectionInner>
    </Section>
  )
}
