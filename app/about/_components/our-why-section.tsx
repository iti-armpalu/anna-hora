import { aboutContent } from "../_data"

export function OurWhySection() {
  const { why } = aboutContent

  return (
    <section className="section bg-secondary">
      <div className="container-site">
        <div className="mx-auto flex max-w-[var(--content-narrow)] flex-col text-center gap-block">
          <h2 className="text-balance mb-0">
            {why.titleTop} <em>{why.titleEm}</em>
          </h2>
          {/* whitespace-pre-line: the statements' line breaks live in the content, not in markup */}
          <p className="whitespace-pre-line text-heading-md font-light text-foreground">{why.opening}</p>
          <p>{why.body}</p>
          <span className="mx-auto h-px w-12 bg-border" aria-hidden="true" />
          <p className="whitespace-pre-line text-heading-md font-light text-foreground">{why.closing}</p>
        </div>
      </div>
    </section>
  )
}
