export interface JournalArticle {
    id: number
    slug: string
    title: string
    excerpt: string
    content?: string
    author: string
    date: string
    readTime: string
    category: string
    categoryName: string
    image: string
    featured: boolean
}

export interface JournalCategory {
    id: string
    name: string
}

export const journalCategories: JournalCategory[] = [
    { id: "all", name: "All Stories" },
    { id: "style", name: "Style & Wardrobe" },
    { id: "self-care", name: "Self-Care & Rituals" },
    { id: "home", name: "Home & Atmosphere" },
    { id: "behind-brand", name: "Behind the Brand" },
    { id: "gift-guides", name: "Gift Guides" },
]

export const journalArticles: JournalArticle[] = [

    {
        id: 1,
        slug: "featured-in-elle-czechia",
        title: "Featured in ELLE Czechia: Anna Hora Silk Loungewear",
        excerpt:
            "ELLE Czechia spotlights Anna Hora’s silk loungewear—celebrating its featherlight drape, considered tailoring, and quietly bold femininity.",
        category: "press",
        categoryName: "Press & Features",
        author: "Anna Hora Editorial Team",
        date: "September 17, 2025",
        readTime: "3 min read",
        image: "/placeholder.svg?height=400&width=600&text=Anna%20Hora%20in%20ELLE%20Czechia",
        featured: true,
    },
    {
        id: 2,
        slug: "styling-loungewear-beyond-home",
        title: "Styling Loungewear Beyond the Home: Effortless Elegance",
        excerpt: "How to transition your favorite silk pieces from bedroom to brunch with confidence and grace.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "Sofia Chen",
        date: "December 12, 2024",
        readTime: "7 min read",
        image: "/placeholder.svg?height=400&width=600&text=Silk camisole styled for day wear",
        featured: false,
    },
    {
        id: 3,
        slug: "creating-sanctuary-texture-spaces",
        title: "Creating Sanctuary: The Power of Texture in Serene Spaces",
        excerpt: "Explore how silk and other natural materials can transform any room into a haven of tranquility.",
        category: "home",
        categoryName: "Home & Atmosphere",
        author: "Guest Editor",
        date: "December 10, 2024",
        readTime: "6 min read",
        image: "/placeholder.svg?height=400&width=600&text=Serene bedroom with silk textiles",
        featured: false,
    },
    {
        id: 4,
        slug: "cocoon-to-closet-mulberry-silk",
        title: "From Cocoon to Closet: The Journey of Mulberry Silk",
        excerpt: "Meet the artisans who transform silkworm cocoons into the luxurious fabric that defines our collections.",
        category: "behind-brand",
        categoryName: "Behind the Brand",
        author: "Elena Chen",
        date: "December 8, 2024",
        readTime: "8 min read",
        image: "/placeholder.svg?height=400&width=600&text=Silk production process and artisans",
        featured: false,
    },
    {
        id: 5,
        slug: "winter-self-care-slow-mornings",
        title: "Winter Self-Care: Embracing Slow Mornings",
        excerpt: "As the days grow shorter, discover the beauty of extending your morning routine with intention and silk.",
        category: "self-care",
        categoryName: "Self-Care & Rituals",
        author: "Sofia Chen",
        date: "December 5, 2024",
        readTime: "4 min read",
        image: "/placeholder.svg?height=400&width=600&text=Winter morning scene with silk pajamas",
        featured: false,
    },
    {
        id: 6,
        slug: "perfect-gift-curating-joy",
        title: "The Perfect Gift: Curating Moments of Joy",
        excerpt: "Our founder's guide to selecting silk pieces that create lasting memories and daily rituals of luxury.",
        category: "gift-guides",
        categoryName: "Gift Guides",
        author: "Elena Chen",
        date: "December 3, 2024",
        readTime: "5 min read",
        image: "/placeholder.svg?height=400&width=600&text=Beautifully wrapped silk gifts",
        featured: false,
    },
    {
        id: 7,
        slug: "champagne-hues-seasonal-palette",
        title: "Champagne Hues: Why This Season's Palette Speaks to the Soul",
        excerpt: "Exploring the psychology of color and why our champagne collection resonates with modern women.",
        category: "style",
        categoryName: "Style & Wardrobe",
        author: "Guest Editor",
        date: "November 28, 2024",
        readTime: "6 min read",
        image: "/placeholder.svg?height=400&width=600&text=Champagne silk pieces in natural light",
        featured: false,
    },
    {
        id: 8,
        slug: "evening-wind-down-rituals",
        title: "Evening Wind-Down: Creating Rituals That Restore",
        excerpt: "Simple practices to transition from day to night, featuring the pieces that make bedtime sacred.",
        category: "self-care",
        categoryName: "Self-Care & Rituals",
        author: "Sofia Chen",
        date: "November 25, 2024",
        readTime: "5 min read",
        image: "/placeholder.svg?height=400&width=600&text=Evening routine with silk nightwear",
        featured: false,
    },
]

export const getFeaturedArticles = () => journalArticles.filter((article) => article.featured)
export const getArticleBySlug = (slug: string) => journalArticles.find((article) => article.slug === slug)
export const getArticlesByCategory = (category: string) =>
    journalArticles.filter((article) => article.category === category)
export const getAllArticles = () => journalArticles
export const getCategories = () => journalCategories
