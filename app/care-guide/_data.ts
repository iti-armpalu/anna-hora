export interface CareStep {
  /** Used for the anchor id and the "On this page" nav */
  title: string
  description: string
  details: string[]
}

export interface CareFact {
  title: string
  text: string
}

export const careGuideContent = {
  hero: {
    title: "Caring for your silk",
    subtitle: "A guide to preserving beauty",
    description:
      "Silk is nature's most precious fabric, and with proper care, your pieces will remain beautiful for years to come. Learn how to protect your investment and keep your silk looking as luxurious as the day you received it.",
  },
  navTitle: "On this page",
  steps: [
    {
      title: "Washing",
      description: "Gentle cleansing preserves silk's natural lustre.",
      details: [
        "Hand wash in cool water (30°C/86°F or below) using a pH-neutral silk detergent",
        "Avoid harsh detergents, bleach, or fabric softeners which can damage fibres",
        "Gently swirl fabric in water—never wring, twist, or scrub",
        "For machine washing, use a delicate silk bag and gentle cycle only",
        "Rinse thoroughly in cool water until all soap is removed",
        "Professional dry cleaning is always a safe option for valuable pieces",
      ],
    },
    {
      title: "Drying",
      description: "Proper drying maintains silk's shape and structure.",
      details: [
        "Gently press excess water out with a clean, white towel—never wring",
        "Lay flat on a clean, dry towel away from direct sunlight or heat",
        "Reshape the garment to its original form while damp",
        "Never use a tumble dryer—high heat damages silk fibres permanently",
        "Avoid hanging wet silk as it may stretch or lose shape",
        "Allow to air dry completely before storing (usually 24 hours)",
      ],
    },
    {
      title: "Ironing",
      description: "Restore silk's smooth finish with careful pressing.",
      details: [
        "Iron while slightly damp for best results, or use a pressing cloth",
        "Set iron to low heat (silk/delicate setting) without steam",
        "Always iron on the reverse side to prevent shine marks",
        "Use gentle pressure and avoid staying in one spot too long",
        "Never iron over stains—heat can set them permanently",
        "For stubborn wrinkles, hang in a steamy bathroom instead",
      ],
    },
    {
      title: "Stain removal",
      description: "Act quickly to treat stains without damage.",
      details: [
        "Blot spills immediately with a clean, white cloth—never rub",
        "For water-based stains, gently dab with cool water",
        "For oil-based stains, sprinkle with cornstarch to absorb, then brush off",
        "Avoid home remedies like vinegar or lemon juice which can damage silk",
        "For persistent stains, consult a professional silk cleaner",
        "Never attempt to remove old or set stains without professional help",
      ],
    },
  ] satisfies CareStep[],
  storage: {
    title: "Storage",
    description:
      "How you store your silk between wears is just as important as how you clean it. Follow these guidelines to keep your pieces fresh, clean, and ready to wear.",
    tips: [
      {
        title: "Garment bags",
        text: "Store silk in cotton or linen garment bags—never plastic, which traps moisture and can cause yellowing. Natural fabrics allow silk to breathe while protecting from dust.",
      },
      {
        title: "Environment",
        text: "Keep silk in a cool, dry place away from direct sunlight, which causes fading. Avoid attics or basements where temperature and humidity fluctuate.",
      },
      {
        title: "Moth protection",
        text: "Use cedar sachets or blocks to naturally repel moths—never mothballs, which contain harsh chemicals. Replace cedar annually for continued protection.",
      },
      {
        title: "Hanging & folding",
        text: "Use padded or wide hangers to prevent shoulder marks. For delicate pieces or long-term storage, fold gently with acid-free tissue paper between folds.",
      },
    ] satisfies CareFact[],
  },
  avoid: {
    title: "What to avoid",
    // Only tips not already covered in the steps above
    items: [
      "Rough surfaces that can snag delicate silk fibres",
      "Deodorants and perfumes applied directly to silk—let them dry first",
      "Storing silk while damp, which can cause mildew and permanent damage",
      "Wire hangers, which can leave rust marks and distort garment shape",
    ],
  },
  issues: {
    title: "Common issues",
    description: "Quick fixes for the most common silk concerns.",
    items: [
      {
        title: "Water spots or rings",
        text: "Gently dampen the entire area with cool water using a spray bottle, then blot with a clean towel and air dry flat. This redistributes the water marks evenly.",
      },
      {
        title: "Loss of sheen",
        text: "Rinse silk in cool water with a splash of white vinegar (1 tablespoon per gallon) to restore pH balance. The natural acidity helps revive the lustre.",
      },
      {
        title: "Wrinkles from storage",
        text: "Hang garment in a steamy bathroom for 15-20 minutes, or use a steamer held 15 cm / 6 inches away. Never apply steam directly to silk.",
      },
      {
        title: "Colour fading",
        text: "Always store silk away from direct sunlight and harsh lighting. For minor fading, professional silk specialists can sometimes restore colour.",
      },
      {
        title: "Snags or pulls",
        text: "Gently work the snag back through to the wrong side using a needle. Never cut loose threads. For significant damage, consult a textile repair specialist.",
      },
      {
        title: "Yellowing from age",
        text: "Prevention is key. Store with acid-free tissue paper. For existing yellowing, professional silk restoration may help, but severe discoloration may be permanent.",
      },
    ] satisfies CareFact[],
  },
  help: {
    title: "Questions about your piece?",
    text: "Our customer care team is happy to advise on caring for a specific garment.",
    cta: { label: "Contact us", href: "/contact" },
  },
}
