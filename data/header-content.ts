// data/header-content.ts
import type { Route } from "next"

export const headerContent = {
  brand: { name: "ANNA HORA" },
  navigation: [
    { label: "Shop", href: "/shop" as Route },
    { label: "Our Silk", href: "/our-silk" as Route },
    { label: "Journal", href: "/journal" as Route },
    { label: "Gift Guide", href: "/gift-guide" as Route },
    { label: "About", href: "/about" as Route },
  ],
} as const
