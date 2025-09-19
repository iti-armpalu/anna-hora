export const SEO = {
    siteName: "ANNA HORA",
    titleTemplate: "%s • ANNA HORA",
    defaultTitle: "Quiet Luxury Silk Loungewear",
    description: "Crafting moments of quiet luxury through the finest silk loungewear, designed for those who understand that true elegance is found in simplicity.",
    ogImage: "/og/default.jpg",
    twitterHandle: "@annahora",
    robotsIndex: true,
  } as const
  

  export function formatTitle(title?: string) {
    if (!title) return SEO.defaultTitle
    return SEO.titleTemplate.replace("%s", title)
  }