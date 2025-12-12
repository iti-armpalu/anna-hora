"use client"

import { useState, useMemo } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { FAQItem, HeaderContent, UITexts } from "../_data"
import { searchFAQs, getCategorizedFAQs } from "../_data"
import { FAQCategoryGroup } from "./faq-category-group"

interface FAQSearchAndContentProps {
  faqs: readonly FAQItem[]
  header: HeaderContent
  uiTexts: UITexts
}

export function FAQSearchAndContent({ faqs, header, uiTexts }: FAQSearchAndContentProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const filteredFAQs = useMemo(() => {
    const term = searchTerm.trim()
    return term ? searchFAQs(term, faqs) : faqs
  }, [searchTerm, faqs])

  const groupedFAQs = useMemo(() => getCategorizedFAQs(filteredFAQs), [filteredFAQs])

  const toggleExpanded = (question: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(question)) {
        next.delete(question)
      } else {
        next.add(question)
      }
      return next
    })
  }

  const hasResults = filteredFAQs.length > 0
  const isSearching = searchTerm.trim().length > 0

  return (
    <>
      {/* Search */}
      <div className="relative mb-12">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5"
          aria-hidden="true"
        />
        <Input
          type="search"
          placeholder={header.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 py-4 text-lg border-stone-300 focus:border-stone-500 focus:ring-stone-500"
          aria-label="Search FAQ"
        />
      </div>

      {/* FAQ Groups */}
      {hasResults ? (
        <div className="space-y-8">
          {groupedFAQs.map((group) => (
            <FAQCategoryGroup
              key={group.category}
              category={group.category}
              items={group.items}
              expandedItems={expandedItems}
              onToggle={toggleExpanded}
            />
          ))}
        </div>
      ) : (
        isSearching && (
          <div className="text-center py-12">
            <p className="text-stone-600 text-lg mb-4">
              {uiTexts.noResultsPrefix}
              {searchTerm}"
            </p>
            <Button
              onClick={() => setSearchTerm("")}
              variant="outline"
              className="border-stone-300 text-stone-700 hover:bg-stone-50"
            >
              {uiTexts.clearSearchLabel}
            </Button>
          </div>
        )
      )}
    </>
  )
}
