export interface PressArticle {
    id: string
    publication: string
    publicationLogo: string
    title: string
    quote: string
    date: string
    url: string
    featured?: boolean
  }
  
  export interface PressHighlight {
    id: string
    text: string
    publication: string
  }
  
  export const pressContent = {
    hero: {
      title: "As Seen In",
      subtitle:
        "ANNA HORA has been celebrated by leading publications for its devotion to craftsmanship, timeless femininity, and the beauty of simplicity.",
    },
  
    featuredArticles: [
      {
        id: "vogue-1",
        publication: "Vogue",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Vogue",
        title: "The New Wave of Quiet Luxury",
        quote: "A masterclass in quiet luxury — pieces that move with elegance and ease.",
        date: "March 2025",
        url: "#",
        featured: true,
      },
      {
        id: "harpers-1",
        publication: "Harper's Bazaar",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Harper's Bazaar",
        title: "Emerging Luxury Brands to Watch",
        quote: "ANNA HORA redefines intimate luxury with unparalleled craftsmanship.",
        date: "February 2025",
        url: "#",
      },
      {
        id: "elle-1",
        publication: "Elle",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Elle",
        title: "The Silk Edit: Loungewear Elevated",
        quote: "A celebration of timeless sensuality and conscious design.",
        date: "January 2025",
        url: "#",
      },
      {
        id: "marie-claire-1",
        publication: "Marie Claire",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Marie Claire",
        title: "Mindful Living Through Fashion",
        quote: "Where sustainability meets sophistication in every thread.",
        date: "December 2024",
        url: "#",
      },
      {
        id: "porter-1",
        publication: "Porter",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Porter",
        title: "The Art of Slow Fashion",
        quote: "ANNA HORA proves that true luxury is timeless, not trendy.",
        date: "November 2024",
        url: "#",
      },
      {
        id: "grazia-1",
        publication: "Grazia",
        publicationLogo: "/placeholder.svg?height=40&width=120&text=Grazia",
        title: "The Silk Revolution",
        quote: "Pieces designed for how you feel, not just how you look.",
        date: "October 2024",
        url: "#",
      },
    ] as PressArticle[],
  
    highlights: [
      {
        id: "h1",
        text: "Named one of the Top Emerging Luxury Brands of 2025",
        publication: "Harper's Bazaar",
      },
      {
        id: "h2",
        text: "Featured in Elle's Quiet Luxury Edit",
        publication: "Elle",
      },
      {
        id: "h3",
        text: "Included in Vogue's Best of Loungewear Series",
        publication: "Vogue",
      },
      {
        id: "h4",
        text: "Recognized for Sustainable Practices",
        publication: "Marie Claire",
      },
    ] as PressHighlight[],
  
    mediaContact: {
      title: "For the Press",
      description: "For media inquiries, collaborations, or access to our press kit, please contact our team below.",
      email: "press@annahora.com",
      phone: "+44 (0) 20 1234 5678",
      pressKitUrl: "#",
    },
  
    exploreMore: {
      title: "Explore More",
      description: "Discover the stories behind our brand in the Journal or learn more About ANNA HORA.",
      journalCta: "Read Journal",
      aboutCta: "About ANNA HORA",
    },
  }
  
  export const getPressFeaturedArticle = () => {
    return pressContent.featuredArticles.find((article) => article.featured)
  }
  
  export const getPressArticles = () => {
    return pressContent.featuredArticles.filter((article) => !article.featured)
  }
  