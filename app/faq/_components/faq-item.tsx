"use client"

import { ChevronDown, ChevronUp } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export function FAQItem({ question, answer, isExpanded, onToggle }: FAQItemProps) {
  return (
    <div className="p-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isExpanded}
        aria-controls={`faq-answer-${question}`}
      >
        <h3 className="text-lg font-serif text-stone-900 group-hover:text-stone-700 transition-colors pr-4">
          {question}
        </h3>
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-stone-500 flex-shrink-0" aria-hidden="true" />
        ) : (
          <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0" aria-hidden="true" />
        )}
      </button>

      {isExpanded && (
        <div id={`faq-answer-${question}`} className="mt-4 pt-4 border-t border-stone-100" role="region">
          <p className="text-stone-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}
