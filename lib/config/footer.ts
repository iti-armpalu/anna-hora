// lib/config/footer.ts
import type { Route } from "next";

export type FooterLink = {
  label: string;
  href: Route;
};

export type FooterSection =
  // | "shop"
  | "customerCare"
  | "about"
  | "legal";

export const footerNavigation = {
  // shop: [
  //   { label: "All Products", href: "/shop" },
  //   { label: "Sets", href: "/shop?category=sets" },
  //   { label: "Tops", href: "/shop?category=tops" },
  //   { label: "Bottoms", href: "/shop?category=bottoms" },
  //   { label: "Gift Guide", href: "/gift-guide" },
  // ],
  customerCare: [
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Size Guide", href: "/size-guide" },
    { label: "Care Guide", href: "/care-guide" },
  ],
  about: [
    { label: "Our Story", href: "/about" },
    { label: "Our Silk", href: "/our-silk" },
    { label: "Gift Guide", href: "/gift-guide" },
    { label: "Journal", href: "/journal" },
    // { label: "Press", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    // { label: "QR Scanned Link", href: "/product-experience" },
  ],
} satisfies Record<FooterSection, readonly FooterLink[]>;
