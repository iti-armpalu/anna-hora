interface SectionHeaderProps {
  titleTop: string
  titleEm: string
  subtitle?: string
  as?: "h1" | "h2" | "h3" | "h4"
}

export function SectionHeader({
  titleTop,
  titleEm,
  subtitle,
  as: Tag = "h2",
}: SectionHeaderProps) {
  return (
    <div className="text-center mb-16">
      <Tag className="text-3xl lg:text-4xl font-light text-stone-800 mb-6">
        {titleTop}
        <br />
        <em className="font-serif italic">{titleEm}</em>
      </Tag>
      {subtitle && (
        <p className="text-lg text-stone-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  )
}