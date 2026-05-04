// lib/config/navigation.ts
import type { Route } from "next";
import { siteConfig } from "./site";

export type NavigationItem = {
  label: string;
  href: Route;
};

export const navigation: readonly NavigationItem[] = [
  { label: "Shop", href: "/shop" },
  { label: "Our Silk", href: "/our-silk" },
  { label: "Journal", href: "/journal" },
  { label: "Gift Guide", href: "/gift-guide" },
  { label: `About ${siteConfig.displayName}`, href: "/about" },
] as const;
