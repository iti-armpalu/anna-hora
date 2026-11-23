"use client"

import type { FAQGroup } from "../_data"
import { slugify } from "@/lib/utils/slugify"
import { FAQItem } from "./faq-item"

type Props = {
  group: FAQGroup
  expandedItems: Set<string>
  onToggle: (question: string) => void
}

export function FAQCategoryGroup({ group, expandedItems, onToggle }: Props) {
  return (
    // scroll-mt keeps the heading clear of the sticky header when jumping from the topic nav
    <section id={slugify(group.category)} className="flex scroll-mt-[calc(var(--header-height)+2rem)] flex-col gap-field">
      <h2 className="text-heading-md font-light mb-0">{group.category}</h2>
      <ul className="divide-y divide-border border-y border-border">
        {group.items.map((item) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isExpanded={expandedItems.has(item.question)}
            onToggle={() => onToggle(item.question)}
          />
        ))}
      </ul>
    </section>
  )
}
