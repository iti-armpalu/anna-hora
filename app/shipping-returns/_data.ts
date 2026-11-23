import { siteConfig } from "@/lib/config/site"
import type { Step } from "@/components/common/numbered-steps"

export interface InfoGroup {
    name: string
    items: string[]
}

export interface ShippingReturnsContent {
    hero: {
        title: string
        subtitle: string
        description: string
    }
    nav: {
        title: string
        delivery: string
        returns: string
        help: string
    }
    delivery: {
        title: string
        description: string
        timesLabel: string
        info: InfoGroup[]
        notesTitle: string
        importantNotes: string[]
        ctaText: string
        ctaHref: string
    }
    returns: {
        title: string
        description: string
        steps: Step[]
        startCta: { label: string; href: string }
        policyTitle: string
        policy: InfoGroup[]
        ctaText: string
        ctaHref: string
    }
    help: {
        title: string
        description: string
        resolution: string
    }
    faq: {
        title: string
        description: string
        cta: { label: string; href: string }
    }
}

export const shippingReturnsContent: ShippingReturnsContent = {
    hero: {
        title: "Shipping & returns",
        subtitle: "Because your experience matters as much as your purchase.",
        description:
            "Everything you need to know about delivery and returns, prepared with the same attention to detail as our silk pieces.",
    },
    nav: {
        title: "On this page",
        delivery: "Delivery",
        returns: "Returns",
        help: "Help with an order",
    },
    delivery: {
        title: "Delivery",
        description: "Every order is carefully wrapped in our signature packaging and dispatched with care.",
        timesLabel: "Delivery times",
        info: [
            {
                name: "Order processing",
                items: [
                    "Processing may take up to 3 working days",
                    "Order tracking details sent via email once dispatched",
                    "Track orders anytime from your account",
                ],
            },
            {
                name: "Packaging",
                items: [
                    `Orders arrive in ${siteConfig.displayName} signature packaging`,
                    "Items are securely protected during transit",
                ],
            },
            {
                name: "International orders",
                items: [
                    "Non-EU orders may incur customs duties or import taxes",
                    "These fees are the responsibility of the customer",
                    "Charges vary by country",
                ],
            },
        ],
        notesTitle: "Good to know",
        importantNotes: [
            "Delivery times are estimates from the dispatch date.",
            "Delays may occur due to payment authorisation or customs processing.",
            "Orders cannot be redirected once dispatched.",
        ],
        ctaText: "Read the delivery FAQ",
        ctaHref: "/faq",
    },
    returns: {
        title: "Returns",
        description: `We want you to love your ${siteConfig.displayName} piece. If it isn't perfect, returns are simple.`,
        steps: [
            {
                title: "Request",
                description: `Start your return from your account, or email ${siteConfig.supportEmail}.`,
            },
            {
                title: "Pack",
                description: "Carefully pack your item, preferably in its original packaging.",
            },
            {
                title: "Send back",
                description: "Ship it following the instructions from our customer care team.",
            },
        ],
        startCta: { label: "Start a return", href: "/account" },
        policyTitle: "Return policy",
        policy: [
            { name: "Return window", items: ["Returns accepted within 14 days of delivery"] },
            {
                name: "Item condition",
                items: [
                    "Items must be unworn and unwashed",
                    "Original tags must be attached",
                    "Items must be packed securely, preferably in the original packaging",
                ],
            },
            { name: "Return costs", items: ["Return shipping costs are paid by the customer"] },
            {
                name: "Refund timing",
                items: ["Refund processed within 14 days after returned goods are received and approved"],
            },
        ],
        ctaText: "Read the returns FAQ",
        ctaHref: "/faq",
    },
    help: {
        title: "We're here to make it right",
        description:
            "If something isn't as expected, we want to hear from you. Our customer care team will work with you to resolve any issue promptly.",
        resolution: "Our aim is to resolve all concerns within 48 hours.",
    },
    faq: {
        title: "Need quick answers?",
        description: "Most questions about orders, delivery and returns are answered in our FAQ.",
        cta: { label: "View FAQ", href: "/faq" },
    },
}
