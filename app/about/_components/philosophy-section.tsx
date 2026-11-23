import { SectionHeader } from "@/components/common/section-header"
import { aboutContent, type Pillar } from "../_data"

function PillarCard({ name, role, text }: Pillar) {
  return (
    <li className="flex flex-col gap-tight border-t border-border pt-block">
      {/* Serif italic initial on a hairline — same treatment as the numbered care steps */}
      <span className="font-serif text-heading-lg font-light italic leading-none text-muted-foreground" aria-hidden="true">
        {name.charAt(0)}
      </span>
      <h3 className="text-heading-sm mb-0">{name}</h3>
      <span className="label-uppercase">{role}</span>
      <p className="text-small">{text}</p>
    </li>
  )
}

export function PhilosophySection() {
  const { philosophy } = aboutContent

  return (
    <section className="section bg-secondary">
      <div className="container-site max-w-4xl">
        <SectionHeader titleTop={philosophy.titleTop} titleEm={philosophy.titleEm} subtitle={philosophy.text} />
        <ul className="grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {philosophy.pillars.map((pillar) => (
            <PillarCard key={pillar.name} {...pillar} />
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-[var(--content-narrow)] text-center text-heading-sm">{philosophy.closing}</p>
      </div>
    </section>
  )
}
