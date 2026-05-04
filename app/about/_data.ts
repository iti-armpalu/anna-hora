import { ClosingContent } from "@/components/common/page-closing"
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
        closing: string
    }
    team: {
        titleLines: TitleLine[]
        paragraphs: string[]
        image: ImageData
    }
    why: {
        titleLines: TitleLine[]
        paragraphs: string[]
    }
    closing: ClosingContent
}

export const aboutContent: AboutContent = {
    hero: {
        titleLines: [`The ${siteConfig.displayName}`, { italic: "Journey" }],
        introLead: `${siteConfig.displayName} began with sisterhood — and grew into something much bigger.`,
        introText: `Founded by sisters Kat and Barbora, ${siteConfig.displayName} was born from a simple but deeply personal idea: to create space for women — to rest, to build, and to lead — without having to choose between softness and strength.`,
    },

    founder: {
        image: {
            src: "/anna-hora-founders.webp",
            alt: `Two women, one standing and one seated, photographed in black and white against draped curtains — the founders of ${siteConfig.displayName}, Kat and Barbora.`,
        },
        titleLines: ["Where It All", { italic: "Began" }],
        paragraphs: [
            `Our starting point was loungewear. Not because it was easy, but because it mattered. We wanted to design pieces that feel intentional, timeless, and quietly powerful — garments that honour "you time" in a world that rarely pauses.`,
            `From carefully sourced fabrics to thoughtful silhouettes, our focus has always been on how women feel in our designs, not on chasing trends.`,
            `But ${siteConfig.displayName} was never meant to stop at product.`,
        ],
    },

    philosophy: {
        titleLines: ["By Women,", { italic: "With Women" }],
        text: `We are a brand built by women, for women — and increasingly, with women. We believe women build differently: with intuition, collaboration, resilience, and an instinctive understanding that beauty and intelligence are not opposites.`,
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
        closing: "Together, we blend European craftsmanship with a global, future-facing mindset.",
    },

    team: {
        titleLines: ["As the Brand Evolved,", { italic: "So Did Our Ambition" }],
        paragraphs: [
            `That evolution welcomed a third pillar into ${siteConfig.displayName}: our close friend Iti — technologist, systems thinker, and now Chief Technology Officer. Her arrival marked a turning point. Not just in how we operate, but in what we stand for.`,
        ],
        image: {
            src: "/ethical-by-design.webp",
            alt: "A silk lounge set worn in a home kitchen, shot in black and white.",
        },
    },

    why: {
        titleLines: ["Our", { italic: "Why" }],
        paragraphs: [
            "We don't believe empowerment is a slogan. We believe in its infrastructure.",
            `${siteConfig.displayName} exists to create a world where women are supported not only in how they look or feel — but in how they build, lead, and grow. Where softness is strategic. Where intelligence is elegant. Where success doesn't require burnout.`,
            "We are still a fashion brand. But we are also a business ecosystem. A platform for collaboration. A quiet vote of confidence in women who build.",
        ],
    },

    closing: {
        titleLines: ["This Is Just", { italic: "The Beginning" }],
        ctas: [
            { label: "Explore Our Collection", href: "/shop", variant: "primary" },
            { label: "Read Our Journal", href: "/journal", variant: "outline" },
        ],
    },
}