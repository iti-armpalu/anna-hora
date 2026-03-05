import { siteConfig } from "@/lib/config/site"

export interface TermsSection {
  key: string
  title: string
  intro?: string
  paragraphs?: string[]
  items?: string[]
  subsections?: Array<{
    heading: string
    text: string
    small?: boolean
  }>
  note?: string
  emphasis?: "primary" | "default"
}

interface TermsData {
  hero: {
    title: string
    intro: string[]
    lastUpdated: string
  }
  sections: TermsSection[]
  contact: {
    intro: string
    email: string
    phone: string
    ctaText: string
    ctaHref: string
  }
  termsUpdates: {
    title: string
    text: string
  }
}

const TERMS_DATA = {
  hero: {
    title: "Terms and Conditions",
    intro: [
      "These Business Terms and Conditions govern the mutual rights and obligations between the Seller and the Buyer arising from purchase contracts concluded through the ANNA HORA online store.",
    ],
    lastUpdated: "January 2026",
  },

  sections: [
    {
      key: "initial-provisions",
      title: "1. Initial Provisions",
      paragraphs: [
        "These Business Terms and Conditions regulate the contractual relationship between Anna Hora s.r.o., Jinonická 804/80, Praha 5, ID 09373781 (the “Seller”) and customers purchasing goods through the online shop available at www.annahora.com (the “Website”).",
        "These terms apply to purchase contracts concluded between the Seller and another natural or legal person (the “Buyer”) through the website’s web interface.",
        "These Business Terms and Conditions do not apply where a person purchasing goods does so within the scope of their own business activity.",
        "The provisions of these Business Terms and Conditions form an integral part of every purchase contract.",
        "The Seller may update or amend these Business Terms and Conditions. Rights and obligations arising during the validity of a previous version remain unaffected.",
      ],
    },

    {
      key: "user-accounts",
      title: "2. Customer Accounts",
      paragraphs: [
        "Buyers may order goods either through a customer account or directly without registration.",
        "Customer accounts are provided through Shopify’s secure authentication infrastructure. Account authentication is handled by Shopify and the Seller does not store or have access to account passwords or authentication credentials.",
      ],
      subsections: [
        {
          heading: "Account Information",
          text: "When using a customer account or placing an order, the Buyer must provide accurate and truthful information and keep such information updated.",
        },
        {
          heading: "Eligibility",
          text: "Only persons over 15 years of age may register or create a customer account on the Website.",
        },
        {
          heading: "Account Suspension",
          text: "The Seller may suspend or close a user account if it has been inactive for a prolonged period or if the Buyer breaches obligations arising from the purchase contract or these Terms.",
        },
        {
          heading: "Availability",
          text: "The Buyer acknowledges that the customer account may occasionally be unavailable due to necessary maintenance or technical updates.",
          small: true,
        },
      ],
    },

    {
      key: "contract-conclusion",
      title: "3. Entering into the Contract of Purchase",
      paragraphs: [
        "The web interface of the shop contains a list of goods offered by the Seller including their prices. These offers are non-binding and the Seller is not obliged to conclude a purchase contract regarding the listed goods.",
        "The Buyer orders goods by completing the order form on the Website.",
      ],
      items: [
        "selection of goods placed into the electronic shopping basket",
        "method of payment",
        "delivery method",
        "packaging and delivery costs",
      ],
      note:
        "The contractual relationship between the Buyer and the Seller is established once the Seller confirms the order by email sent to the Buyer’s email address.",
    },

    {
      key: "pricing-payment",
      title: "4. Prices and Payment Terms",
      paragraphs: [
        "Product prices displayed on the Website may be shown in the currency corresponding to the Buyer’s location or selected region.",
        "All prices and applicable delivery costs will be clearly displayed during checkout before the Buyer confirms the order.",
      ],
      items: [
        "Credit or Debit Card",
        "Apple Pay",
        "Cash on Delivery (Czech Republic only)",
      ],
      note:
        "The Seller is currently not a VAT payer under Czech law due to the applicable annual turnover threshold. Therefore prices shown on the Website do not include VAT.",
      subsections: [
        {
          heading: "Invoices",
          text: "After payment of the purchase price, the Seller will issue an electronic invoice and send it to the Buyer’s email address.",
        },
        {
          heading: "Customs and Taxes",
          text: "Orders shipped outside the European Union may be subject to additional customs duties or taxes in the destination country. These charges are the responsibility of the Buyer.",
        },
      ],
    },

    {
      key: "withdrawal",
      title: "5. Withdrawal from the Contract",
      paragraphs: [
        "In accordance with applicable consumer protection laws, the Buyer may withdraw from the purchase contract within fourteen (14) days from receiving the goods.",
        "Returned goods must be unused, undamaged and returned in their original packaging unless the nature of the goods prevents this.",
      ],
      items: [
        "The Buyer must return the goods within 14 days after withdrawal.",
        "Return shipping costs are borne by the Buyer unless otherwise agreed.",
        "The Seller will refund the purchase price within 14 days after receiving the returned goods.",
      ],
      note:
        "Withdrawal is not possible for goods customized according to the Buyer’s requirements or goods that cannot be returned for hygiene reasons once unsealed.",
    },

    {
      key: "delivery",
      title: "6. Transport and Delivery",
      paragraphs: [
        "Delivery methods are selected by the Buyer during the ordering process.",
      ],
      subsections: [
        {
          heading: "Czech Republic",
          text: "Delivery typically takes 2–3 business days via PPL or Zásilkovna.",
        },
        {
          heading: "Europe",
          text: "Delivery typically takes 3–4 business days via DHL Express.",
        },
        {
          heading: "Rest of the World",
          text: "Delivery typically takes 4–5 business days via DHL Express.",
        },
      ],
      note:
        "Delivery times are estimates and may be affected by customs clearance or circumstances beyond the Seller’s control.",
    },

    {
      key: "defects",
      title: "7. Rights Arising from Defective Performance",
      paragraphs: [
        "Rights and obligations regarding defective performance are governed by the relevant provisions of the Czech Civil Code.",
        "The Seller is responsible for ensuring that goods delivered to the Buyer comply with the purchase contract and are free from defects at the time of delivery.",
      ],
    },

    {
      key: "intellectual-property",
      title: "8. Intellectual Property",
      paragraphs: [
        "All content on the Website, including product photographs, design, and text, is protected by copyright.",
        "The Buyer may not copy, distribute, reproduce, or otherwise use the Website’s content without the Seller’s prior written consent.",
      ],
    },

    {
      key: "privacy",
      title: "9. Personal Data Protection",
      paragraphs: [
        "The protection of the Buyer’s personal data is governed by the Seller’s Privacy Policy, which is available on the Website.",
      ],
    },

    {
      key: "final",
      title: "10. Final Provisions",
      paragraphs: [
        "Legal relationships established through the Website are governed by Czech law.",
        "Disputes between the Seller and Buyer may also be resolved through out-of-court dispute resolution, for example through the Czech Trade Inspection Authority or the EU Online Dispute Resolution platform.",
        "If any provision of these Terms becomes invalid, the remaining provisions remain unaffected.",
      ],
    },
  ],

  contact: {
    intro:
      "If you have questions regarding these Terms and Conditions, please contact us:",
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

  termsUpdates: {
    title: "Changes to These Terms",
    text: "The Seller reserves the right to update or modify these Terms and Conditions. Updated versions will be published on this page.",
  },
}

export default TERMS_DATA
