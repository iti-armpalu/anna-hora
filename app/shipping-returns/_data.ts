import { siteConfig } from "@/lib/config/site"

export const SHIPPING_RETURNS_CONTENT = {
    hero: {
        title: "Shipping, Returns & Care",
        subtitle: "Because your experience matters as much as your purchase.",
        description:
            "Explore our seamless shipping, returns, and support options designed with the same attention to detail as our silk pieces.",
    },
    delivery: {
        title: "Delivery",
        description: "Every order is carefully wrapped in our signature packaging and dispatched with care.",
        info: [
            {
                name: "Order Processing",
                items: [
                    "Processing may take up to 3 working days",
                    "Order tracking details sent via email once dispatched",
                    "Track orders anytime from your account",
                ],
            },
            {
                name: "Delivery Timing",
                items: [
                    "Delivery times are estimates from dispatch date",
                    "Delays may occur due to payment authorization or customs processing",
                ],
            },
            {
                name: "Packaging",
                items: [
                    `Orders arrive in ${siteConfig.name.toUpperCase()} signature packaging`,
                    "Items are securely protected during transit",
                ],
            },
            {
                name: "International Orders",
                items: [
                    "Non-EU orders may incur customs duties or import taxes",
                    "These fees are the responsibility of the customer",
                    "Charges vary by country",
                ],
            },
        ],

        importantNotes: [
            "Orders cannot be redirected once dispatched.",
            "Delivery delays caused by customs clearance are outside our control.",
        ],
        ctaText: "Read full Delivery FAQ",
        ctaHref: "/faq",
    },
    returns: {
        title: "Effortless Returns",
        description: `We want you to love your ${siteConfig.name.toUpperCase()} piece. If it isn't perfect, returns are simple.`,
        policy: [
            {
                name: "Return Window",
                conditions: [
                    "Returns accepted within 14 days of delivery"
                ],
            },
            {
                name: "Item Condititon",
                conditions: [
                    "Items must be unworn and unwashed",
                    "Original tags must be attached",
                    "Items must be packed securely (preferably in the original packaging)",
                ],
            },
            {
                name: "Return Costs",
                conditions: [
                    "Return shipping costs are paid by the customer",
                ],
            },
            {
                name: "Refund Timing",
                conditions: [
                    "Refund processed within 14 days after returned goods are received and approved",
                ],
            }

        ],
        steps: [
            {
                step: 1,
                title: "Request",
                description: "Initiate your return through your account or email customerservice@annahora.com",
            },
            {
                step: 2,
                title: "Pack",
                description: "Carefully pack your item (preferably in the original packaging)",
            },
            {
                step: 3,
                title: "Send Back",
                description: "Ship according to instructions provided by customer service",
            },
        ],
        ctaText: "Read full Returns FAQ",
        ctaHref: "/faq",

    },
    complaints: {
        title: "We're Here to Make It Right",
        description:
            "If something isn't as expected, we want to hear from you. Our customer care team will work with you to resolve any issue promptly.",
        resolution: "Our aim is to resolve all concerns within 48 hours.",
        contacts: [
            {
                type: "phone",
                label: "Call us",
                value: "+420773583533",
                href: "tel:+420773583533",
            },
            {
                type: "email",
                label: "Email us",
                value: "customerservice@annahora.com",
                href: "mailto:customerservice@annahora.com",
            },
        ],
    },
    support: {
        description: "Looking for product care tips?",
        links: {
            faq: "FAQ",
            careInstructions: "Care Instructions",
        },
    },
}
