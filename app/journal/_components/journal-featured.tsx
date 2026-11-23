import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { NormalizedArticle } from "@/lib/shopify/blog"
import { journalContent } from "../_data"
import { getArticleMeta } from "../_utils"

/** Featured story — large image beside the text, editorial rather than a boxed card. */
export function JournalFeatured({ article }: { article: NormalizedArticle }) {
    const { featured } = journalContent
    const href = `/journal/${article.slug}`
    const meta = [`By ${article.author}`, getArticleMeta(article)].filter(Boolean).join(" · ")

    return (
        <article className="grid grid-cols-1 items-center gap-block lg:grid-cols-2 lg:gap-16">
            <Link href={href} tabIndex={-1} aria-hidden="true" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-secondary lg:aspect-[4/5]">
                    <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        priority
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                </div>
            </Link>

            <div className="flex flex-col gap-field lg:max-w-md">
                <span className="label-uppercase">
                    {featured.badge}
                    {article.category && <> · {article.category}</>}
                </span>
                <h2 className="text-heading-lg font-light mb-0">
                    <Link href={href} className="transition-colors hover:text-muted-foreground">
                        {article.title}
                    </Link>
                </h2>
                {article.excerpt && <p className="text-muted-foreground">{article.excerpt}</p>}
                <span className="text-xs text-muted-foreground">{meta}</span>
                <Button asChild variant="outline" className="mt-tight w-fit">
                    <Link href={href} aria-label={`${featured.ctaLabel}: ${article.title}`}>
                        {featured.ctaLabel}
                    </Link>
                </Button>
            </div>
        </article>
    )
}
