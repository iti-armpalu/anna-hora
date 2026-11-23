type Props = {
  step: number
  title: string
  description: string
}

export function CareGuideStep({ step, title, description }: Props) {
  return (
    <li className="flex flex-col gap-tight border-t border-border pt-block">
      {/* Serif italic numeral on a hairline — editorial, no badge or circle */}
      <span className="font-serif text-heading-lg font-light italic leading-none text-muted-foreground" aria-hidden="true">
        {String(step).padStart(2, "0")}
      </span>
      <h3 className="text-heading-sm mb-0">{title}</h3>
      <p className="text-small">{description}</p>
    </li>
  )
}
