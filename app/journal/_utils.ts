import type { NormalizedArticle } from "@/lib/shopify/blog"

/** "12 March 2026 · 5 min read" — read time is optional per article. */
export function getArticleMeta(article: NormalizedArticle): string {
    return [article.date, article.readTime].filter(Boolean).join(" · ")
}

/** Journal listing URL for a category; the "All" category is the bare /journal URL. */
export function getCategoryHref(category: string, allCategory: string): string {
    return category === allCategory ? "/journal" : `/journal?category=${encodeURIComponent(category)}`
}
