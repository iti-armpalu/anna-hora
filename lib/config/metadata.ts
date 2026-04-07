import { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";

// ------------------------------------
// Shared defaults
// ------------------------------------
export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url), // e.g. "https://www.annahora.com"
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
        url: "/og-default.jpg", // 1200x630, put in /public
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
    title: "Mulberry Silk Loungewear for the Moments You Keep to Yourself",
    description:
      "ANNA HORA creates premium mulberry silk shirts, shorts and trousers — designed for slow mornings, quiet evenings, and everything in between.",
    openGraph: {
      url: "/",
    },
  },
  shop: {
    title: "Shop All",
    description:
      "Browse the full ANNA HORA collection — mulberry silk loungewear designed with intention.",
    openGraph: {
      url: "/shop",
    },
  },
  ourSilk: {
    title: "Our Silk",
    description:
      "18 months in the making. Discover why ANNA HORA's mulberry silk is unlike anything else — chosen with care, worn with ease.",
    openGraph: {
      url: "/our-silk",
    },
  },
  journal: {
    title: "Journal",
    description:
      "Slow reads on self-care, style, and the art of intentional living — from the ANNA HORA world.",
    openGraph: {
      url: "/journal",
    },
  },
  giftGuide: {
    title: "Gift Guide",
    description:
      "Find the perfect gift for her — silk pieces that arrive beautifully wrapped, with a handwritten note.",
    openGraph: {
      url: "/gift-guide",
    },
  },
  about: {
    title: "About",
    description:
      "The story behind ANNA HORA — a brand built on quiet luxury, thoughtful design, and silk that feels like coming home.",
    openGraph: {
      url: "/about",
    },
  },
  contact: {
    title: "Contact Us",
    description:
      "Questions about your order, sizing, or a collaboration? We're here and happy to help.",
    openGraph: {
      url: "/contact",
    },
  },
  faq: {
    title: "FAQ",
    description:
      "Everything you need to know about ANNA HORA — shipping, returns, sizing, silk care, and more.",
    openGraph: {
      url: "/faq",
    },
  },
  shippingReturns: {
    title: "Shipping & Returns",
    description:
      "Free shipping within EU. Easy returns within 14 days. All the details you need.",
    openGraph: {
      url: "/shipping-returns",
    },
  },
  sizeGuide: {
    title: "Size Guide",
    description:
      "Find your perfect fit with the ANNA HORA size guide — relaxed, considered sizing for silk loungewear.",
    openGraph: {
      url: "/size-guide",
    },
  },
  careGuide: {
    title: "Care Guide",
    description:
      "How to care for your ANNA HORA silk — simple steps to keep your pieces beautiful for years.",
    openGraph: {
      url: "/care-guide",
    },
  },
  wishlist: {
    title: "Wishlist",
    description: "Your saved ANNA HORA pieces — ready when you are.",
    openGraph: {
      url: "/wishlist",
    },
    robots: { index: false, follow: false }, // no value in indexing this
  },
  signIn: {
    title: "Sign In",
    description: "Sign in to your ANNA HORA account to track orders, manage returns, and save your wishlist.",
    openGraph: { url: "/sign-in" },
    robots: { index: false, follow: false }, // no value indexing auth pages
  },
  cart: {
    title: "Your Cart",
    description: "Review your ANNA HORA selection before checkout.",
    openGraph: { url: "/cart" },
    robots: { index: false, follow: false }, // never index cart
  },
  account: {
    title: "My Account",
    description: "Manage your ANNA HORA account, orders, and preferences.",
    openGraph: { url: "/account" },
    robots: { index: false, follow: false }, // never index authenticated pages
  },
  terms: {
    title: "Terms & Conditions",
    description: "The terms and conditions governing your use of the ANNA HORA website and services.",
    openGraph: { url: "/terms-and-conditions" },
  },
  privacy: {
    title: "Privacy Policy",
    description: "How ANNA HORA collects, uses, and protects your personal data.",
    openGraph: { url: "/privacy" },
  },
} as const;