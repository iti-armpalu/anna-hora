import CategoryCard from "./category-card"
import { homeContent } from "@/components/home/_data"

type Collection = {
  id: string
  handle: string
  title: string
  description?: string | null
  image?: { url: string; altText?: string | null } | null
}

export default function FeaturedCategories({ collections }: { collections: Collection[] }) {
  const { categories } = homeContent

  const categoryCards = collections.map((c) => ({
    image: c.image?.url ?? "/placeholder.webp",
    title: c.title,
    description: c.description ?? "",
    href: `/collections/${c.handle}`,
    alt: c.image?.altText ?? c.title,
  }))

  return (
    <section className="section">
      <div className="container-site">
        <div className="section-header">
          <h2>
            {categories.heading}{" "}
            <em>{categories.headingEm}</em>
          </h2>
          <p>{categories.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categoryCards.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}