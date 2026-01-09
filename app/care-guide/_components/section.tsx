// app/care-guide/_components/section.tsx
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={cn(className)}>{children}</section>
}

export function SectionInner({
  children,
  max = "max-w-4xl",
  className,
}: {
  children: ReactNode
  max?: "max-w-4xl" | "max-w-6xl"
  className?: string
}) {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)}>
      <div className={cn("mx-auto", max)}>{children}</div>
    </div>
  )
}

export function SectionTitle({
  title,
  subtitle,
  description,
  align = "center",
  className,
}: {
  title: string
  subtitle?: string
  description?: string
  align?: "center" | "left"
  className?: string
}) {
  return (
    <div className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <h2 className="mb-6 text-3xl font-light text-stone-800 lg:text-4xl">
        {title}
        {subtitle ? (
          <>
            <br />
            <em className="font-serif italic">{subtitle}</em>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className={cn("text-lg text-stone-600", align === "center" ? "mx-auto max-w-2xl" : "")}>
          {description}
        </p>
      ) : null}
    </div>
  )
}
