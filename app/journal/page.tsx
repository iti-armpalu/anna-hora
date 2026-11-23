import type { Metadata } from "next"
import { pageMeta } from "@/lib/config/metadata"
import { getAllArticles } from "@/lib/shopify/blog"
import { NewsletterSection } from "@/components/common/newsletter-section"
import { journalContent } from "./_data"
import { JournalCard } from "./_components/journal-card"
import { JournalFeatured } from "./_components/journal-featured"
import { JournalCategoryTabs } from "./_components/journal-category-tabs"

export const metadata: Metadata = pageMeta.journal

const FEATURED_TAG = "featured"
const CATEGORY_PARAM = "category"
const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

export default async function JournalPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
    const { hero, search, empty } = journalContent

    // Independent — fetch in parallel. Articles are cached at fetch level (see getAllArticles).
    const [articles, query] = await Promise.all([getAllArticles(), searchParams])

    const categories = [
        search.allCategory,
        ...Array.from(new Set(articles.map((a) => a.category).filter((c): c is string => Boolean(c)))),
    ]

    // Unknown or missing ?category= falls back to "All"
    const requestedCategory = query[CATEGORY_PARAM]
    const activeCategory =
        typeof requestedCategory === "string" && categories.includes(requestedCategory)
            ? requestedCategory
            : search.allCategory
    const isAll = activeCategory === search.allCategory

    const featuredArticle = isAll ? articles.find((a) => a.tags.includes(FEATURED_TAG)) : undefined
    // Exclude the featured story from the grid only while it's shown above — otherwise filtering
    // by its own category would hide it entirely
    const gridArticles = articles.filter(
        (a) => a !== featuredArticle && (isAll || a.category === activeCategory)
    )

    return (
        <>
            <header className="container-site pt-12 pb-10 lg:pt-16">
                <div className="mx-auto flex max-w-[var(--content-narrow)] flex-col text-center gap-field">
                    <h1 className="text-heading-lg font-light text-balance mb-0">
                        {hero.headingTop} <em>{hero.headingEm}</em>
                    </h1>
                    <p className="text-muted-foreground">{hero.description}</p>
                </div>
            </header>

            {categories.length > 2 && (
                <div className="border-y border-border">
                    <div className="container-site py-2.5">
                        <JournalCategoryTabs
                            categories={categories}
                            activeCategory={activeCategory}
                            allCategory={search.allCategory}
                        />
                    </div>
                </div>
            )}

            {/* Section-level gap between the featured story and the grid — same token as .section padding */}
            <main className="container-site flex flex-col gap-[var(--section-padding)] py-12 lg:py-16">
                {featuredArticle && <JournalFeatured article={featuredArticle} />}

                {gridArticles.length > 0 ? (
                    <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                        {gridArticles.map((article) => (
                            <JournalCard key={article.id} article={article} sizes={CARD_SIZES} />
                        ))}
                    </div>
                ) : (
                    !featuredArticle && <p className="py-16 text-center text-muted-foreground">{empty}</p>
                )}
            </main>

            <NewsletterSection />
        </>
    )
}
