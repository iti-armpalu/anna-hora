// lib/config/footer.ts
import type { Route } from "next"
import { siteConfig } from "./site"

export type FooterLink = {
  label: string
  href: Route
}

export type FooterColumn = {
  title: string
  links: FooterLink[]
}

/** Also shown in the mobile menu */
export const customerCareLinks: FooterLink[] = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact us", href: "/contact" },
  { label: "Shipping & returns", href: "/shipping-returns" },
  { label: "Size guide", href: "/size-guide" },
  { label: "Care guide", href: "/care-guide" },
]

export const footerColumns: FooterColumn[] = [
  { title: "Customer care", links: customerCareLinks },
  {
    title: "About",
    links: [
      { label: `About ${siteConfig.displayName}`, href: "/about" },
      { label: "Our silk", href: "/our-silk" },
      { label: "Gift guide", href: "/gift-guide" },
      { label: "Journal", href: "/journal" },
    ],
  },
]

export const footerLegalLinks: FooterLink[] = [
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms and conditions", href: "/terms-and-conditions" },
]

export const FOOTER_COPY = {
  instagramTitle: "Follow us",
  rights: "All rights reserved.",
} as const
