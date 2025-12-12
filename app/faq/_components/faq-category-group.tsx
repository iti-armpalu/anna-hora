"use client"

import type { FAQItem as FAQItemType } from "../_data"
import { FAQItem } from "./faq-item"

interface FAQCategoryGroupProps {
  category: string
  items: FAQItemType[]
  expandedItems: Set<string>
  onToggle: (question: string) => void
}

export function FAQCategoryGroup({ category, items, expandedItems, onToggle }: FAQCategoryGroupProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-stone-200">
      <div className="p-6 border-b border-stone-100">
        <h2 className="text-2xl font-serif text-stone-900">{category}</h2>
      </div>

      <div className="divide-y divide-stone-100">
        {items.map((item) => (
          <FAQItem
            key={item.question}
            question={item.question}
            answer={item.answer}
            isExpanded={expandedItems.has(item.question)}
            onToggle={() => onToggle(item.question)}
          />
        ))}
      </div>
    </div>
  )
}
