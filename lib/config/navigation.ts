// lib/config/navigation.ts
import type { Route } from "next";

export type NavigationItem = {
  label: string;
  href: Route;
};

export const navigation: readonly NavigationItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Our Silk", href: "/our-silk" },
  { label: "Journal", href: "/journal" },
  { label: "Gift Guide", href: "/gift-guide" },
  { label: "About", href: "/about" },
] as const;
