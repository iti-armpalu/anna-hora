import type { TitleLine } from "../_data"

interface SectionTitleProps {
  titleLines: TitleLine[]
  className?: string
  as?: "h1" | "h2" | "h3" | "h4"
}

export function SectionTitle({ titleLines, className = "", as: Tag = "h3" }: SectionTitleProps) {
  const first = titleLines[0]
  const shouldBreak =
    titleLines.length > 1 &&
    typeof first === "string" &&
    first.trim().split(/\s+/).length >= 3

  return (
    <h3 className={`leading-tight text-balance ${className}`}>
      {titleLines.map((line, i) => (
        <span key={i}>
          {typeof line === "string" ? line : <em className="font-serif italic">{line.italic}</em>}
          {i < titleLines.length - 1 && (shouldBreak ? <br /> : " ")}
        </span>
      ))}
    </h3>
  )
}
