import { SectionHeader } from "@/components/common/section-header"
import { aboutContent, type Pillar } from "../_data"

function PillarCard({ name, role, text }: Pillar) {
  return (
    // Name set like a signature in the serif italic; role as a quiet line, not a job-title label
    <li className="flex flex-col items-center gap-tight px-6 text-center md:px-12 md:[&+&]:border-l md:[&+&]:border-border">
      <h3 className="font-serif text-heading-lg font-light italic mb-0">{name}</h3>
      <span className="text-small text-muted-foreground">{role}</span>
      <p className="mt-tight max-w-sm text-small">{text}</p>
    </li>
  )
}

export function PhilosophySection() {
  const { philosophy } = aboutContent

  return (
    <section className="section bg-secondary">
      <div className="container-site max-w-4xl">
        <SectionHeader titleTop={philosophy.titleTop} titleEm={philosophy.titleEm} subtitle={philosophy.text} />
        <ul className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:gap-y-0">
          {philosophy.pillars.map((pillar) => (
            <PillarCard key={pillar.name} {...pillar} />
          ))}
        </ul>
        <p className="mx-auto mt-12 max-w-[var(--content-narrow)] text-center text-heading-sm">{philosophy.closing}</p>
      </div>
    </section>
  )
}
