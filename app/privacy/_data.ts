// app/privacy/_data.ts
import { siteConfig } from "@/lib/config/site"

// Type Definitions
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
    }
    sections: PrivacySection[]
    contact: ContactInfo
    policyUpdates: PolicyUpdates
}

/**
 * Privacy Policy content structured from client-provided text.
 * Notes:
 * - This is a website-level policy summary in plain language (not legal advice).
 * - Update company details (address, ID, etc.) to exact legal records if needed.
 */
const PRIVACY_DATA: PrivacyData = {
    hero: {
        title: "Privacy Policy",
        intro: [
            "We collect cookies to make our online store work properly. Cookies are short text files that help the website function correctly and make your next visit easier.",
            "Subject to your consent, we may also use analytical and marketing cookies to create a tailored offer reflecting your priorities and preferences. We do not intend to swamp you with spam; your trust and comfort are our topmost priorities.",
        ],
        lastUpdated: "March 2026",
    },

    sections: [
        {
            key: "controller-and-scope",
            title: "1. Information About Anna Hora",
            paragraphs: [
                "Your trust is important to us. The protection of your privacy when processing personal data is important for us. This Privacy Policy explains how we handle your personal data when you use our website and services.",
                `The website (the “Website”) is operated by Anna Hora s.r.o., ID 09373781, Jinonická 804/80, Praha 5 (“Anna Hora”, “we”, “us”). We are the controller responsible for processing your personal data under the General Data Protection Regulation (“GDPR”) and Czech personal data protection legislation.`,
            ],
            emphasis: "card",
        },

        {
            key: "legal-bases",
            title: "2. Legal Bases for Processing",
            intro: "We process your personal data on the following legal bases:",
            items: [
                "Consent (GDPR Art. 6(1)(a)) – for example, when you subscribe to our newsletters as a non-customer",
                "Contract performance (GDPR Art. 6(1)(b)) – to create and manage your user account and to deliver goods you order",
                "Legal obligation (GDPR Art. 6(1)(c)) – for example, invoicing and statutory record keeping",
                "Legitimate interests (GDPR Art. 6(1)(f)) – for example, to protect our rights arising from a contract, improve services, and operate the website securely",
            ],
            emphasis: "card",
        },

        {
            key: "what-we-mean-by-your-data",
            title: "3. What We Mean by “Your Data”",
            intro: "“Your data” means personal data relating to you. We may process, in particular:",
            items: [
                "Name, shipping address, email address, and phone number",
                "Information related to your orders, such as products purchased, order history, and delivery details",
                "Payment-related information required to process transactions (payment details are processed directly by the selected payment provider and are not stored by us)",
                "Information you provide when contacting us, such as messages sent through our contact form or customer service channels",
                "Preferences related to products, services, or communications",
            ],
            emphasis: "card",
        },

        {
            key: "when-we-process",
            title: "4. When We Process Your Data",
            intro: "We may process your personal data in the following situations:",
            items: [
                "When you register and use a user account (Part I)",
                "When you place an order (Part II)",
                "When you contact us (Part III)",
                "For advertising and promotional purposes (Part IV)",
                "When using cookies (Part V)",
            ],
            emphasis: "card",
        },

        {
            key: "account-registration",
            title: "Part I – Customer Account",
            paragraphs: [
                "You may create or access a customer account to manage your orders and personal information. Customer accounts are provided through Shopify’s secure authentication system.",
                "When you sign in to your account, Shopify manages the authentication process (for example through secure login verification). We do not store or have access to your account password or authentication credentials.",
                "Within your account you may provide personal information such as your name, email address, phone number, shipping address, and other details necessary to place orders or manage deliveries. Your account allows you to view your order history, track orders, and manage your personal details.",
            ],
            note:
                "Purpose and legal basis: providing and managing your customer account and enabling online purchases (GDPR Art. 6(1)(b) – performance of a contract). We process account-related information for as long as the account is active and for a reasonable period thereafter where required by applicable legal obligations.",
            emphasis: "card",
        },

        {
            key: "orders-and-fulfillment",
            title: "Part II – Processing Your Data for the Purpose of Your Order",
            paragraphs: [
                "When you order from us, your personal data is used to conclude and execute the contract and to process your order, including payment and delivery (GDPR Art. 6(1)(b) – performance of a contract).",
                "After you select a payment method, you will be asked for information required by the chosen payment services provider. This payment information is passed directly to the provider and we do not store it.",
            ],
            intro: "Retention:",
            items: [
                "We process personal data for as long as we keep sending you goods you ordered.",
                "We then keep relevant order-related personal data for ten (10) years from delivery to protect our and your legitimate rights (e.g. handling complaints or disputes).",
                "We also retain data for the period required by applicable archiving and accounting laws (e.g. Accounting Act, Archives and Records Service Act, VAT Act).",
            ],
            emphasis: "card",
        },

        {
            key: "contact-and-support",
            title: "Part III – Processing Your Data When You Contact Us",
            paragraphs: [
                "You can contact our customer service via WhatsApp, phone, mail, email.",
                "To handle your request, we may collect your name, email address, phone number, customer number, order number, ordered goods, and any additional information you provide.",
            ],
            note:
                "Legal basis: GDPR Art. 6(1)(b) – performance of a contract (responding to requests related to ordering and customer service). Retention: order-related communication is kept for the same period as order-related data.",
            emphasis: "card",
        },

        {
            key: "marketing-and-social",
            title: "Part IV – Advertising and Promotional Purposes",
            subsections: [
                {
                    heading: "1) Newsletter",
                    text:
                        "We may send informational newsletters either based on your consent (GDPR Art. 6(1)(a)) if you are not our customer, or based on our legitimate interest (GDPR Art. 6(1)(f)) if you are our customer.",
                },
                {
                    heading: "Unsubscribe Options",
                    text:
                        "You can unsubscribe at any time by clicking the unsubscribe link in the footer of each newsletter, using your user account settings, or by emailing customerservice@annahora.com.",
                    small: true,
                },
                {
                    heading: "2) Social Networks",
                    text:
                        "We are present on social networks (e.g. Instagram and Pinterest) to communicate with interested parties and inform them about offers. We do not control how platform operators process data. Please consult their respective privacy policies for more details.",
                },
            ],
            emphasis: "card",
        },

        {
            key: "cookies",
            title: "Part V – Cookies",
            paragraphs: [
                "Cookies are text files stored on your device that support proper operation of the website (functional/technical cookies), help analyze website use (analytical cookies), and help target advertising (marketing cookies).",
                "We use session cookies (deleted when you close your browser) and persistent cookies (stored for a longer or indefinite period).",
                "During your first visit, you are informed about cookie use and can decide which cookies may be stored on your device. Depending on your selection, cookie information may be sent to our website or to third-party services in subsequent visits from the same device to help optimize the website according to your preferences.",
            ],
            subsections: [
                {
                    heading: "Technical / Functional Cookies",
                    text: "Required for the website to function properly (e.g. essential site features).",
                    small: true,
                },
                {
                    heading: "Analytical Cookies",
                    text: "Help us understand how visitors use the website so we can improve user experience.",
                    small: true,
                },
                {
                    heading: "Marketing Cookies",
                    text: "Used to personalize advertising and measure marketing performance (subject to your consent, where required).",
                    small: true,
                },
            ],
            note:
                "Legal basis: for cookies processed as personal data, we rely on our legitimate interests (GDPR Art. 6(1)(f)) to operate and improve the website, and on consent where required for non-essential cookies. You can review and change cookie settings in your browser or via your cookie settings controls. If you reject essential cookies, some website functions may not work correctly.",
            emphasis: "card",
        },

        {
            key: "your-rights",
            title: "5. Your Rights",
            paragraphs: [
                "You can contact us regarding the processing of your personal data and request:",
            ],
            rights: [
                {
                    title: "Information",
                    description:
                        "Information about the purpose and nature of personal data processed, including potential recipients.",
                },
                {
                    title: "Access",
                    description:
                        "Access to personal data you provided to us (e.g. during registration, communication, or ordering).",
                },
                { title: "Correction", description: "Correction of inaccurate or incomplete personal data." },
                {
                    title: "Remedy",
                    description:
                        "Explanation and remedy of an incorrect state (e.g. blocking, correction, completion, or deletion) if you believe processing is unlawful.",
                },
                {
                    title: "Deletion / Restriction",
                    description:
                        "Deletion of personal data (“right to be forgotten”) or restriction of processing if data is no longer needed or there is no lawful basis.",
                },
                {
                    title: "Objection",
                    description:
                        "Objection to processing based on legitimate interests (e.g. newsletters to customers).",
                },
            ],
            note:
                "If you believe we are processing personal data unlawfully, you may contact the Office for Personal Data Protection (https://www.uoou.cz). Your rights are described in detail in the GDPR.",
            emphasis: "card",
        },

        {
            key: "security-and-recipients",
            title: "6. Security, Safety, and Recipients of Data",
            paragraphs: [
                "We protect your data using appropriate technical and organizational measures. Electronic personal data is stored in systems accessible only to persons who need the data for the purposes described in this policy (need-to-know basis). Access is protected by passwords and security controls. We regularly test and improve our security measures.",
            ],
            intro: "Some personal data may be processed by trusted third parties, including:",
            items: [
                "Carriers delivering goods",
                "External advisors (accountants, lawyers, tax consultants)",
                "External experts (IT and marketing specialists)",
                "Website designers and web hosting providers",
                "Email marketing software providers (e.g. The Rocket Science Group LLC / Mailchimp, including transfers outside the EU using approved safeguards such as standard contractual clauses)",
                "Companies involved in cookies and analytics (depending on your cookie choices)",
            ],
            emphasis: "card",
        },
    ],

    contact: {
        intro:
            "If you have questions about this Privacy Policy or want to exercise your rights, please contact us:",
        email: siteConfig.supportEmail,
        phone: siteConfig.phone,
        addressLines: [
            "Anna Hora s.r.o.",
            "Jinonická 804/80",
            "Praha 5",
            "Czech Republic",
        ],
        ctaText: "Contact Customer Service",
        ctaHref: "/contact",
    },

    policyUpdates: {
        title: "Policy Updates",
        text:
            "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of material changes by email or by a notice on our website. Your continued use of our services after changes take effect constitutes acceptance of the updated policy.",
    },
} as const

export default PRIVACY_DATA