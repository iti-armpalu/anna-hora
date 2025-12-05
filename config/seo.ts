export const SEO = {
  siteName: "ANNA HORA",
  titleTemplate: "%s • ANNA HORA",
  defaultTitle: "Quiet Luxury Silk Loungewear",
  description: "Crafted with care. Worn with intention. Thank you for being here — for choosing slower moments, thoughtful design, and pieces that feel as good as they look. We're honoured to be part of your ritual.",
  ogImage: "/og/default.jpg",
  twitterHandle: "@annahora",
  robotsIndex: true,
} as const


export function formatTitle(title?: string) {
  if (!title) return SEO.defaultTitle
  return SEO.titleTemplate.replace("%s", title)
}