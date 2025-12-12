import CategoryCard from "./category-card"


const categories = [
  {
    image: "/velvet-trousers.webp",
    title: "Velvet, Rewritten",
    description:
      "Plush. Confident. Unrushed. Our signature velvet brings softness with weight — made for nights in, slow mornings, and everything in between.",
    href: "/collections/velvet",
    alt: "Velvet Collection",
  },
  {
    image: "/silk-trousers.webp",
    title: "Pure Silk Moments",
    description:
      "Light, breathable, and quietly powerful — each piece is crafted from 100% mulberry silk. Designed to feel effortless, look elevated, and last for years.",
    href: "/collections/silk",
    alt: "Sleepwear Collection",
  },
  {
    image: "/silk-set.webp",
    title: "Put Together, without the Effort",
    description:
      "Designed in pairs. Worn your way. Our silk sets are made to flow together — or stand strong apart. Always easy. Always elevated.",
    href: "/collections/sets",
    alt: "Lounge Sets Collection",
  },
]

export default function FeaturedCategories() {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">
            Designed for <em className="font-serif italic">Moments That Are Yours Alone</em>
          </h3>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Velvet, silk, and effortless sets — each made to move with you. Comfortable, confident, and always
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
