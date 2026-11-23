import { cn } from "@/lib/utils"

type Props = {
  titleTop: string
  /** Rendered in the brand serif italic */
  titleEm: string
  subtitle?: string
  as?: "h1" | "h2" | "h3"
  align?: "center" | "left"
}

/**
 * Two-part editorial heading ("The art of *perfection*") with an optional lead paragraph.
 * Heading size comes from the global h1/h2/h3 styles; the lead is one step larger than body text.
 */
export function SectionHeader({ titleTop, titleEm, subtitle, as: Tag = "h2", align = "center" }: Props) {
  return (
    <div className={cn(align === "center" ? "section-header" : "flex flex-col")}>
      <Tag>
        {titleTop} <em>{titleEm}</em>
      </Tag>
      {subtitle && <p className="text-heading-sm">{subtitle}</p>}
    </div>
  )
}
