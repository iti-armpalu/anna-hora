import type { ClosingContent } from "@/components/common/page-closing"

export interface SilkContent {
    hero: {
        image: string
        alt: string
        titleTop: string
        titleEm: string
        subtitle: string
    }
    feel: {
        headingTop: string
        headingEm: string
        paragraphs: string[]
        media: {
            image: string
            alt: string
        }
    }
    craftsmanship: {
        headingTop: string
        headingEm: string
        intro: string
        cards: Array<{
            image: string
            alt: string
            title: string
            text: string
        }>
    }
    benefits: {
        headingTop: string
        headingEm: string
        intro: string
        items: Array<{
            icon: string
            title: string
            text: string
        }>
    }
    sourcing: {
        headingTop: string
        headingEm: string
        paragraphs: string[]
        commitmentsTitle: string
        commitments: string[]
        image: string
        imageAlt: string
    }
    careGuide: {
        headingTop: string
        headingEm: string
        intro: string
        cta: { label: string; href: string }
        steps: Array<{
            step: number
            title: string
            description: string
        }>
    }
    closing: ClosingContent
}

export const silkContent: SilkContent = {
    hero: {
        image: "/anna-hora-hero-2.webp",
        alt: "A woman reads a book outdoors in green silk trousers, coffee in hand.",
        titleTop: "The Language of",
        titleEm: "Silk",
        subtitle:
            "A gentle verse of light and movement, crafted to grace the skin with a tenderness that lingers long after the moment of touch.",
    },

    feel: {
        headingTop: "Like Water",
        headingEm: "Against the Skin",
        paragraphs: [
            "Imagine the first touch of morning air, cool and gentle against your skin. This is silk—a fabric that doesn't merely cover, but caresses. Each thread is spun from the cocoon of the mulberry silkworm, creating a material so fine it seems to float rather than rest.",
            "The weight of our silks is just perfect—substantial enough to drape beautifully, yet light enough to move with your body like a second skin. As you slip into silk, you feel the day's tensions dissolve, replaced by a sense of being held, cherished, understood.",
        ],
        media: {
            image: "/silk-draping-naturally.webp",
            alt: "A woman walks in an off-white silk lounge set against a white panelled wall.",
        },
    },

    craftsmanship: {
        headingTop: "The Art of",
        headingEm: "Perfection",
        intro:
            "Every thread tells a story of ancient wisdom and modern precision, woven together to create something truly extraordinary.",
        cards: [
            {
                image: "/silk-shirts.webp",
                alt: "ANNA HORA silk shirts in mink and off-white hanging on branded hangers.",
                title: "Grade 6A Mulberry Silk",
                text: "The highest possible grade. Sourced from silkworms fed exclusively on mulberry leaves, creating the finest, most lustrous fibers nature can provide.",
            },
            {
                image: "/22-momme-weight.webp",
                alt: "A white silk lounge shirt worn while holding a vase of hydrangeas.",
                title: "22 & 30 Momme Weight",
                text: "Crafted in 22 and 30 momme silk, balancing fluid drape with a more structured, substantial feel.",
            },
            {
                image: "/artisan-finished.webp",
                alt: "Close view of a mink silk lounge shirt pocket and fabric drape.",
                title: "Artisan Finished",
                text: "Each piece is carefully inspected and finished by skilled artisans who understand that true luxury lies in the details.",
            },
        ],
    },

    benefits: {
        headingTop: "Beauty That",
        headingEm: "Serves You",
        intro:
            "Silk's elegance is matched only by its intelligence—a fabric that adapts, protects, and enhances your natural beauty.",
        items: [
            {
                icon: "thermometer",
                title: "Temperature Regulation",
                text: "Silk's natural protein fibers adjust to your body temperature, keeping you cool in summer and warm in winter—the perfect companion for every season.",
            },
            {
                icon: "shield",
                title: "Naturally Hypoallergenic",
                text: "Silk's smooth surface and natural properties resist dust mites, mold, and allergens, making it ideal for sensitive skin.",
            },
            {
                icon: "droplets",
                title: "Skin-Kind Comfort",
                text: "Silk's naturally smooth surface glides gently against the skin, reducing friction and supporting comfort throughout your day—an experience of pure, effortless ease.",
            },
            {
                icon: "clock",
                title: "Timeless Durability",
                text: "With proper care, silk becomes more beautiful with age, developing a unique patina that tells the story of cherished moments.",
            },
        ],
    },

    sourcing: {
        headingTop: "Ethical",
        headingEm: "by Design",
        paragraphs: [
            "Our silk is sourced from proven trusted manufacturers who understand that true luxury cannot exist without respect—for the silkworms, for the environment, and for the people who bring this ancient art to life.",
            "We believe in the philosophy of \"slow luxury\" — creating pieces that are meant to be treasured for years, not seasons. Every purchase supports sustainable practices and fair wages, ensuring that beauty and ethics walk hand in hand.",
        ],
        commitmentsTitle: "Our Commitments",
        commitments: [
            "Partnership with certified proven manufacturers",
            "Fair wages and working conditions for all artisans",
            "Long-term relationships built on mutual respect",
        ],
        image: "/ethical-by-design.webp",
        imageAlt: "A silk lounge set worn in a home kitchen, shot in black and white.",
    },

    careGuide: {
        headingTop: "Caring for Your",
        headingEm: "Silk Treasures",
        intro:
            "With gentle care, your silk pieces will remain beautiful for years, becoming more precious with each wear.",
        cta: {
            label: "View Full Care Guide",
            href: "/care-guide",
        },
        steps: [
            {
                step: 1,
                title: "Gentle Cleansing",
                description:
                    "Hand wash in cool water with silk-specific detergent, or choose professional dry cleaning for best results.",
            },
            {
                step: 2,
                title: "Careful Drying",
                description:
                    "Lay flat on a clean towel, away from direct sunlight. Never wring or twist the delicate fibers.",
            },
            {
                step: 3,
                title: "Proper Storage",
                description:
                    "Store in a breathable garment bag, away from direct light. Cedar sachets help maintain freshness.",
            },
            {
                step: 4,
                title: "Mindful Wearing",
                description:
                    "Allow silk to breathe between wears. The natural fibers will maintain their beauty with proper rest.",
            },
        ],
    },

    closing: {
        titleLines: ["Experience the", { italic: "Difference" }],
        description:
            "Now that you understand the story behind our silk, we invite you to feel it for yourself. Discover how this ancient luxury can transform your daily rituals into moments of pure indulgence.",
        ctas: [
            { label: "Shop Collection", href: "/shop", variant: "primary" },
            { label: "Read Our Journal", href: "/journal", variant: "outline" },
        ],
    },
}