import CategoryCard from "./category-card"

type Collection = {
  id: string;
  handle: string;
  title: string;
  description?: string | null;
  image?: { url: string; altText?: string | null } | null;
};

export default function FeaturedCategories({ collections }: { collections: Collection[] }) {
  const categories = collections.map((c) => ({
    image: c.image?.url ?? "/placeholder.webp", // add a placeholder in /public
    title: c.title,
    description: c.description ?? "",
    href: `/collections/${c.handle}`,
    alt: c.image?.altText ?? c.title,
  }));

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
            Designed for <em className="font-serif italic">Moments That Are Yours Alone</em>
          </h3>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Shirts, shorts and trousers — each made to move with you. Comfortable, confident, and always
            intentional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.href} {...category} />
          ))}
        </div>
      </div>
    </section>
  )
}
