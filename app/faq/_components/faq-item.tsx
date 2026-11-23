"use client"

import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { slugify } from "@/lib/utils/slugify"

type Props = {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export function FAQItem({ question, answer, isExpanded, onToggle }: Props) {
  const id = slugify(question)

  return (
    <li>
      <h3 className="mb-0">
        <button
          id={`${id}-question`}
          type="button"
          onClick={onToggle}
          aria-expanded={isExpanded}
          aria-controls={`${id}-answer`}
          className="flex w-full items-start justify-between gap-6 py-5 text-left text-body font-normal text-foreground transition-colors hover:text-muted-foreground"
        >
          {question}
          {/* + turns into × when open */}
          <Plus
            strokeWidth={1.25}
            aria-hidden="true"
            className={cn("mt-1 size-4 shrink-0 transition-transform duration-200", isExpanded && "rotate-45")}
          />
        </button>
      </h3>

      {/* Always in the DOM so crawlers see every answer; `inert` keeps collapsed ones out of tab order and screen readers */}
      <div
        id={`${id}-answer`}
        role="region"
        aria-labelledby={`${id}-question`}
        inert={!isExpanded}
        className={cn(
          "grid transition-all duration-200",
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <p className="max-w-[var(--content-narrow)] whitespace-pre-line pb-5 text-small">{answer}</p>
        </div>
      </div>
    </li>
  )
}
