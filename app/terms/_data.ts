import { siteConfig } from "@/lib/config/site"

export interface TermsSection {
    key: string
    icon: string
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
  
  const TERMS_DATA: TermsData = {
    hero: {
      title: "Terms of Service",
      intro: [
        "These terms and conditions outline the rules and regulations for the use of ANNA HORA's website and services.",
      ],
      lastUpdated: "January 2026",
    },
    sections: [
      {
        key: "acceptance",
        icon: "CheckCircle",
        title: "Acceptance of Terms",
        paragraphs: [
          "By accessing and using our services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.",
          "We reserve the right to update, change, or replace any part of these Terms of Service at any time. It is your responsibility to check this page periodically for changes.",
        ],
      },
      {
        key: "use-license",
        icon: "Key",
        title: "Use License",
        intro:
          "Permission is granted to temporarily access our services for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:",
        items: [
          "Modify or copy the materials or services",
          "Use the materials or services for any commercial purpose",
          "Attempt to decompile or reverse engineer any software contained on our platform",
          "Remove any copyright or other proprietary notations from the materials",
          "Transfer the materials to another person or 'mirror' the materials on any other server",
        ],
        note: "This license shall automatically terminate if you violate any of these restrictions.",
      },
      {
        key: "user-accounts",
        icon: "User",
        title: "User Accounts",
        subsections: [
          {
            heading: "Account Creation",
            text: "To access certain features of our services, you may be required to create an account. You must provide accurate, complete, and current information during the registration process.",
          },
          {
            heading: "Account Security",
            text: "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must immediately notify us of any unauthorized use of your account.",
          },
          {
            heading: "Account Termination",
            text: "We reserve the right to suspend or terminate your account at any time for any reason, including violation of these terms or engaging in fraudulent, abusive, or illegal activities.",
          },
        ],
      },
      {
        key: "user-conduct",
        icon: "Shield",
        title: "User Conduct and Prohibited Activities",
        intro: "When using our services, you agree not to:",
        items: [
          "Violate any applicable laws or regulations",
          "Infringe on the intellectual property rights of others",
          "Upload or transmit viruses, malware, or any other malicious code",
          "Engage in any activity that disrupts or interferes with our services",
          "Harass, abuse, or harm other users",
          "Impersonate any person or entity",
          "Collect or store personal data about other users without their consent",
          "Use automated systems or software to extract data from our services",
        ],
      },
      {
        key: "content",
        icon: "FileEdit",
        title: "User-Generated Content",
        paragraphs: [
          "Our services may allow you to post, upload, or submit content. You retain all rights to your content, but by posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content in connection with our services.",
          "You represent and warrant that you own or have the necessary rights to all content you post, and that your content does not violate the rights of any third party.",
          "We reserve the right to remove any content that violates these terms or that we deem inappropriate, offensive, or harmful.",
        ],
      },
      {
        key: "intellectual-property",
        icon: "Copyright",
        title: "Intellectual Property Rights",
        emphasis: "primary",
        paragraphs: [
          "The services and their original content, features, and functionality are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.",
          "Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.",
          "You may not copy, modify, distribute, sell, or lease any part of our services or included software without our express permission.",
        ],
      },
      {
        key: "payment-terms",
        icon: "CreditCard",
        title: "Payment and Billing",
        subsections: [
          {
            heading: "Fees",
            text: "Certain features of our services may require payment. You agree to pay all fees associated with your use of paid features according to the pricing and payment terms in effect at the time.",
          },
          {
            heading: "Billing",
            text: "Billing is handled through secure third-party payment processors. You authorize us to charge your payment method for all fees incurred. All fees are non-refundable unless otherwise stated.",
          },
          {
            heading: "Subscription",
            text: "Some services are offered on a subscription basis. Subscriptions automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time through your account settings.",
          },
        ],
      },
      {
        key: "disclaimers",
        icon: "AlertTriangle",
        title: "Disclaimers and Limitations",
        paragraphs: [
          "Our services are provided 'as is' and 'as available' without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.",
          "We do not guarantee that our services will be uninterrupted, timely, secure, or error-free. We make no warranty regarding the quality, accuracy, or reliability of any content obtained through our services.",
          "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our services.",
        ],
      },
      {
        key: "indemnification",
        icon: "ShieldCheck",
        title: "Indemnification",
        paragraphs: [
          "You agree to indemnify, defend, and hold harmless our company, its officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or related to your use of our services, your violation of these terms, or your violation of any rights of another party.",
        ],
      },
      {
        key: "termination",
        icon: "XCircle",
        title: "Termination",
        paragraphs: [
          "We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.",
          "Upon termination, your right to use the services will immediately cease. All provisions of these terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.",
        ],
      },
      {
        key: "governing-law",
        icon: "Scale",
        title: "Governing Law and Disputes",
        paragraphs: [
          "These Terms of Service shall be governed by and construed in accordance with the laws of the jurisdiction in which we operate, without regard to its conflict of law provisions.",
          "Any disputes arising from these terms or your use of our services shall be resolved through binding arbitration, except where prohibited by law. You waive your right to participate in a class action lawsuit or class-wide arbitration.",
        ],
      },
    ],
    contact: {
      intro: "If you have any questions, concerns, or requests regarding these Terms of Service, please contact us:",
      email: `${siteConfig.supportEmail}`,
      phone: `${siteConfig.phone}`,
      ctaText: "Contact Us",
      ctaHref: "/contact",
    },
    termsUpdates: {
      title: "Changes to These Terms",
      text: "We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. By continuing to access or use our services after revisions become effective, you agree to be bound by the revised terms.",
    },
  }
  
  export default TERMS_DATA
  