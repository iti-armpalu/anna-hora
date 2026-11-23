import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config/site"
import { getArticleByHandle, getAllArticles } from "@/lib/shopify/blog"
import { getProductByHandle } from "@/lib/shopify/product"
import type { ProductNormalized } from "@/lib/shopify/types/product-normalized"
import { ProductCard } from "@/components/shop/product-card"
import { journalContent } from "../_data"
import { getArticleMeta } from "../_utils"
import { JournalCard } from "../_components/journal-card"

export const dynamicParams = true

const RELATED_LIMIT = 3
const CARD_SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"

// Long-form body. Colours/weights mapped to brand tokens; `em` picks up the serif italic from globals.
const PROSE_CLASS = cn(
  "prose lg:prose-lg max-w-[var(--content-narrow)]",
  "prose-headings:font-light prose-headings:text-foreground prose-headings:tracking-tight",
  "prose-p:text-muted-foreground prose-li:text-muted-foreground prose-li:marker:text-muted-foreground",
  "prose-strong:font-medium prose-strong:text-foreground",
  "prose-a:text-foreground prose-a:underline-offset-4 prose-a:decoration-1 prose-a:hover:decoration-2",
  "prose-blockquote:border-l-border prose-blockquote:font-light prose-blockquote:not-italic prose-blockquote:text-foreground",
  "prose-hr:border-border prose-img:my-10"
)

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleByHandle(slug)

  if (!article) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    }
  }

  const title = article.seo?.title ?? article.title
  // `||` not `??`: a missing excerpt is "", which `??` would pass through as an empty description
  const description =
    article.seo?.description ||
    article.excerpt ||
    `Read ${article.title} on the ${siteConfig.displayName} Journal.`

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/journal/${slug}`,
    },
    openGraph: {
      title: `${title} | ${siteConfig.displayName}`,
      description,
      url: `${siteConfig.url}/journal/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.imageAlt || article.title,
        },
      ],
    },
  }
}

/** The shoppable product is an enhancement — if it fails to load, the story still renders without it. */
async function getFeaturedProductSafe(handle: string | undefined): Promise<ProductNormalized | null> {
  if (!handle) return null
  try {
    return await getProductByHandle(handle)
  } catch (err: unknown) {
    console.error(`Journal featured product "${handle}" failed:`, err instanceof Error ? err.message : err)
    return null
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { article: articleContent, relatedArticles: relatedContent } = journalContent

  // The product depends on the article's tags, so it chains off the article fetch;
  // the article list is independent and runs alongside.
  const [{ article, featuredProduct }, allArticles] = await Promise.all([
    getArticleByHandle(slug).then(async (article) => ({
      article,
      // Only the first tagged product is shown — don't fetch the rest
      featuredProduct: await getFeaturedProductSafe(article?.featuredProductHandles[0]),
    })),
    getAllArticles(),
  ])

  if (!article) notFound()

  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, RELATED_LIMIT)

  const meta = [`By ${article.author}`, getArticleMeta(article)].join(" · ")

  return (
    <>
      <article>
        {/* Hero — text beside a portrait image (4:5 matches the journal cards, so nothing is cropped oddly) */}
        <header className="container-site pt-8 lg:pt-12">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            {articleContent.backLabel}
          </Link>

          <div className="mt-block grid grid-cols-1 items-center gap-block lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-field lg:max-w-lg">
              {article.category && <span className="label-uppercase">{article.category}</span>}
              <h1 className="text-heading-lg font-light mb-0">{article.title}</h1>
              {article.excerpt && <p className="text-muted-foreground">{article.excerpt}</p>}
              <span className="text-xs text-muted-foreground">{meta}</span>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
              <Image
                src={article.image}
                alt={article.imageAlt || article.title}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </header>

        {/* Body — reading column, with the featured product alongside on desktop */}
        <div className="container-site py-12 lg:py-20">
          <div
            className={cn(
              "mx-auto max-w-5xl",
              featuredProduct && "lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:gap-16"
            )}
          >
            <div
              className={cn(PROSE_CLASS, !featuredProduct && "mx-auto")}
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {featuredProduct && (
              // On mobile this follows the story instead of interrupting it; on desktop it sticks alongside
              <aside className="mt-[var(--section-padding)] flex flex-col gap-field border-t border-border pt-block lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:mt-0 lg:self-start lg:border-t-0 lg:pt-0">
                <span className="label-uppercase">{articleContent.featuredProductLabel}</span>
                <div className="max-w-xs">
                  <ProductCard product={featuredProduct} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {relatedArticles.length > 0 && (
        <section className="section border-t border-border">
          <div className="container-site">
            <h2 className="text-heading-md font-light mb-10 text-center">{relatedContent.heading}</h2>
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {relatedArticles.map((related) => (
                <JournalCard key={related.id} article={related} showExcerpt={false} sizes={CARD_SIZES} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
