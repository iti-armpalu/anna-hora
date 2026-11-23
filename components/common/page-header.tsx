type Props = {
  title: string
  /** Larger lead line under the title */
  subtitle?: string
  description?: string
}

/** Text-led page header for information pages (FAQ, Shipping & returns), with a hairline below. */
export function PageHeader({ title, subtitle, description }: Props) {
  return (
    <header className="border-b border-border">
      <div className="container-site py-12 lg:py-16">
        <div className="mx-auto flex max-w-[var(--content-narrow)] flex-col gap-field text-center">
          <h1 className="text-heading-lg font-light text-balance mb-0">{title}</h1>
          {subtitle && <p className="text-heading-sm font-light text-foreground">{subtitle}</p>}
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
    </header>
  )
}
