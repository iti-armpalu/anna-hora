import Link from "next/link"
import { cn } from "@/lib/utils"
import { getCategoryHref } from "../_utils"

type Props = {
    categories: string[]
    activeCategory: string
    allCategory: string
}

/** Category filter as plain links (?category=), so the listing stays a server component with no client JS. */
export function JournalCategoryTabs({ categories, activeCategory, allCategory }: Props) {
    return (
        <nav aria-label="Journal categories" className="flex items-center justify-center gap-6 overflow-x-auto">
            {categories.map((category) => {
                const isActive = category === activeCategory
                return (
                    <Link
                        key={category}
                        href={getCategoryHref(category, allCategory)}
                        // Keep the reader at the tabs instead of jumping to the top of the page
                        scroll={false}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                            "inline-flex h-9 items-center whitespace-nowrap text-xs uppercase tracking-widest transition-colors",
                            isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {category}
                    </Link>
                )
            })}
        </nav>
    )
}
