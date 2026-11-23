import { cn } from "@/lib/utils"

export interface Step {
  title: string
  description: string
}

type Props = {
  steps: Step[]
  /** Grid columns at desktop, e.g. "lg:grid-cols-3" */
  className?: string
}

/** Ordered steps with serif italic numerals on hairlines — editorial, no badges or circles. */
export function NumberedSteps({ steps, className }: Props) {
  return (
    <ol className={cn("grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2", className)}>
      {steps.map((step, index) => (
        <li key={step.title} className="flex flex-col gap-tight border-t border-border pt-block">
          <span className="font-serif text-heading-lg font-light italic leading-none text-muted-foreground" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-heading-sm mb-0">{step.title}</h3>
          <p className="text-small">{step.description}</p>
        </li>
      ))}
    </ol>
  )
}
