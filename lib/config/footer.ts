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
    { label: "All Products", href: "/shop" },
    { label: "Sets", href: "/shop?category=shirts" },
    { label: "Tops", href: "/shop?category=shorts" },
    { label: "Bottoms", href: "/shop?category=trousers" },
    { label: "Gift Guide", href: "/gift-guide" },
  ],
  customerCare: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Care Guide", href: "/care-guide" },
  ],
  about: [
    { label: `About ${siteConfig.displayName}`, href: "/about" },
    { label: "Our Silk", href: "/our-silk" },
    { label: "Gift Guide", href: "/gift-guide" },
    { label: "Journal", href: "/journal" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms-and-conditions" },
  ],
} satisfies Record<FooterSection, readonly FooterLink[]>;
