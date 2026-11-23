// lib/config/footer.ts
import type { Route } from "next";
import { siteConfig } from "./site";

export type FooterLink = {
  label: string;
  href: Route;
};

export type FooterSection =
  | "shop"
  | "customerCare"
  | "about"
  | "legal";

export const footerNavigation = {
  shop: [
    { label: "All products", href: "/shop" },
    { label: "Sets", href: "/shop?category=shirts" },
    { label: "Tops", href: "/shop?category=shorts" },
    { label: "Bottoms", href: "/shop?category=trousers" },
    { label: "Gift guide", href: "/gift-guide" },
  ],
  customerCare: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact us", href: "/contact" },
    { label: "Shipping & returns", href: "/shipping-returns" },
    { label: "Size guide", href: "/size-guide" },
    { label: "Care guide", href: "/care-guide" },
  ],
  about: [
    { label: `About ${siteConfig.displayName}`, href: "/about" },
    { label: "Our silk", href: "/our-silk" },
    { label: "Gift guide", href: "/gift-guide" },
    { label: "Journal", href: "/journal" },
  ],
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms and conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<FooterSection, readonly FooterLink[]>;
