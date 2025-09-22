// data/faq-content.ts

export interface FAQItem {
    category: string;
    question: string;
    answer: string;
  }
  
  export const header = {
    title: "Frequently Asked Questions",
    subtitle:
      "We're here to help. Below you'll find answers to our most common questions. If you need a more personal touch, our team would be delighted to assist you.",
    searchPlaceholder: "Search frequently asked questions...",
  };
  
  export const uiTexts = {
    noResultsPrefix: 'No questions found matching "',
    clearSearchLabel: "Clear search",
    contactPromptTitle: "Still need help?",
    contactPromptText:
      "Didn't find what you were looking for? Get in touch—we'd be happy to help.",
    contactCtas: {
      primary: { label: "Contact Us", href: "/contact" },
      secondary: { label: "Learn About Our Silk", href: "/our-silk" },
    },
  };
  
  export const categories: string[] = [
    "Orders & Payments",
    "Shipping & Delivery",
    "Returns & Exchanges",
    "Product Information",
    "Gift Cards & Wrapping",
    "Account & Wishlist",
    "Contact Us",
  ];
  
  export const faqData: FAQItem[] = [
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
        "Yes, we partner with Klarna to offer flexible payment options, including the ability to pay in 3 interest-free instalments. This option will appear at checkout for eligible orders.",
    },
  
    // Shipping & Delivery
    {
      category: "Shipping & Delivery",
      question: "Where do you ship?",
      answer:
        "We currently ship to the UK, EU, US, Canada, and Australia. We're working to expand our reach to more countries soon. Shipping costs and delivery times vary by destination.",
    },
    {
      category: "Shipping & Delivery",
      question: "How long will my order take to arrive?",
      answer:
        "UK orders typically arrive within 2-3 business days, EU orders within 5-7 business days, and international orders within 7-14 business days. You'll receive tracking information once your order ships.",
    },
    {
      category: "Shipping & Delivery",
      question: "Do you offer free shipping?",
      answer:
        "Yes, we offer complimentary shipping on all UK orders over £150, EU orders over £200, and international orders over £250. Standard shipping rates apply to orders below these thresholds.",
    },
    {
      category: "Shipping & Delivery",
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive an email with tracking information. You can also track your order by logging into your account and viewing your order history.",
    },
  
    // Returns & Exchanges
    {
      category: "Returns & Exchanges",
      question: "What is your return policy?",
      answer:
        "If your piece isn't quite right, we'll be happy to accept a return within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with tags attached.",
    },
    {
      category: "Returns & Exchanges",
      question: "How do I return an item?",
      answer:
        "Simply log into your account, select the order you'd like to return, and follow the return process. We'll provide you with a prepaid return label for UK returns. International return shipping costs apply.",
    },
    {
      category: "Returns & Exchanges",
      question: "Can I exchange an item for a different size or colour?",
      answer:
        "Absolutely. We're happy to exchange items for a different size or colour within 30 days of delivery, subject to availability. The exchange process can be initiated through your account or by contacting our team.",
    },
    {
      category: "Returns & Exchanges",
      question: "How long do refunds take?",
      answer:
        "Once we receive your returned item, we'll process your refund within 3-5 business days. The refund will appear on your original payment method within 5-10 business days, depending on your bank.",
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
        "We use only the finest Grade A mulberry silk, sourced from ethical suppliers. Our silk is naturally hypoallergenic, temperature-regulating, and becomes softer with each wear. Learn more about our silk story on our Our Silk page.",
    },
  
    // Gift Cards & Wrapping
    {
      category: "Gift Cards & Wrapping",
      question: "Do you offer gift cards?",
      answer:
        "Yes, our digital gift cards are available in denominations from £50 to £500. They're delivered instantly via email and never expire, making them perfect for any occasion.",
    },
    {
      category: "Gift Cards & Wrapping",
      question: "Can you gift wrap my order?",
      answer:
        "We'd be delighted to. Our signature gift wrapping includes elegant packaging with silk ribbon and a handwritten note. This service is available for £15 and can be added during checkout.",
    },
    {
      category: "Gift Cards & Wrapping",
      question: "Can I send a gift directly to someone?",
      answer:
        "Absolutely. During checkout, simply enter the recipient's address as the shipping address. You can also include a personal message that we'll include with the gift wrapping.",
    },
  
    // Account & Wishlist
    {
      category: "Account & Wishlist",
      question: "What are the benefits of creating an account?",
      answer:
        "Creating an account allows you to track orders, save items to your wishlist, store multiple addresses, access exclusive previews, and enjoy a faster checkout experience for future purchases.",
    },
    {
      category: "Account & Wishlist",
      question: "How do I save items to my wishlist?",
      answer:
        "Simply click the heart icon on any product page to save it to your wishlist. You can view and manage your saved items by logging into your account and visiting the wishlist section.",
    },
    {
      category: "Account & Wishlist",
      question: "Can I share my wishlist?",
      answer:
        "Yes, you can share your wishlist with friends and family through a private link. This feature is perfect for special occasions when loved ones want to surprise you with something you'll truly cherish.",
    },
  
    // Contact Us
    {
      category: "Contact Us",
      question: "How can I contact customer service?",
      answer:
        "Our team is here to help Monday through Friday, 9am to 6pm GMT. You can reach us via email at hello@annahora.com, through our contact form, or by phone at +44 (0) 20 1234 5678.",
    },
    {
      category: "Contact Us",
      question: "Do you have a physical store?",
      answer:
        "Currently, we're an online-only boutique, allowing us to focus on creating the most beautiful pieces and delivering them directly to you. However, we occasionally host trunk shows and pop-up events—follow us on social media for updates.",
    },
  ];
  