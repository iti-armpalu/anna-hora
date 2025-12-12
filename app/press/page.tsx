import { GET_PRESS_FEATURED_ARTICLE, GET_PRESS_ARTICLES } from "./_data"
import { PressHero } from "./_components/press-hero"
import { FeaturedArticle } from "./_components/featured-article"
import { PressArticleCard } from "./_components/press-article-card"
import { BrandHighlights } from "./_components/brand-highlights"
import { MediaContact } from "./_components/media-contact"
import { ExploreMore } from "./_components/explore-more"

export default function PressPage() {
  const featuredArticle = GET_PRESS_FEATURED_ARTICLE()
  const articles = GET_PRESS_ARTICLES()

  return (
    <div className="min-h-screen bg-stone-50">
      <PressHero />

      {featuredArticle && <FeaturedArticle article={featuredArticle} />}

      {/* Press Articles Grid */}
      <section className="py-16 lg:py-24 bg-stone-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-light text-stone-800 mb-4">Recent Features</h3>
            <p className="text-stone-600">Discover what the press is saying about ANNA HORA</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <PressArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <BrandHighlights />
      <MediaContact />
      <ExploreMore />
    </div>
  )
}
