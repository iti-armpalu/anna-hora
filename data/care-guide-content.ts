export interface CareInstruction {
    step: number
    title: string
    description: string
    icon: string
    details: string[]
  }
  
  export interface CommonIssue {
    issue: string
    solution: string
  }
  
  export interface StorageTip {
    title: string
    description: string
    icon: string
  }
  
  export interface CareGuideContent {
    hero: {
      title: string
      subtitle: string
      description: string
    }
    introduction: {
      title: string
      subtitle: string
      paragraphs: string[]
    }
    careInstructions: {
      title: string
      subtitle: string
      description: string
      instructions: CareInstruction[]
    }
    commonIssues: {
      title: string
      subtitle: string
      issues: CommonIssue[]
    }
    storage: {
      title: string
      subtitle: string
      description: string
      tips: StorageTip[]
    }
    avoidSection: {
      title: string
      items: string[]
    }
    professionalCare: {
      title: string
      description: string
      buttonText: string
    }
    downloadSection: {
      title: string
      description: string
      buttonText: string
    }
  }
  
  export const careGuideContent: CareGuideContent = {
    hero: {
      title: "Caring for Your Silk",
      subtitle: "A Guide to Preserving Beauty",
      description:
        "Silk is nature's most precious fabric, and with proper care, your pieces will remain beautiful for years to come. Learn how to protect your investment and keep your silk looking as luxurious as the day you received it.",
    },
    introduction: {
      title: "Why Silk Care",
      subtitle: "Matters",
      paragraphs: [
        "Silk is a natural protein fiber with remarkable properties—it's strong yet delicate, luxurious yet practical. Like any fine fabric, it requires thoughtful care to maintain its luster, softness, and structural integrity.",
        "Understanding how to care for silk isn't complicated, but it does require attention to detail. The rewards are worth it: with proper care, your silk pieces will develop a beautiful patina over time, becoming more precious with each wear.",
        "Think of caring for silk as an investment in longevity. Each gentle wash, each careful storage decision, helps preserve the fabric's natural beauty and ensures your pieces remain timeless treasures in your wardrobe.",
      ],
    },
    careInstructions: {
      title: "Essential Care",
      subtitle: "Instructions",
      description:
        "Follow these four fundamental steps to keep your silk pieces in pristine condition. Each step is designed to protect the delicate fibers while maintaining the fabric's natural beauty.",
      instructions: [
        {
          step: 1,
          title: "Washing",
          description: "Gentle cleansing preserves silk's natural luster",
          icon: "droplets",
          details: [
            "Hand wash in cool water (30°C/86°F or below) using a pH-neutral silk detergent",
            "Avoid harsh detergents, bleach, or fabric softeners which can damage fibers",
            "Gently swirl fabric in water—never wring, twist, or scrub",
            "For machine washing, use a delicate silk bag and gentle cycle only",
            "Rinse thoroughly in cool water until all soap is removed",
            "Professional dry cleaning is always a safe option for valuable pieces",
          ],
        },
        {
          step: 2,
          title: "Drying",
          description: "Proper drying maintains silk's shape and structure",
          icon: "sun",
          details: [
            "Gently press excess water out with a clean, white towel—never wring",
            "Lay flat on a clean, dry towel away from direct sunlight or heat",
            "Reshape the garment to its original form while damp",
            "Never use a tumble dryer—high heat damages silk fibers permanently",
            "Avoid hanging wet silk as it may stretch or lose shape",
            "Allow to air dry completely before storing (usually 24 hours)",
          ],
        },
        {
          step: 3,
          title: "Ironing",
          description: "Restore silk's smooth finish with careful pressing",
          icon: "wind",
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
          step: 4,
          title: "Stain Removal",
          description: "Act quickly to treat stains without damage",
          icon: "alertCircle",
          details: [
            "Blot spills immediately with a clean, white cloth—never rub",
            "For water-based stains, gently dab with cool water",
            "For oil-based stains, sprinkle with cornstarch to absorb, then brush off",
            "Avoid home remedies like vinegar or lemon juice which can damage silk",
            "For persistent stains, consult a professional silk cleaner",
            "Never attempt to remove old or set stains without professional help",
          ],
        },
      ],
    },
    commonIssues: {
      title: "Common Issues",
      subtitle: "& Solutions",
      issues: [
        {
          issue: "Water Spots or Rings",
          solution:
            "Gently dampen the entire area with cool water using a spray bottle, then blot with a clean towel and air dry flat. This redistributes the water marks evenly.",
        },
        {
          issue: "Loss of Sheen",
          solution:
            "Rinse silk in cool water with a splash of white vinegar (1 tablespoon per gallon) to restore pH balance. The natural acidity helps revive the luster.",
        },
        {
          issue: "Wrinkles from Storage",
          solution:
            "Hang garment in a steamy bathroom for 15-20 minutes, or use a steamer held 6 inches away. Never apply steam directly to silk.",
        },
        {
          issue: "Color Fading",
          solution:
            "Always store silk away from direct sunlight and harsh lighting. For minor fading, professional silk specialists can sometimes restore color.",
        },
        {
          issue: "Snags or Pulls",
          solution:
            "Gently work the snag back through to the wrong side using a needle. Never cut loose threads. For significant damage, consult a textile repair specialist.",
        },
        {
          issue: "Yellowing from Age",
          solution:
            "Prevention is key—store with acid-free tissue paper. For existing yellowing, professional silk restoration may help, but severe discoloration may be permanent.",
        },
      ],
    },
    storage: {
      title: "Proper Storage",
      subtitle: "Preserves Your Investment",
      description:
        "How you store your silk between wears is just as important as how you clean it. Follow these guidelines to keep your pieces fresh, clean, and ready to wear.",
      tips: [
        {
          title: "Breathable Garment Bags",
          description:
            "Store silk in cotton or linen garment bags—never plastic, which traps moisture and can cause yellowing. Natural fabrics allow silk to breathe while protecting from dust.",
          icon: "package",
        },
        {
          title: "Cool, Dark Environment",
          description:
            "Keep silk in a cool, dry place away from direct sunlight, which causes fading. Avoid attics or basements where temperature and humidity fluctuate.",
          icon: "home",
        },
        {
          title: "Natural Cedar Protection",
          description:
            "Use cedar sachets or blocks to naturally repel moths—never mothballs, which contain harsh chemicals. Replace cedar annually for continued protection.",
          icon: "shield",
        },
        {
          title: "Proper Hanging",
          description:
            "Use padded or wide hangers to prevent shoulder marks. For delicate pieces or long-term storage, fold gently with acid-free tissue paper between folds.",
          icon: "archive",
        },
      ],
    },
    avoidSection: {
      title: "What to Avoid",
      items: [
        "Hot water, which can shrink silk and damage its protein structure",
        "Direct sunlight or heat sources, which cause fading and fiber damage",
        "Harsh chemicals including bleach, hydrogen peroxide, or ammonia",
        "Rough surfaces that can snag delicate silk fibers",
        "Deodorants and perfumes applied directly to silk—let them dry first",
        "Storing silk while damp, which can cause mildew and permanent damage",
        "Wire hangers, which can leave rust marks and distort garment shape",
      ],
    },
    professionalCare: {
      title: "Professional Silk Care",
      description:
        "For valuable pieces or stubborn stains, we recommend consulting a specialist silk cleaner. We partner with expert cleaners who understand the unique needs of fine silk garments.",
      buttonText: "Find a Specialist Near You",
    },
    downloadSection: {
      title: "Keep This Guide Handy",
      description:
        "Download our comprehensive silk care guide PDF for quick reference. Print it and keep it with your garments for easy access whenever you need it.",
      buttonText: "Download Care Guide PDF",
    },
  }
  