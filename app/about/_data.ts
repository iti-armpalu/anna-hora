import { siteConfig } from "@/lib/config/site"

export type TitleLine = string | { italic: string }

export interface ImageData {
    src: string
    alt: string
    width?: number
    height?: number
}

export interface Pillar {
    title: string
    text: string
}

export interface CommitmentCard {
    title: string
    body: string
    note: string
}

export interface CTA {
    label: string
    href: string
    variant: "primary" | "outline"
}

export interface AboutContent {
    hero: {
        titleLines: TitleLine[]
        introLead: string
        introText: string
    }
    founder: {
        image: ImageData
        titleLines: TitleLine[]
        paragraphs: string[]
        signature: string
    }
    philosophy: {
        titleLines: TitleLine[]
        text: string
        pillars: Pillar[]
    }
    experience: {
        titleLines: TitleLine[]
        paragraphs: string[]
        promises: string[]
        image: ImageData
    }
    commitments: {
        introTitle: string
        introText: string
        cards: CommitmentCard[]
    }
    closing: {
        titleLines: TitleLine[]
        text: string
        ctas: CTA[]
    }
}

export const ABOUT_CONTENT: AboutContent = {
    hero: {
        titleLines: [`The ${siteConfig.name.toUpperCase()}`, { italic: "Journey" }],
        introLead:
            `${siteConfig.name.toUpperCase()} was born from a simple belief: that the most 
            profound luxury is found not in what the world sees, but in how we feel when no one is watching.`,
        introText:
            `In those quiet moments—the first sip of morning coffee, the gentle embrace of silk against skin, 
            the pause between day and night—we discover who we truly are.`,
    },

    founder: {
        image: {
            src: "/anna-hora-founders.webp",
            alt: "Founder portrait",
            width: 500,
            height: 600,
        },
        titleLines: ["A Vision Born from", { italic: "Sisterhood" }],
        paragraphs: [
            "Our careers have taken us around the world during which time we've both come to understand that sometimes in life, it's all too easy to lose oneself in the pace of life and neglect the things that count. ANNA is our vision for a better way of living, where self-care and simply being kind to oneself are always at the forefront of everything we do.",
            "We envisaged ANNA as a brand through which we could share those things we've come to learn, discover and value on our journey so far. The products we ourselves have come to rely on, the experiences that inspire us, the fundamental values on which we've based our lives.",
            "Named after Barbora's first born, ANNA is a brand we intend to be our future.",
        ],
        signature: "Katerina Bazalova & Barbora Bazalova, Sisters and Founders",
    },

    philosophy: {
        titleLines: ["More Than Fabric,", { italic: "A Philosophy" }],
        text:
            `${siteConfig.name.toUpperCase()} represents a return to intentional living—where quality supersedes 
            quantity, where comfort and elegance coexist, and where the ritual of dressing becomes an act of self-love.`,
        pillars: [
            {
                title: "Timeless Over Trendy",
                text: "We create pieces that transcend seasons and years, becoming more cherished with each wear.",
            },
            {
                title: "Mindful Craftsmanship",
                text: "Every piece is thoughtfully designed and ethically made, honoring both the artisan and the wearer.",
            },
            {
                title: "Intimate Luxury",
                text: "True luxury is personal—felt in the drape of silk, the softness of touch, the confidence it brings.",
            },
        ],
    },

    experience: {
        titleLines: ["Designed for", { italic: "How You Feel" }],
        paragraphs: [
            `Each ${siteConfig.name.toUpperCase()} piece is chosen not just for how it looks, but for how it makes you feel. 
            The weight of silk as it settles against your skin. The way morning light catches the subtle sheen. The confidence 
            that comes from knowing you're wearing something truly special.`,
            `Our pieces become part of your personal rituals—the robe you reach for after a long day, the camisole that makes 
            you feel beautiful even when no one else will see it, the pajama set that transforms bedtime into a ceremony of self-care.`,
        ],
        promises: [
            "Grade 6A mulberry silk, the finest available",
            "Ethically sourced and sustainably produced",
            "Designed to last and become more beautiful with time",
        ],
        image: {
            src: "/ethical-by-design.webp",
            alt: "Silk texture detail",
            width: 400,
            height: 500,
        },
    },

    commitments: {
        introTitle: "Our Commitments",
        introText:
            "Every decision we make is guided by our commitment to quality, sustainability, and the women who wear our pieces.",
        cards: [
            {
                title: "Sustainable Luxury",
                body: "We partner with silk farms that practice regenerative agriculture, ensuring our luxury doesn't come at the earth's expense.",
                note: "Our packaging is fully recyclable, and we offer a take-back program for pieces at the end of their lifecycle.",
            },
            {
                title: "Artisan Partnership",
                body: "We work directly with skilled artisans, ensuring fair wages and preserving traditional silk-making techniques.",
                note: "Each piece carries the signature of its maker, connecting you to the hands that crafted your garment.",
            },
            {
                title: "Lifetime Care",
                body: "We provide comprehensive care guides and offer repair services to ensure your pieces remain beautiful for years.",
                note: "Our customer care team includes silk specialists who can advise on everything from storage to stain removal.",
            },
            {
                title: "Community Connection",
                body: "Through our Journal and events, we foster a community of women who value mindful living and quiet luxury.",
                note: "A portion of every purchase supports women's wellness initiatives in our partner communities.",
            },
        ],
    },

    closing: {
        titleLines: ["An Invitation to", { italic: "Embrace Serenity" }],
        text:
            `We invite you to experience ${siteConfig.name.toUpperCase()}—not just as clothing, but as a daily reminder that you 
            deserve moments of beauty, comfort, and quiet luxury. Whether you're treating yourself or someone you love, each piece 
            is an investment in the art of living well.`,
        ctas: [
            { label: "Explore Our Collection", href: "/shop", variant: "primary" },
            { label: "Read Our Journal", href: "/journal", variant: "outline" },
        ],
    },
}
