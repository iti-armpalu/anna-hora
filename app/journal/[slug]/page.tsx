import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/config/site"
import { getArticleByHandle, getAllArticles } from "@/lib/shopify/blog"
import { getProductByHandle } from "@/lib/shopify/product"
import { ProductCard } from "@/components/shop/product-card"
import { journalContent } from "../_data"

export const revalidate = 3600
export const dynamicParams = true

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

  return {
    title: article.seo?.title ?? article.title,
    description:
      article.seo?.description ??
      article.excerpt ??
      `Read ${article.title} on the ${siteConfig.displayName} Journal.`,
    alternates: {
      canonical: `${siteConfig.url}/journal/${slug}`,
    },
    openGraph: {
      title: `${article.seo?.title ?? article.title} | ${siteConfig.displayName}`,
      description: article.seo?.description ?? article.excerpt,
      url: `${siteConfig.url}/journal/${slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.image
        ? [
          {
            url: article.image,
            width: 1200,
            height: 630,
            alt: article.imageAlt || article.title,
          },
        ]
        : undefined,
    },
  }
}

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [article, allArticles] = await Promise.all([
    getArticleByHandle(slug),
    getAllArticles(),
  ])

  if (!article) notFound()

  const relatedArticles = allArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, 3)

  const handles = article.featuredProductHandles ?? []
  const featuredProducts = (
    await Promise.all(handles.map((h) => getProductByHandle(h)))
  ).filter(Boolean)

  const featured = featuredProducts[0]
  const { relatedArticles: relatedContent } = journalContent

  return (
    <>
      {/* Back to Journal */}
      <div className="py-6 border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/journal"
            className="flex items-center space-x-2 text-stone-600 hover:text-stone-800 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to Journal</span>
          </Link>
        </div>
      </div>

      <section className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex gap-12 items-start pt-12">

              {/* Left — image + article */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-center mb-10">
                  <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      fill
                      className="object-cover"
                      priority
                      sizes="(min-width: 768px) 448px, 100vw"
                    />
                  </div>
                </div>

                {/* Mobile product card */}
                {featured && (
                  <div className="lg:hidden border border-stone-200 rounded-sm p-4 mb-10">
                    <p className="text-xs text-stone-400 tracking-wide mb-4">
                      Featured in this story
                    </p>
                    <ProductCard product={featured} />
                  </div>
                )}

                <article className="max-w-2xl pb-16">
                  <header className="mb-12">
                    {article.category && (
                      <span className="text-xs text-stone-400 tracking-wide mb-3 block">
                        {article.category}
                      </span>
                    )}
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-stone-800 mb-4 sm:mb-6 leading-tight">
                      {article.title}
                    </h1>
                    <p className="text-base sm:text-lg text-stone-600 mb-6 sm:mb-8 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <div className="flex flex-col gap-1 text-sm text-stone-500">
                      <span>By {article.author}</span>
                      <div className="flex items-center gap-2">
                        <span>{article.date}</span>
                        {article.readTime && (
                          <>
                            <span>·</span>
                            <span>{article.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </header>

                  <Separator className="mb-12" />

                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg prose-stone max-w-none
                    prose-headings:font-light prose-headings:text-stone-800
                    prose-headings:mt-6 sm:prose-headings:mt-8
                    prose-headings:mb-3 sm:prose-headings:mb-4
                    prose-h3:text-xl sm:prose-h3:text-2xl
                    prose-h3:mt-8 sm:prose-h3:mt-12
                    prose-p:text-stone-600 prose-p:leading-relaxed
                    prose-p:mb-4 sm:prose-p:mb-6
                    prose-ul:my-4 sm:prose-ul:my-6
                    prose-ul:space-y-2 sm:prose-ul:space-y-3
                    prose-li:text-stone-600 prose-li:leading-relaxed
                    prose-strong:text-stone-800 prose-strong:font-medium"
                    dangerouslySetInnerHTML={{ __html: article.content ?? "" }}
                  />
                </article>
              </div>

              {/* Right — sticky product card desktop */}
              {featured && (
                <aside className="hidden lg:block w-72 shrink-0 sticky top-24 self-start">
                  <div className="border border-stone-200 rounded-sm p-4">
                    <p className="text-xs text-stone-400 tracking-wide mb-4">
                      Featured in this story
                    </p>
                    <ProductCard product={featured} className="py-0" />
                  </div>
                </aside>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-light text-stone-800 mb-12 text-center">
                {relatedContent.heading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/journal/${related.slug}`}
                    aria-label={`Read more about ${related.title}`}
                  >
                    <div className="group cursor-pointer overflow-hidden">
                      <div className="relative aspect-[3/4] overflow-hidden mb-4">
                        <Image
                          src={related.image || "/placeholder.svg"}
                          alt={related.imageAlt || related.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                      <span className="text-xs text-stone-400 tracking-wide mb-1 block">
                        {related.category ?? related.tags[0]}
                      </span>
                      <h3 className="text-base font-light text-stone-800 mb-2 leading-snug group-hover:text-stone-500 transition-colors duration-300">
                        {related.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-stone-400">
                        <span>{related.date}</span>
                        {related.readTime && (
                          <>
                            <span>·</span>
                            <span>{related.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}