import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getAllArticles } from "@/lib/shopify/blog"
import { journalContent } from "./_data"
import JournalPageClient from "./_components/journal-page-client"

export const metadata: Metadata = pageMeta.journal
export const revalidate = 3600

export default async function JournalPage() {
  const articles = await getAllArticles()

  const categories = [
    journalContent.search.allCategory,
    ...Array.from(
      new Set(articles.map((a) => a.category).filter(Boolean))
    ),
  ] as string[]

  return (
    <JournalPageClient
      articles={articles}
      categories={categories}
    />
  )
}