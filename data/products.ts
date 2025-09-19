export interface Product {
    id: number
    name: string
    description: string
    price: number
    originalPrice: number | null
    category: string
    color: string
    fabric: string
    sizes: string[]
    image: string
    hoverImage: string
    isNew: boolean
    isBestseller: boolean
    isLimited: boolean
    rating: number
    reviews: number
    stock: number
    // Shopify-specific fields for future integration
    shopifyId?: string
    handle?: string
    variants?: ProductVariant[]
  }
  
  export interface ProductVariant {
    id: string
    title: string
    price: number
    available: boolean
    selectedOptions: {
      name: string
      value: string
    }[]
  }
  
  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Midnight Silk Robe",
      description: "100% Mulberry Silk Charmeuse Robe",
      price: 298,
      originalPrice: null,
      category: "robes",
      color: "Midnight Navy",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Midnight silk robe on model",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Midnight robe detail shot",
      isNew: true,
      isBestseller: false,
      isLimited: false,
      rating: 4.9,
      reviews: 127,
      stock: 8,
    },
    {
      id: 2,
      name: "Champagne Silk Camisole Set",
      description: "Luxurious mulberry silk camisole and shorts set",
      price: 285,
      originalPrice: 320,
      category: "sets",
      color: "Champagne",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Champagne silk camisole set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Champagne set detail view",
      isNew: false,
      isBestseller: true,
      isLimited: false,
      rating: 4.8,
      reviews: 203,
      stock: 15,
    },
    {
      id: 3,
      name: "Ivory Silk Pajama Set",
      description: "Classic silk pajama set in elegant ivory",
      price: 345,
      originalPrice: null,
      category: "pajamas",
      color: "Ivory",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Ivory silk pajama set",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Ivory pajamas detail",
      isNew: false,
      isBestseller: true,
      isLimited: false,
      rating: 4.7,
      reviews: 156,
      stock: 12,
    },
    {
      id: 4,
      name: "Blush Silk Slip Dress",
      description: "Elegant silk slip dress in soft blush",
      price: 225,
      originalPrice: null,
      category: "dresses",
      color: "Blush",
      fabric: "Mulberry Silk",
      sizes: ["XS", "S", "M", "L", "XL"],
      image: "/placeholder.svg?height=400&width=300&text=Blush silk slip dress",
      hoverImage: "/placeholder.svg?height=400&width=300&text=Blush dress back view",
      isNew: true,
      isBestseller: false,
      isLimited: true,
      rating: 4.6,
      reviews: 89,
      stock: 5,
    },
  ]
  
  export const getProducts = async (): Promise<Product[]> => {
    return mockProducts
  }
  
  export const getFeaturedProducts = async (): Promise<Product[]> => {
    const products = await getProducts()
    return products.filter((product) => product.isBestseller || product.isNew)
  }
  
  export const getProductById = async (id: number): Promise<Product | undefined> => {
    const products = await getProducts()
    return products.find((product) => product.id === id)
  }
  
  export const getProductsByCategory = async (category: string): Promise<Product[]> => {
    const products = await getProducts()
    return products.filter((product) => product.category === category)
  }
  
  export const DATA_SOURCE = {
    USE_SHOPIFY: false, // Set to true when Shopify is ready
    // Shopify configuration will be handled server-side when implemented
  }
  