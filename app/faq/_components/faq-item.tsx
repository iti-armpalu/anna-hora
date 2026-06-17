"use client"

import { ChevronDown } from "lucide-react"

interface FAQItemProps {
  question: string
  answer: string
  isExpanded: boolean
  onToggle: () => void
}

export function FAQItem({ question, answer, isExpanded, onToggle }: FAQItemProps) {
  const answerId = `faq-answer-${question.replace(/\s+/g, "-").toLowerCase()}`

  return (
    <div className="p-6">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={isExpanded}
        aria-controls={answerId}
      >
        <h3 className="text-lg font-serif text-stone-900 group-hover:text-stone-700 transition-colors pr-4">
          {question}
        </h3>
        <ChevronDown
          className={`w-5 h-5 text-stone-500 flex-shrink-0 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""
            }`}
          aria-hidden="true"
        />
      </button>

      {/* Answer is always in the DOM — visibility toggled via CSS only.
          This ensures crawlers and screen readers see the content on first load. */}
      <div
        id={answerId}
        role="region"
        aria-hidden={!isExpanded}
        className={`grid transition-all duration-200 ${isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden">
          <div className="mt-4 pt-4 border-t border-stone-100">
            <p className="text-stone-600 leading-relaxed whitespace-pre-line">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}