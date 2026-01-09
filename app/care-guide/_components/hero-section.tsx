// app/care-guide/_components/hero-section.tsx
import { Section, SectionInner } from "./section"

export function HeroSection({
  hero,
}: {
  hero: { title: string; subtitle: string; description: string }
}) {
  return (
    <Section className="relative border-b border-stone-200 bg-white">
      <SectionInner max="max-w-4xl" className="py-16 lg:py-24">
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-light leading-tight text-stone-800 md:text-5xl lg:text-6xl">
            {hero.title}
            <br />
            <em className="font-serif italic">{hero.subtitle}</em>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-stone-600 md:text-xl">
            {hero.description}
          </p>
        </div>
      </SectionInner>
    </Section>
  )
}
