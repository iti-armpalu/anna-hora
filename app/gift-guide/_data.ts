import type { ClosingContent } from "@/components/common/page-closing"

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
            "Some gifts are a moment. Others become a ritual. Right now, the simplest way to give ANNA HORA is through a gift card — so she can choose what feels right, when it feels right.",
            "Gift cards are something we're preparing carefully and will introduce soon. For now, we invite you to explore the pieces themselves — and the details that make them special. Each order is packed with care, so it arrives ready to give.",
        ],
        ctaLabel: "Gift Cards (Coming Soon)",
        ctaScrollTarget: "gift-card",
        image: {
            src: "/gift-guide-hero-1.png",
            alt: "A woman in a white silk lounge shirt puts on an earring, side profile.",
        },
    },
    giftCard: {
        titleTop: "The ANNA HORA",
        titleEm: "Gift Card",
        subtitle: "When you can't decide, let her choose.",
        image: {
            src: "/anna-hora-giftcard-2.webp",
            alt: "An ANNA HORA gift card tied with a branded green satin ribbon on marble table top.",
        },
        description: "Gift cards will be digital and delivered by email at launch, with the option to add a personal message.",
        features: [
            "Multiple amounts",
            "Optional personal message",
            "Email delivery (instant)",
        ],
        ctaLabel: "Coming Soon",
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