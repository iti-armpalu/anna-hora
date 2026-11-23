"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OnThisPage } from "@/components/common/on-this-page"
import { slugify } from "@/lib/utils/slugify"
import { FAQ_CONTENT, UI_TEXTS, groupByCategory, searchFAQs } from "../_data"
import { FAQCategoryGroup } from "./faq-category-group"

/** Topic nav + search + questions. Client-side because search and open/closed state are interactive. */
export function FAQSearchAndContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())

  const groups = useMemo(() => groupByCategory(searchFAQs(searchTerm, FAQ_CONTENT)), [searchTerm])
  // Nav follows the search, so it never links to a topic with no matching questions
  const topicLinks = groups.map(({ category }) => ({ id: slugify(category), label: category }))

  function toggleExpanded(question: string): void {
    setExpandedItems((prev) => {
      const next = new Set(prev)
      if (next.has(question)) next.delete(question)
      else next.add(question)
      return next
    })
  }

  return (
    <div className="container-site grid grid-cols-1 gap-[var(--section-padding)] py-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16 lg:py-16">
      {/* On mobile the help block comes last; the topic list is desktop-only (mobile gets the row below) */}
      <div className="order-2 lg:order-1">
        <OnThisPage title={UI_TEXTS.navTitle} links={topicLinks}>
          <span className="text-small text-foreground">{UI_TEXTS.help.title}</span>
          <p className="text-small">{UI_TEXTS.help.text}</p>
          <Button asChild variant="outline" className="w-fit">
            <Link href={UI_TEXTS.help.cta.href}>{UI_TEXTS.help.cta.label}</Link>
          </Button>
        </OnThisPage>
      </div>

      <div className="order-1 flex min-w-0 max-w-3xl flex-col gap-block lg:order-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={UI_TEXTS.searchPlaceholder}
            aria-label={UI_TEXTS.searchLabel}
            className="pl-11"
          />
        </div>

        {/* Mobile topic jump row */}
        {topicLinks.length > 1 && (
          <nav aria-label={UI_TEXTS.navTitle} className="-mx-4 flex gap-6 overflow-x-auto px-4 lg:hidden">
            {topicLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="shrink-0 whitespace-nowrap py-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
        )}

        {groups.length > 0 ? (
          <div className="flex flex-col gap-[var(--section-padding)]">
            {groups.map((group) => (
              <FAQCategoryGroup key={group.category} group={group} expandedItems={expandedItems} onToggle={toggleExpanded} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-start gap-field py-12">
            <p>{UI_TEXTS.noResults(searchTerm.trim())}</p>
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="text-small text-foreground underline underline-offset-4 hover:text-muted-foreground"
            >
              {UI_TEXTS.clearSearch}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
