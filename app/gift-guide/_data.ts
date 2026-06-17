import type { ClosingContent } from "@/components/common/page-closing"
import { siteConfig } from "@/lib/config/site"

export interface PackagingImage {
    src: string
    alt: string
}

export interface GiftGuideContent {
    hero: {
        titleLines: string[]
        titleEm: string
        paragraphs: string[]
        ctaLabel: string
        ctaScrollTarget: string
        image: {
            src: string
            alt: string
        }
    }
    giftCard: {
        titleTop: string
        titleEm: string
        subtitle: string
        image: {
            src: string
            alt: string
        }
        description: string
        features: string[]
        ctaLabel: string
    }
    packaging: {
        titleTop: string
        titleEm: string
        description: string
        images: PackagingImage[]
    }
    closing: ClosingContent
}

export const giftGuideContent: GiftGuideContent = {
    hero: {
        titleLines: ["The Art of"],
        titleEm: "Giving",
        paragraphs: [
            `Some gifts are a moment. Others become a ritual. Give the gift of ${siteConfig.displayName} — and let her choose the piece that feels right, when it feels right.`,
            `Each order is packed with care, so it arrives ready to give.`,
        ],
        ctaLabel: "Give a Gift Card",
        ctaScrollTarget: "gift-card",
        image: {
            src: "/gift-guide-hero-1.png",
            alt: "A woman in a white silk lounge shirt puts on an earring, side profile.",
        },
    },
    giftCard: {
        titleTop: `The ${siteConfig.displayName}`,
        titleEm: "Gift Card",
        subtitle: "When you can't decide, let her choose.",
        image: {
            src: "/anna-hora-giftcard-2.webp",
            alt: `An ${siteConfig.displayName} gift card tied with a branded green satin ribbon on marble table top.`,
        },
        description: "Choose an amount and we will deliver it to your inbox instantly.",
        features: [
            "Multiple amounts",
            "Optional personal message",
            "Email delivery — instant",
        ],
        ctaLabel: "Add to Bag",
    },
    packaging: {
        titleTop: "Packaging",
        titleEm: "Preview",
        description: "A glimpse of how we pack orders. Carefully prepared, with attention to every detail.",
        images: [
            { src: "/packing-1.jpeg", alt: "Folded garment tied with ribbon" },
            { src: "/packing-2.jpeg", alt: "Branded box sealed with our signature sticker" },
            { src: "/packing-3.jpeg", alt: "Soft cotton dust bag" },
            { src: "/packing-4.jpeg", alt: "Finished gift presentation with tissue and a note" },
        ],
    },
    closing: {
        titleLines: ["Give the Gift of", { italic: "Pure Silk" }],
        ctas: [
            { label: "Shop Collection", href: "/shop", variant: "primary" },
            { label: "Read About Our Silk", href: "/our-silk", variant: "outline" },
        ],
    },
}