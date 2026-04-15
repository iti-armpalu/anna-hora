import { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

// ------------------------------------
// Shared defaults
// ------------------------------------
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Mulberry silk loungewear crafted for the moments you keep to yourself.",
  keywords: ["silk loungewear", "mulberry silk", "luxury sleepwear", "silk pyjamas", "ANNA HORA"],
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "ANNA HORA – Mulberry Silk Loungewear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@anna_hora_collection",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ------------------------------------
// Static page metadata
// ------------------------------------
export const pageMeta = {
  home: {
    description:
      "ANNA HORA creates premium mulberry silk shirts, shorts and trousers — designed for slow mornings, quiet evenings, and everything in between.",
    openGraph: {
      url: `${siteConfig.url}/`,
      type: "website" as const,
    },
    alternates: {
      canonical: `${siteConfig.url}/`,
    },
  },
  shop: {
    title: "Shop All",
    description:
      "Browse the full ANNA HORA collection — mulberry silk loungewear designed with intention.",
    openGraph: {
      url: `${siteConfig.url}/shop`,
    },
    alternates: {
      canonical: `${siteConfig.url}/shop`,
    },
  },
  ourSilk: {
    title: "Our Silk",
    description:
      "18 months in the making. Discover why ANNA HORA's mulberry silk is unlike anything else — chosen with care, worn with ease.",
    openGraph: {
      url: `${siteConfig.url}/our-silk`,
    },
    alternates: {
      canonical: `${siteConfig.url}/our-silk`,
    },
  },
  journal: {
    title: "Journal",
    description:
      "Slow reads on self-care, style, and the art of intentional living — from the ANNA HORA world.",
    openGraph: {
      url: `${siteConfig.url}/journal`,
    },
    alternates: {
      canonical: `${siteConfig.url}/journal`,
    },
  },
  giftGuide: {
    title: "Gift Guide",
    description:
      "Find the perfect gift for her — silk pieces that arrive beautifully wrapped, with a handwritten note.",
    openGraph: {
      url: `${siteConfig.url}/gift-guide`,
    },
    alternates: {
      canonical: `${siteConfig.url}/gift-guide`,
    },
  },
  about: {
    title: "About",
    description:
      "The story behind ANNA HORA — a brand built on quiet luxury, thoughtful design, and silk that feels like coming home.",
    openGraph: {
      url: `${siteConfig.url}/about`,
    },
    alternates: {
      canonical: `${siteConfig.url}/about`,
    },
  },
  contact: {
    title: "Contact Us",
    description:
      "Questions about your order, sizing, or a collaboration? We're here and happy to help.",
    openGraph: {
      url: `${siteConfig.url}/contact`,
    },
    alternates: {
      canonical: `${siteConfig.url}/contact`,
    },
  },
  faq: {
    title: "FAQ",
    description:
      "Everything you need to know about ANNA HORA — shipping, returns, sizing, silk care, and more.",
    openGraph: {
      url: `${siteConfig.url}/faq`,
    },
    alternates: {
      canonical: `${siteConfig.url}/faq`,
    },
  },
  shippingReturns: {
    title: "Shipping & Returns",
    description:
      "Free shipping within EU. Easy returns within 14 days. All the details you need.",
    openGraph: {
      url: `${siteConfig.url}/shipping-returns`,
    },
    alternates: {
      canonical: `${siteConfig.url}/shipping-returns`,
    },
  },
  sizeGuide: {
    title: "Size Guide",
    description:
      "Find your perfect fit with the ANNA HORA size guide — relaxed, considered sizing for silk loungewear.",
    openGraph: {
      url: `${siteConfig.url}/size-guide`,
    },
    alternates: {
      canonical: `${siteConfig.url}/size-guide`,
    },
  },
  careGuide: {
    title: "Care Guide",
    description:
      "How to care for your ANNA HORA silk — simple steps to keep your pieces beautiful for years.",
    openGraph: {
      url: `${siteConfig.url}/care-guide`,
    },
    alternates: {
      canonical: `${siteConfig.url}/care-guide`,
    },
  },
  wishlist: {
    title: "Wishlist",
    description: "Your saved ANNA HORA pieces — ready when you are.",
    openGraph: {
      url: `${siteConfig.url}/wishlist`,
    },
    robots: { index: false, follow: false },
  },
  signIn: {
    title: "Sign In",
    description:
      "Sign in to your ANNA HORA account to track orders, manage returns, and save your wishlist.",
    openGraph: { url: `${siteConfig.url}/sign-in` },
    robots: { index: false, follow: false },
  },
  cart: {
    title: "Your Cart",
    description: "Review your ANNA HORA selection before checkout.",
    openGraph: { url: `${siteConfig.url}/cart` },
    robots: { index: false, follow: false },
  },
  account: {
    title: "My Account",
    description: "Manage your ANNA HORA account, orders, and preferences.",
    openGraph: { url: `${siteConfig.url}/account` },
    robots: { index: false, follow: false },
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "The terms and conditions governing your use of the ANNA HORA website and services.",
    openGraph: { url: `${siteConfig.url}/terms-and-conditions` },
    alternates: {
      canonical: `${siteConfig.url}/terms-and-conditions`,
    },
  },
  privacy: {
    title: "Privacy Policy",
    description:
      "How ANNA HORA collects, uses, and protects your personal data.",
    openGraph: { url: `${siteConfig.url}/privacy` },
    alternates: {
      canonical: `${siteConfig.url}/privacy`,
    },
  },
} as const;