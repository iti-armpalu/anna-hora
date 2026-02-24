import { siteConfig } from "@/lib/config/site"

export type TitleLine = string | { italic: string }

export interface ImageData {
    src: string
    alt: string
    width?: number
    height?: number
}

export interface Pillar {
    initial: string
    name: string
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
    }
    philosophy: {
        titleLines: TitleLine[]
        text: string
        pillars: Pillar[]
    }
    experience: {
        titleLines: TitleLine[]
        paragraphs: string[]
        image: ImageData
    }
    why: {
        titleLines: TitleLine[]
        text: string
    }
    closing: {
        titleLines: TitleLine[]
        ctas: CTA[]
    }
}

export const ABOUT_CONTENT: AboutContent = {
    hero: {
        titleLines: [`The ${siteConfig.name.toUpperCase()}`, { italic: "Journey" }],
        introLead:
            `${siteConfig.name.toUpperCase()} began with sisterhood — and grew into something much bigger.`,
        introText:
            `Founded by sisters Kat and Barbora, ANNA HORA was born from a simple but deeply personal idea: to create space for women — to rest, to build, and to lead — without having to choose between softness and strength.`,
    },

    founder: {
        image: {
            src: "/anna-hora-founders.webp",
            alt: "Founder portrait",
        },
        titleLines: ["Where It All", { italic: "Began" }],
        paragraphs: [
            "Our starting point was loungewear. Not because it was easy, but because it mattered. We wanted to design pieces that feel intentional, timeless, and quietly powerful — garments that honour “you time” in a world that rarely pauses.",
            "From carefully sourced fabrics to thoughtful silhouettes, our focus has always been on how women feel in our designs, not on chasing trends.",
            `But ${siteConfig.name.toUpperCase()} was never meant to stop at product.`,
            "We are a brand built by women, for women — and increasingly, with women. We believe women build differently: with intuition, collaboration, resilience, and an instinctive understanding that beauty and intelligence are not opposites."

        ],
    },

    philosophy: {
        titleLines: ["By Women,", { italic: "With Women" }],
        text:
            `We are a brand built by women, for women — and increasingly, with women. We believe women build differently: with intuition, collaboration, resilience, and an instinctive understanding that beauty and intelligence are not opposites.`,
        pillars: [
            {
                initial: "B",
                name: "Barbora",
                title: "Craftsmanship & Operations",
                text: "Leads craftsmanship, production, and operations from Prague — grounding the brand in quality, detail, and longevity.",
            },
            {
                initial: "K",
                name: "Kat",
                title: "Vision & Strategy",
                text: "Shapes the long-term vision and business strategy from Dubai, bridging creative, commercial, and technological worlds.",
            },
        ],
    },

    experience: {
        titleLines: ["As the Brand Evolved,", { italic: "So Did Our Ambition" }],
        paragraphs: [
            `That evolution welcomed a third pillar into ${siteConfig.name.toUpperCase()}: our close friend Iti — technologist, systems thinker, 
            and now Chief Technology Officer. Her arrival marked a turning point. Not just in how we operate, but in what we stand for.`,
            `Not just in how we operate, but in what we stand for.`,
        ],
        image: {
            src: "/ethical-by-design.webp",
            alt: "Silk texture detail",
        },
    },

    why: {
        titleLines: ["Our", { italic: "Why" }],
        text:
            "We don’t believe empowerment is a slogan. We believe in its infrastructure.",
},


    closing: {
        titleLines: ["This Is Just", { italic: "The Beginning" }],
        ctas: [
            { label: "Explore Our Collection", href: "/shop", variant: "primary" },
            { label: "Read Our Journal", href: "/journal", variant: "outline" },
        ],
    },
}
