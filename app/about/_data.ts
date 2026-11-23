import type { ClosingContent } from "@/components/common/page-closing"
import { siteConfig } from "@/lib/config/site"

export interface ImageData {
    src: string
    alt: string
}

export interface Pillar {
    name: string
    role: string
    text: string
}

/** Two-part editorial heading: plain text, then a serif italic continuation. */
export interface Heading {
    titleTop: string
    titleEm: string
}

export interface AboutContent {
    hero: Heading & {
        introLead: string
        introText: string
    }
    founder: Heading & {
        image: ImageData
        paragraphs: string[]
    }
    philosophy: Heading & {
        text: string
        pillars: Pillar[]
        closing: string
    }
    team: Heading & {
        paragraphs: string[]
        image: ImageData
    }
    why: Heading & {
        /** Line breaks in these statements are intentional (rendered with whitespace-pre-line) */
        opening: string
        body: string
        closing: string
    }
    closing: ClosingContent
}

export const aboutContent: AboutContent = {
    hero: {
        titleTop: `The ${siteConfig.displayName}`,
        titleEm: "journey",
        introLead: `${siteConfig.displayName} began with sisterhood — and grew into something much bigger.`,
        introText: `Founded by sisters Kat and Barbora, ${siteConfig.displayName} was born from a simple but deeply personal idea: to create space for women — to rest, to build, and to lead — without having to choose between softness and strength.`,
    },

    founder: {
        titleTop: "Where it all",
        titleEm: "began",
        image: {
            src: "/anna-hora-founders.webp",
            alt: `Two women, one standing and one seated, photographed in black and white against draped curtains — the founders of ${siteConfig.displayName}, Kat and Barbora.`,
        },
        paragraphs: [
            `Our starting point was loungewear. Not because it was easy, but because it mattered. We wanted to design pieces that feel intentional, timeless, and quietly powerful — garments that honour "you time" in a world that rarely pauses.`,
            `From carefully sourced fabrics to thoughtful silhouettes, our focus has always been on how women feel in our designs, not on chasing trends.`,
            `But ${siteConfig.displayName} was never meant to stop at product.`,
        ],
    },

    philosophy: {
        titleTop: "By women,",
        titleEm: "with women",
        text: `We are a brand built by women, for women — and increasingly, with women. We believe women build differently: with intuition, collaboration, resilience, and an instinctive understanding that beauty and intelligence are not opposites.`,
        pillars: [
            {
                name: "Barbora",
                role: "Craftsmanship & operations",
                text: "Leads craftsmanship, production, and operations from Prague — grounding the brand in quality, detail, and longevity.",
            },
            {
                name: "Kat",
                role: "Vision & strategy",
                text: "Shapes the long-term vision and business strategy from Dubai, bridging creative, commercial, and technological worlds.",
            },
        ],
        closing: "Together, we blend European craftsmanship with a global, future-facing mindset.",
    },

    team: {
        titleTop: "As the brand evolved,",
        titleEm: "so did our ambition",
        paragraphs: [
            `That evolution welcomed a third pillar into ${siteConfig.displayName}: our close friend Iti — technologist, systems thinker, and now Chief Technology Officer. Her arrival marked a turning point. Not just in how we operate, but in what we stand for.`,
        ],
        image: {
            src: "/ethical-by-design.webp",
            alt: "A silk lounge set worn in a home kitchen, shot in black and white.",
        },
    },

    why: {
        titleTop: "Our",
        titleEm: "why",
        opening: "We don't believe empowerment is a slogan.\nWe believe in its infrastructure.",
        body: `${siteConfig.displayName} exists to create a world where women are supported not only in how they look or feel — but in how they build, lead, and grow. Where softness is strategic. Where intelligence is elegant. Where success doesn't require burnout.`,
        closing:
            "We are still a fashion brand.\nBut we are also a business ecosystem.\nA platform for collaboration.\nA quiet vote of confidence in women who build.",
    },

    closing: {
        heading: "This is just",
        headingEm: "the beginning",
        ctas: [
            { label: "Explore our collection", href: "/shop", variant: "primary" },
            { label: "Read our journal", href: "/journal", variant: "outline" },
        ],
    },
}
