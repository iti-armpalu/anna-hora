// data/footer-content.ts
import type { Route } from "next"

// Narrow, literal-typed items
export const footerContent = {
  brand: {
    name: "ANNA HORA",
    description:
      "Crafting moments of quiet luxury through the finest silk loungewear, designed for those who understand that true elegance is found in simplicity.",
  },
  navigation: {
    shop: [
      { label: "All Products", href: "/shop" as Route },
      { label: "Sets", href: "/shop?category=sets" as Route },
      { label: "Tops", href: "/shop?category=tops" as Route },
      { label: "Bottoms", href: "/shop?category=bottoms" as Route },
      { label: "Gift Guide", href: "/gift-guide" as Route },
    ],
    customerCare: [
      { label: "FAQ", href: "/faq" as Route },
      { label: "Contact Us", href: "/contact" as Route },
      { label: "Shipping & Returns", href: "/shipping" as Route },
      { label: "Size Guide", href: "/size-guide" as Route },
      { label: "Care Guide", href: "/care-guide" as Route },
    ],
    about: [
      { label: "Our Story", href: "/about" as Route },
      { label: "Our Silk", href: "/our-silk" as Route },
      { label: "Journal", href: "/journal" as Route },
      { label: "Sustainability", href: "/sustainability" as Route },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" as Route },
      { label: "Terms of Service", href: "/terms" as Route },
    ],
  },
} as const satisfies {
  brand: { name: string; description: string }
  navigation: Record<
    "shop" | "customerCare" | "about" | "legal",
    readonly { label: string; href: Route }[]
  >
}
