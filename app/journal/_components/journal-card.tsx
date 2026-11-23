import Image from "next/image"
import Link from "next/link"
import type { NormalizedArticle } from "@/lib/shopify/blog"
import { getArticleMeta } from "../_utils"

type Props = {
    article: NormalizedArticle
    /** Passed to next/image — depends on how many columns the card sits in */
    sizes: string
    showExcerpt?: boolean
}

/** Editorial story card — image, category eyebrow, title, optional excerpt, date. No box, no shadow. */
export function JournalCard({ article, sizes, showExcerpt = true }: Props) {
    const meta = getArticleMeta(article)

    return (
        <Link href={`/journal/${article.slug}`} className="group flex flex-col">
            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                    src={article.image}
                    alt={article.imageAlt || article.title}
                    fill
                    sizes={sizes}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
            </div>

            <div className="mt-4 flex flex-col gap-tight">
                {article.category && (
                    <span className="text-2xs uppercase tracking-widest text-muted-foreground">
                        {article.category}
                    </span>
                )}
                <h3 className="text-heading-sm font-light mb-0 line-clamp-2 transition-colors group-hover:text-muted-foreground">
                    {article.title}
                </h3>
                {showExcerpt && article.excerpt && (
                    <p className="text-small text-muted-foreground line-clamp-2">{article.excerpt}</p>
                )}
                {meta && <span className="text-xs text-muted-foreground">{meta}</span>}
            </div>
        </Link>
    )
}
