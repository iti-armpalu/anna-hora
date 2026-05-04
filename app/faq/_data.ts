import { siteConfig } from "@/lib/config/site"

export interface FAQItem {
  category: string
  question: string
  answer: string
}

export interface UITexts {
  noResultsPrefix: string
  clearSearchLabel: string
  contactPromptTitle: string
  contactPromptText: string
  contactCtas: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
}

export interface HeaderContent {
  title: string
  subtitle: string
  searchPlaceholder: string
}

export const HEADER: Readonly<HeaderContent> = {
  title: "Frequently Asked Questions",
  subtitle:
    "We're here to help. Below you'll find answers to our most common questions. If you need a more personal touch, our team would be delighted to assist you.",
  searchPlaceholder: "Search frequently asked questions...",
} as const

export const UI_TEXTS: Readonly<UITexts> = {
  noResultsPrefix: 'No questions found matching "',
  clearSearchLabel: "Clear search",
  contactPromptTitle: "Still need help?",
  contactPromptText: "Didn't find what you were looking for? Get in touch—we'd be happy to help.",
  contactCtas: {
    primary: { label: "Contact Us", href: "/contact" },
    secondary: { label: "Learn About Our Silk", href: "/our-silk" },
  },
} as const

export const FAQ_CONTENT: readonly FAQItem[] = [
  // Orders & Payments
  {
    category: "Orders & Payments",
    question: "How do I place an order?",
    answer:
      "Simply browse our collection, select your desired pieces, choose your size and colour, then add to your bag. When you're ready, proceed to checkout where you can review your selection and complete your purchase securely.",
  },
  {
    category: "Orders & Payments",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. All transactions are processed securely through our encrypted payment system.",
  },
  {
    category: "Orders & Payments",
    question: "Can I change or cancel my order?",
    answer:
      "We'd be happy to help modify your order if it hasn't entered production yet. Please contact us within 2 hours of placing your order, and we'll do our best to accommodate any changes or cancellations.",
  },
  {
    category: "Orders & Payments",
    question: "Do you offer payment plans?",
    answer:
      "We currently do not offer payment plans or instalment options. We are exploring additional payment methods for the future to provide greater flexibility for our customers.",
  },

  // Shipping & Delivery
  {
    category: "Shipping & Delivery",
    question: "Where do you ship?",
    answer:
      "We currently ship to the European Union countries, UK, US, Canada, Australia, and selected international destinations. Shipping availability and delivery times vary depending on location and are calculated at checkout.",
  },

  {
    category: "Shipping & Delivery",
    question: "When will my order be dispatched?",
    answer:
      "We aim to process and dispatch orders as quickly as possible. Orders are typically dispatched within 1–3 working days. Processing times may vary during busy periods or due to payment verification.",
  },

  {
    category: "Shipping & Delivery",
    question: "How long will my order take to arrive?",
    answer:
      "Delivery times are estimates starting from the dispatch date. Orders within the Czechia typically arrive within 1–3 business days after dispatch. EU deliveries usually take 3–7 business days, while international deliveries may take 7–14 business days depending on destination and customs processing.",
  },

  {
    category: "Shipping & Delivery",
    question: "Do you offer free shipping?",
    answer:
      "Yes. We offer complimentary shipping on all domestic Czechia orders and all European Union orders. Shipping costs for international destinations outside the EU are calculated at checkout.",
  },

  {
    category: "Shipping & Delivery",
    question: "How can I track my order?",
    answer:
      "Once your order has been dispatched, you will receive a shipping confirmation email with tracking details. You can also track your order at any time by logging into your account and viewing your order history on our website.",
  },

  {
    category: "Shipping & Delivery",
    question: "Will I need to pay customs duties or import taxes?",
    answer:
      "Orders shipped outside the European Union may be subject to customs duties or import taxes once they reach the destination country. These charges are the responsibility of the customer and vary by country. We recommend contacting your local customs office for more information before placing an order.",
  },

  {
    category: "Shipping & Delivery",
    question: "Can I change or redirect my order after it has shipped?",
    answer:
      "Unfortunately, once an order has been dispatched, we are unable to change the delivery address or redirect the shipment.",
  },

  {
    category: "Shipping & Delivery",
    question: "How will my order be packaged?",
    answer:
      `All orders are carefully prepared and shipped in our signature ${siteConfig.displayName} packaging to ensure your items arrive safely and beautifully protected.`,
  },

  {
    category: "Shipping & Delivery",
    question: "What should I do if I cannot find my tracking information?",
    answer:
      `If you cannot locate your shipping confirmation email, please check your spam or promotions folder first. If you still need assistance, contact us at ${siteConfig.supportEmail} and we will be happy to help.`,
  },

  {
    category: "Shipping & Delivery",
    question: "Can delivery delays occur?",
    answer:
      "While we aim to deliver within estimated timeframes, delays may occasionally occur due to courier operations, payment verification, or customs clearance processes, which are outside our control.",
  },


  // Returns & Exchanges
  {
    category: "Returns & Exchanges",
    question: "What is your return policy?",
    answer:
      "If your piece isn’t quite right, you may return your order within 14 days of delivery in accordance with EU consumer law. Items must be unworn, unused, undamaged, and returned in their original condition with all tags and packaging included.",
  },

  {
    category: "Returns & Exchanges",
    question: "How do I return an item?",
    answer:
      `To start a return, log into your account and open your order history, where you will find the Return Request Form. Once submitted, our customer care team will review your request and provide further instructions.\n\nIf you are unable to access your account, you may also contact us at ${siteConfig.supportEmail} for assistance.\n\nReturned items should be carefully packed, preferably in the original packaging, and sent to:\n\nAnna Hora s.r.o.\nJinonická 804/80\n158 00 Praha 5\nCzech Republic`,
  },

  {
    category: "Returns & Exchanges",
    question: "Who pays for return shipping?",
    answer:
      "Return shipping costs are the responsibility of the customer unless the item is faulty or incorrect. Shipping costs are non-refundable except where required by law.",
  },

  {
    category: "Returns & Exchanges",
    question: "Can I exchange an item for a different size or colour?",
    answer:
      "Yes, exchanges are possible subject to product availability. Please contact our customer care team to arrange an exchange, and we will guide you through the next steps.",
  },

  {
    category: "Returns & Exchanges",
    question: "How long do refunds take?",
    answer:
      "Once we receive and inspect your returned item, refunds are processed within 14 days. The refund will be issued to your original payment method and may take additional time to appear depending on your payment provider.",
  },

  {
    category: "Returns & Exchanges",
    question: "What condition must returned items be in?",
    answer:
      "Returned items must be clean, unworn, unused, and include all original tags, labels, and packaging. Returns that show signs of wear, damage, or alteration may not be accepted.",
  },

  {
    category: "Returns & Exchanges",
    question: "What should I do if my item is faulty or damaged?",
    answer:
      `If you receive a faulty or damaged item, please contact ${siteConfig.supportEmail} as soon as possible with your order details and photos of the issue. We will review the case and arrange a repair, replacement, or refund depending on the situation.`,
  },

  // Complaints & Warranty

  {
    category: "Complaints & Warranty",
    question: "What should I do if my item is faulty or damaged?",
    answer:
      `We are sorry if something isn’t quite right. Please contact our customer care team at ${siteConfig.supportEmail} with your order details and a description of the issue. We will review the situation together and guide you through the next steps.`,
  },

  {
    category: "Complaints & Warranty",
    question: "How long is the warranty period?",
    answer:
      "All products are covered by a 24-month legal warranty from the date you receive your goods, in accordance with applicable consumer protection laws.",
  },

  {
    category: "Complaints & Warranty",
    question: "How do I submit a complaint?",
    answer:
      `To submit a complaint, please contact ${siteConfig.supportEmail}. Our team will provide instructions and a Complaint Form to complete. The item should then be sent together with a copy of the invoice and the completed Complaint Form to:\n\nAnna Hora s.r.o.\nJinonická 804/80\n158 00 Praha 5\nCzech Republic`,
  },

  {
    category: "Complaints & Warranty",
    question: "How long does the complaint process take?",
    answer:
      "Complaints are handled within 30 days from the date we receive the goods subject to the complaint. We will notify you of the outcome as soon as the review process is completed.",
  },

  {
    category: "Complaints & Warranty",
    question: "What happens if my complaint is approved?",
    answer:
      "Depending on the nature of the defect, we may repair the item, replace it, offer a partial refund, or provide a full refund where repair or replacement is not possible.",
  },

  {
    category: "Complaints & Warranty",
    question: "Are there any requirements when returning goods for a complaint?",
    answer:
      "Items submitted for complaint should be clean and sent securely packaged together with a copy of the invoice and the completed Complaint Form.",
  },

  // Product Information
  {
    category: "Product Information",
    question: "How do I choose the right size?",
    answer:
      "Each product page includes detailed size measurements and a size guide. Our pieces are designed with a relaxed, comfortable fit. If you're between sizes, we generally recommend sizing up for the perfect drape that silk is known for.",
  },
  {
    category: "Product Information",
    question: "How should I care for my silk pieces?",
    answer:
      "Our silk pieces are designed to be cherished for years. We recommend gentle hand washing in cool water with silk-specific detergent, or professional dry cleaning. Detailed care instructions are included with each piece and available on our Our Silk page.",
  },
  {
    category: "Product Information",
    question: "Why might colours look different from the photos?",
    answer:
      "We photograph our pieces in natural light to show their true beauty, but screen settings can affect how colours appear. Silk also has a natural lustre that can look different in various lighting conditions—this is part of its charm and luxury.",
  },
  {
    category: "Product Information",
    question: "What makes your silk special?",
    answer:
      "We use only the finest Mulberry silk. Our silk is naturally hypoallergenic, temperature-regulating, and becomes softer with each wear. Learn more about our silk story on our Our Silk page.",
  },

  // Gift Cards & Wrapping
  {
    category: "Gift Cards & Wrapping",
    question: "Do you offer gift cards?",
    answer:
      `Gift cards are currently available upon request through our customer care team. Please contact ${siteConfig.supportEmail} and we will be happy to assist you.\n\nWe are currently enhancing our website to introduce digital gift cards as a dedicated product in the near future.`,
  },

  {
    category: "Gift Cards & Wrapping",
    question: "Can you gift wrap my order?",
    answer:
      `All ${siteConfig.displayName} orders are already presented in our signature packaging, including a cotton dust bag, branded tissue paper, and our signature mailer box — making them ready for gifting.\n\nIf you would like to include a personalised message, please contact our customer care team after placing your order.`,
  },

  {
    category: "Gift Cards & Wrapping",
    question: "Can I send a gift directly to someone?",
    answer:
      "Yes, absolutely. Simply enter the recipient’s address as the shipping address during checkout, and we will send the order directly to them.",
  },

  // Account & Wishlist
  {
    category: "Account & Wishlist",
    question: "What are the benefits of creating an account?",
    answer:
      "Creating an account allows you to track and view your orders, initiate returns, and save your favourite items to your wishlist for easy access.",
  },
  {
    category: "Account & Wishlist",
    question: "How do I save items to my wishlist?",
    answer:
      "Simply click the heart icon on any product page to save it to your wishlist. You can view and manage your saved items by logging into your account and visiting the wishlist section.",
  },

  // Contact Us
  {
    category: "Contact Us",
    question: "How can I contact customer service?",
    answer:
      `Our team is here to help Monday through Friday, ${siteConfig.customerCareHours.mondayFriday}. You can reach us via email at ${siteConfig.supportEmail} or by phone at ${siteConfig.phone}.`,
  },
  {
    category: "Contact Us",
    question: "Do you have a physical store?",
    answer:
      `Currently, we're an online-only boutique, allowing us to focus on creating the most beautiful pieces and delivering them directly to you. However, we occasionally host pop-up events—follow us on social media for updates.`,
  },
] as const

let cachedCategories: string[] | null = null

/**
 * Get all unique categories in order of first appearance.
 * Result is cached after first call for performance.
 */
export function getCategories(): string[] {
  if (cachedCategories) return cachedCategories

  const seen = new Set<string>()
  const categories: string[] = []

  for (const faq of FAQ_CONTENT) {
    if (!seen.has(faq.category)) {
      seen.add(faq.category)
      categories.push(faq.category)
    }
  }

  cachedCategories = categories
  return categories
}

/**
 * Group FAQs by category for efficient rendering.
 * Returns a Map for O(1) category lookups.
 */
export function groupFAQsByCategory(faqs: readonly FAQItem[] = FAQ_CONTENT): Map<string, FAQItem[]> {
  const grouped = new Map<string, FAQItem[]>()

  for (const faq of faqs) {
    const categoryFaqs = grouped.get(faq.category)
    if (categoryFaqs) {
      categoryFaqs.push(faq)
    } else {
      grouped.set(faq.category, [faq])
    }
  }

  return grouped
}

/**
 * Search FAQs by query string across question, answer, and category.
 * Returns empty array for empty queries.
 */
export function searchFAQs(query: string, faqs: readonly FAQItem[] = FAQ_CONTENT): FAQItem[] {
  const normalized = query.toLowerCase().trim()
  if (!normalized) return []

  return faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(normalized) ||
      faq.answer.toLowerCase().includes(normalized) ||
      faq.category.toLowerCase().includes(normalized),
  )
}

/**
 * Get FAQs organized by category with items for each category.
 * Useful for rendering category groups.
 */
export function getCategorizedFAQs(faqs: readonly FAQItem[] = FAQ_CONTENT): Array<{
  category: string
  items: FAQItem[]
}> {
  const grouped = groupFAQsByCategory(faqs)
  const categories = getCategories()

  return categories
    .map((category) => ({
      category,
      items: grouped.get(category) || [],
    }))
    .filter((group) => group.items.length > 0)
}
