import { siteConfig } from "@/lib/config/site"

export interface SizeGuideContent {
    hero: {
      title: string
      subtitle: string
      supportingText: string
    }
    contact: {
      title: string
      phone: string
      email: string
      description: string
      chatButton?: string
    }
    measurementTips: {
      title: string
      description: string
      measurements: Array<{
        name: string
        description: string
      }>
    }
    sizeCategories: Array<{
      category: string
      description?: string
      fitNotes?: string
      table: {
        headers: string[]
        rows: Array<{
          measurement: string
          xs?: string
          s?: string
          m?: string
          l?: string
          xl?: string
        }>
      }
    }>
    generalNotes: {
      title: string
      content: string
    }
  }
  
  export const SIZE_GUIDE_CONTENT: SizeGuideContent = {
    hero: {
      title: "Find Your Perfect Fit",
      subtitle:
        `Each piece has been carefully designed to fit beautifully. Use our guide to find the right size for your ${siteConfig.name.toUpperCase()} piece.`,
      supportingText:
        "You'll find product-specific measurements on individual product pages. For bespoke advice, our customer care team is always here to help.",
    },
    contact: {
      title: "Need Personal Assistance?",
      phone: `${siteConfig.phone}`,
      email: `${siteConfig.supportEmail}`,
      description:
        "There is nothing we love more than speaking to our customers. If you need assistance, we're here to help.",
      chatButton: "Book a Virtual Fitting",
    },
    measurementTips: {
      title: "How to Measure",
      description: "For the most accurate fit, take measurements over your undergarments.",
      measurements: [
        {
          name: "Waist",
          description: "Measure around your natural waistline, the narrowest part of your torso.",
        },
        {
          name: "Hips",
          description: "Measure around the fullest part of your hips, about 8 inches below your waist.",
        },
        {
          name: "Inseam",
          description: "Measure from the top of your inner thigh to your ankle along the inside of your leg.",
        },
        {
          name: "Chest",
          description: "Measure around the fullest part of your chest, keeping the tape parallel to the floor.",
        },
      ],
    },
    sizeCategories: [
      {
        category: "Lounge Trousers",
        description: "Relaxed-fit trousers designed for comfort and style",
        fitNotes:
          "Our lounge trousers feature an elastic waistband and relaxed leg for maximum comfort. They have a slightly relaxed fit throughout.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Waist (cm)", xs: "66-71", s: "71-76", m: "76-81", l: "81-86" },
            { measurement: "Hips (cm)", xs: "91-97", s: "97-102", m: "102-107", l: "107-112" },
            { measurement: "Inseam (cm)", xs: "76", s: "78", m: "80", l: "82" },
            { measurement: "Rise (cm)", xs: "26", s: "27", m: "28", l: "29" },
            { measurement: "Leg Opening (cm)", xs: "40", s: "42", m: "44", l: "46" },
          ],
        },
      },
      {
        category: "Long Shirts",
        description: "Elegant long shirts perfect for lounging or layering",
        fitNotes: "These shirts are designed with a relaxed, comfortable fit that drapes beautifully on the body.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Chest (cm)", xs: "86-91", s: "91-97", m: "97-102", l: "102-107" },
            { measurement: "Length (cm)", xs: "78", s: "80", m: "82", l: "84" },
            { measurement: "Shoulder Width (cm)", xs: "40", s: "42", m: "44", l: "46" },
            { measurement: "Sleeve Length (cm)", xs: "60", s: "61", m: "62", l: "63" },
          ],
        },
      },
      {
        category: "Lounge Shorts",
        description: "Comfortable shorts ideal for warm weather lounging",
        fitNotes:
          "Designed with an elastic waistband and relaxed fit. Perfect for lounging at home or casual summer wear.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Waist (cm)", xs: "66-71", s: "71-76", m: "76-81", l: "81-86" },
            { measurement: "Hips (cm)", xs: "91-97", s: "97-102", m: "102-107", l: "107-112" },
            { measurement: "Inseam (cm)", xs: "13", s: "14", m: "15", l: "16" },
            { measurement: "Rise (cm)", xs: "24", s: "25", m: "26", l: "27" },
          ],
        },
      },
      {
        category: "Relaxed Fit Trousers",
        description: "Wide-leg trousers with a sophisticated, relaxed silhouette",
        fitNotes:
          "These trousers feature a high-rise waist and wide leg for an elegant, flowing look. Size down for a more tailored fit.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Waist (cm)", xs: "61-66", s: "66-71", m: "71-76", l: "76-81" },
            { measurement: "Hips (cm)", xs: "91-97", s: "97-102", m: "102-107", l: "107-112" },
            { measurement: "Inseam (cm)", xs: "78", s: "80", m: "82", l: "84" },
            { measurement: "Rise (cm)", xs: "28", s: "29", m: "30", l: "31" },
            { measurement: "Leg Opening (cm)", xs: "52", s: "54", m: "56", l: "58" },
          ],
        },
      },
      {
        category: "Boxer Shorts",
        description: "Classic boxer shorts designed for ultimate comfort",
        fitNotes: "Made from soft, breathable fabric with an elastic waistband. True to size fit.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Waist (cm)", xs: "71-76", s: "76-81", m: "81-86", l: "86-91" },
            { measurement: "Hips (cm)", xs: "91-97", s: "97-102", m: "102-107", l: "107-112" },
            { measurement: "Inseam (cm)", xs: "10", s: "11", m: "12", l: "13" },
            { measurement: "Rise (cm)", xs: "23", s: "24", m: "25", l: "26" },
          ],
        },
      },
    ],
    generalNotes: {
      title: "Fit & Care",
      content:
        "Our pieces are designed to drape effortlessly and flatter every silhouette. All measurements are garment measurements taken flat. For the best fit, we recommend following your body measurements and referring to our size charts. If you're between sizes, we suggest sizing up for a more relaxed fit or sizing down for a closer fit.",
    },
  }
  