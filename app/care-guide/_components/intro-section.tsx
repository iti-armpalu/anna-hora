import { careGuideContent } from "../_data"
import { Section, SectionInner, SectionTitle } from "./section"

export function IntroSection() {
  const { introduction } = careGuideContent

  return (
    <Section className="py-16 lg:py-24">
      <SectionInner max="max-w-4xl">
        <SectionTitle title={introduction.title} subtitle={introduction.subtitle} />
        <div className="space-y-6">
          {introduction.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-stone-600">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionInner>
    </Section>
  )
}
