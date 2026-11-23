import { aboutContent } from "../_data"

export function HeroSection() {
  const { hero } = aboutContent

  return (
    <section className="section">
      <div className="container-site">
        <div className="mx-auto flex max-w-[var(--content-narrow)] flex-col text-center gap-field">
          {/* Page h1 at heading-lg, consistent with the other text-led page heroes */}
          <h1 className="text-heading-lg font-light text-balance mb-0">
            {hero.titleTop} <em>{hero.titleEm}</em>
          </h1>
          <p className="text-heading-sm font-light text-foreground">{hero.introLead}</p>
          <p className="text-muted-foreground">{hero.introText}</p>
        </div>
      </div>
    </section>
  )
}
