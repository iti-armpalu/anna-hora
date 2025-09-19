export interface UserProfile {
    firstName: string
    lastName: string
    email: string
    phone: string
    birthday: string
    preferredSize: string
    newsletter: boolean
  }
  
  export interface OrderItem {
    name: string
    color: string
    size: string
    price: number
    image: string
  }
  
  export interface Order {
    id: string
    date: string
    status: string
    total: number
    items: OrderItem[]
  }
  
  export interface WishlistItem {
    id: string
    name: string
    price: number
    originalPrice?: number
    color: string
    image: string
    inStock: boolean
  }
  
  export interface Address {
    id: string
    type: "shipping" | "billing"
    isDefault: boolean
    firstName: string
    lastName: string
    company?: string
    address1: string
    address2?: string
    city: string
    state: string
    zipCode: string
    country: string
    phone?: string
  }
  
  // Mock data for development
  export const mockUserProfile: UserProfile = {
    firstName: "Emma",
    lastName: "Thompson",
    email: "emma.thompson@email.com",
    phone: "+1 (555) 123-4567",
    birthday: "1990-06-15",
    preferredSize: "M",
    newsletter: true,
  }
  
  export const mockOrders: Order[] = [
    {
      id: "AH-2024-001",
      date: "2024-01-15",
      status: "Delivered",
      total: 532,
      items: [
        {
          name: "Midnight Silk Robe",
          color: "Midnight Navy",
          size: "M",
          price: 298,
          image: "/placeholder.svg?height=80&width=60&text=Midnight robe",
        },
        {
          name: "Cashmere Touch Eye Mask",
          color: "Warm Beige",
          size: "One Size",
          price: 45,
          image: "/placeholder.svg?height=80&width=60&text=Eye mask",
        },
      ],
    },
    {
      id: "AH-2024-002",
      date: "2024-01-28",
      status: "In Transit",
      total: 189,
      items: [
        {
          name: "Morning Mist Camisole Set",
          color: "Pearl Grey",
          size: "S",
          price: 189,
          image: "/placeholder.svg?height=80&width=60&text=Camisole set",
        },
      ],
    },
  ]
  
  export const mockWishlistItems: WishlistItem[] = [
    {
      id: "1",
      name: "Champagne Dreams Lounge Set",
      price: 245,
      originalPrice: 295,
      color: "Champagne",
      image: "/placeholder.svg?height=120&width=90&text=Champagne lounge set",
      inStock: true,
    },
    {
      id: "2",
      name: "Sage Serenity Short Set",
      price: 165,
      color: "Muted Sage",
      image: "/placeholder.svg?height=120&width=90&text=Sage pajama set",
      inStock: false,
    },
  ]
  
  export const mockAddresses: Address[] = [
    {
      id: "1",
      type: "shipping",
      firstName: "Emma",
      lastName: "Thompson",
      address1: "123 Maple Street",
      city: "San Francisco",
      state: "CA",
      zipCode: "94102",
      country: "United States",
      isDefault: true,
    },
    {
      id: "2",
      type: "billing",
      firstName: "Emma",
      lastName: "Thompson",
      company: "Thompson Design Studio",
      address1: "456 Market Street",
      address2: "Suite 200",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States",
      phone: "+1 (555) 123-4567",
      isDefault: false,
    },
  ]
  
  export const accountData = {
    userProfile: mockUserProfile,
    orders: mockOrders,
    wishlistItems: mockWishlistItems,
    addresses: mockAddresses,
  }
  