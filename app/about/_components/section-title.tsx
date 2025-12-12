import type { TitleLine } from "../_data"

interface SectionTitleProps {
  titleLines: TitleLine[]
  className?: string
}

export function SectionTitle({ titleLines, className = "" }: SectionTitleProps) {
  return (
    <h3 className={className}>
      {titleLines.map((line, i) => (
        <span key={i}>
          {typeof line === "string" ? line : <em className="font-serif italic">{line.italic}</em>}
          {i < titleLines.length - 1 && <br />}
        </span>
      ))}
    </h3>
  )
}
