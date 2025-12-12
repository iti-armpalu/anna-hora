// app/components/footer/sections.ts
import type { FooterSection } from "@/lib/config/footer";

export const footerSections: readonly {
  key: FooterSection;
  title: string;
}[] = [
  // { key: "shop", title: "Shop" },
  { key: "customerCare", title: "Customer Care" },
  { key: "about", title: "About" },
] as const;
