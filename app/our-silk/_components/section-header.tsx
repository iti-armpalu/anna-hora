interface SectionHeaderProps {
  titleTop: string
  titleEm: string
  subtitle?: string
  as?: "h1" | "h2" | "h3" | "h4"
  align?: "center" | "left"
}

export function SectionHeader({
  titleTop,
  titleEm,
  subtitle,
  as: Tag = "h2",
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={align === "center" ? "section-header" : "mb-6"}>
      <Tag>
        {titleTop} <em>{titleEm}</em>
      </Tag>
      {subtitle && <p className="text-heading-sm">{subtitle}</p>}
    </div>
  )
}