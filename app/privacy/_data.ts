import { siteConfig } from "@/lib/config/site"

// Type Definitions
export type SectionIcon = "Shield" | "FileText" | "Eye" | "Lock" | "User" | "Mail"

export interface SectionSubItem {
    heading: string
    text: string
    small?: boolean
}

export interface RightsItem {
    title: string
    description: string
}

export interface PrivacySection {
    key: string
    title: string
    icon: SectionIcon
    intro?: string
    paragraphs?: string[]
    items?: string[]
    subsections?: SectionSubItem[]
    rights?: RightsItem[]
    note?: string
    emphasis?: "primary" | "card"
}

export interface ContactInfo {
    intro: string
    email: string
    phone: string
    addressLines: string[]
    ctaText: string
    ctaHref: string
}

export interface PolicyUpdates {
    title: string
    text: string
}

export interface PrivacyData {
    hero: {
        title: string
        intro: string[]
        lastUpdated: string
        icon: SectionIcon
    }
    sections: PrivacySection[]
    contact: ContactInfo
    policyUpdates: PolicyUpdates
}

// Privacy Policy Data
const PRIVACY_DATA: PrivacyData = {
    hero: {
        title: "Privacy Policy",
        intro: [
            "Your privacy is fundamental to our relationship. We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.",
        ],
        lastUpdated: "September 2025",
        icon: "Shield",
    },

    sections: [
        {
            key: "information-we-collect",
            title: "Information We Collect",
            icon: "FileText",
            subsections: [
                {
                    heading: "Personal Information",
                    text: "When you create an account, make a purchase, or contact us, we collect information such as your name, email address, shipping address, phone number, and payment information. This information is necessary to provide you with our services and fulfill your orders.",
                },
                {
                    heading: "Usage Information",
                    text: "We automatically collect information about how you interact with our website, including pages visited, time spent on our site, and your preferences. This helps us improve your shopping experience and personalize our offerings.",
                },
                {
                    heading: "Device Information",
                    text: "We collect information about the device you use to access our website, including IP address, browser type, and operating system. This information helps us ensure our website functions properly across different devices.",
                },
            ],
            emphasis: "card",
        },

        {
            key: "how-we-use",
            title: "How We Use Your Information",
            icon: "Eye",
            items: [
                "Process and fulfill your orders, including shipping and customer service",
                "Communicate with you about your orders, account, and our products",
                "Personalize your shopping experience and recommend products",
                "Send you marketing communications (with your consent)",
                "Improve our website, products, and services",
                "Comply with legal obligations and protect our rights",
            ],
            emphasis: "card",
        },

        {
            key: "information-sharing",
            title: "Information Sharing",
            icon: "Lock",
            paragraphs: [
                "We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:",
            ],
            subsections: [
                {
                    heading: "Service Providers",
                    text: "We work with trusted third-party service providers who help us operate our business, such as payment processors, shipping companies, and email service providers. These partners are contractually obligated to protect your information.",
                },
                {
                    heading: "Legal Requirements",
                    text: "We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.",
                },
                {
                    heading: "Business Transfers",
                    text: "In the event of a merger, acquisition, or sale of our business, your information may be transferred to the new owner, subject to the same privacy protections.",
                },
            ],
            emphasis: "card",
        },

        {
            key: "data-security",
            title: "Data Security",
            icon: "Shield",
            intro: "We implement industry-standard security measures to protect your personal information, including:",
            items: [
                "SSL encryption for all data transmission",
                "Secure servers and databases with restricted access",
                "Regular security audits and updates",
                "Employee training on data protection practices",
            ],
            note: "While we strive to protect your information, no method of transmission over the internet is 100% secure. We encourage you to use strong passwords and keep your account information confidential.",
            emphasis: "card",
        },

        {
            key: "your-rights",
            title: "Your Rights",
            icon: "User",
            paragraphs: ["You have the following rights regarding your personal information:"],
            rights: [
                { title: "Access", description: "Request a copy of your personal data" },
                { title: "Correction", description: "Update or correct inaccurate information" },
                { title: "Deletion", description: "Request deletion of your personal data" },
                { title: "Portability", description: "Receive your data in a portable format" },
                { title: "Opt-out", description: "Unsubscribe from marketing communications" },
                { title: "Restriction", description: "Limit how we process your information" },
            ],
            note: "To exercise any of these rights, please contact us using the information provided below. We will respond to your request within 30 days.",
            emphasis: "card",
        },

        {
            key: "cookies-tracking",
            title: "Cookies and Tracking",
            icon: "Eye",
            paragraphs: [
                "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings.",
            ],
            subsections: [
                {
                    heading: "Essential Cookies",
                    text: "Required for the website to function properly, including shopping cart and checkout functionality.",
                    small: true,
                },
                {
                    heading: "Analytics Cookies",
                    text: "Help us understand how visitors interact with our website to improve user experience.",
                    small: true,
                },
                {
                    heading: "Marketing Cookies",
                    text: "Used to deliver personalized advertisements and track the effectiveness of our marketing campaigns.",
                    small: true,
                },
            ],
            emphasis: "card",
        },
    ],

    contact: {
        intro:
            "If you have any questions about this Privacy Policy or how we handle your personal information, please don't hesitate to contact us:",
        email: "customerservice@annahora.com",
        phone: "+420 773 583 533",
        addressLines: [`${siteConfig.name.toUpperCase()} Privacy Team", "123 Silk Avenue, Suite 100", "New York, NY 10001`],
        ctaText: "Contact Customer Service",
        ctaHref: "/contact",
    },

    policyUpdates: {
        title: "Policy Updates",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by email or through a notice on our website. Your continued use of our services after such changes constitutes acceptance of the updated policy.",
    },
} as const

export default PRIVACY_DATA
