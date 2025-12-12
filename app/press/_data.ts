// Types
export interface PressArticle {
    id: string
    title: string
    quote: string
    publication: string
    publicationLogo: string
    url: string
    date: string
    featured?: boolean
  }
  
  export interface PressHighlight {
    id: string
    text: string
    publication: string
  }
  
  export interface PressContent {
    hero: {
      title: string
      subtitle: string
    }
    highlights: PressHighlight[]
    mediaContact: {
      title: string
      description: string
      email: string
      phone: string
    }
    exploreMore: {
      title: string
      description: string
      journalCta: string
      aboutCta: string
    }
  }
  
  // Publications list
  export const PUBLICATIONS = ["Vogue", "Harper's Bazaar", "Elle", "Marie Claire", "Porter"] as const
  
  // Press articles data
  const PRESS_ARTICLES: PressArticle[] = [
    {
      id: "1",
      title: "The Art of Timeless Design: ANNA HORA's Vision for Modern Living",
      quote: "ANNA HORA redefines luxury through minimalist elegance and masterful craftsmanship.",
      publication: "Vogue",
      publicationLogo: "/vogue-logo.jpg",
      url: "https://example.com/article-1",
      date: "March 15, 2024",
      featured: true,
    },
    {
      id: "2",
      title: "Sustainable Luxury: How ANNA HORA Champions Ethical Fashion",
      quote: "A brand that proves sustainability and style can coexist beautifully.",
      publication: "Harper's Bazaar",
      publicationLogo: "/harpers-bazaar-logo.png",
      url: "https://example.com/article-2",
      date: "February 28, 2024",
    },
    {
      id: "3",
      title: "The New Wave of Minimalism in Fashion Design",
      quote: "ANNA HORA's collections embody the essence of refined simplicity.",
      publication: "Elle",
      publicationLogo: "/elle-magazine-logo.png",
      url: "https://example.com/article-3",
      date: "January 20, 2024",
    },
    {
      id: "4",
      title: "Craftsmanship Meets Innovation at ANNA HORA",
      quote: "Every piece tells a story of dedication to the art of making.",
      publication: "Marie Claire",
      publicationLogo: "/marie-claire-logo.jpg",
      url: "https://example.com/article-4",
      date: "December 10, 2023",
    },
    {
      id: "5",
      title: "The Future of Conscious Design",
      quote: "ANNA HORA leads the way in thoughtful, purposeful creation.",
      publication: "Porter",
      publicationLogo: "/porter-magazine-logo.jpg",
      url: "https://example.com/article-5",
      date: "November 5, 2023",
    },
    {
      id: "6",
      title: "Elegance Redefined: The ANNA HORA Philosophy",
      quote: "A masterclass in balancing tradition with contemporary vision.",
      publication: "Vogue",
      publicationLogo: "/vogue-logo.jpg",
      url: "https://example.com/article-6",
      date: "October 18, 2023",
    },
  ]
  
  // Press content data
  export const PRESS_CONTENT: PressContent = {
    hero: {
      title: "Press & Features",
      subtitle:
        "Discover how ANNA HORA is shaping conversations around design, craftsmanship, and the art of living beautifully.",
    },
    highlights: [
      {
        id: "1",
        text: "ANNA HORA's dedication to craftsmanship sets a new standard in contemporary design.",
        publication: "Vogue",
      },
      {
        id: "2",
        text: "A brand that seamlessly blends heritage techniques with modern sensibilities.",
        publication: "Harper's Bazaar",
      },
      {
        id: "3",
        text: "ANNA HORA proves that true luxury lies in thoughtful, intentional creation.",
        publication: "Elle",
      },
      {
        id: "4",
        text: "Each collection is a testament to the power of minimalist elegance.",
        publication: "Marie Claire",
      },
    ],
    mediaContact: {
      title: "Media Inquiries",
      description:
        "For press inquiries, interview requests, or high-resolution imagery, please contact our media relations team.",
      email: "press@annahora.com",
      phone: "+1 (555) 123-4567",
    },
    exploreMore: {
      title: "Explore Our Story",
      description:
        "Dive deeper into the world of ANNA HORA through our journal and discover the philosophy behind our creations.",
      journalCta: "Visit Journal",
      aboutCta: "Learn About Us",
    },
  }
  
  // Helper functions
  export function GET_PRESS_FEATURED_ARTICLE(): PressArticle | undefined {
    return PRESS_ARTICLES.find((article) => article.featured)
  }
  
  export function GET_PRESS_ARTICLES(): PressArticle[] {
    return PRESS_ARTICLES.filter((article) => !article.featured)
  }
  
  export function GET_ALL_PRESS_ARTICLES(): PressArticle[] {
    return PRESS_ARTICLES
  }
  