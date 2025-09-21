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
  
  export const sizeGuideContent: SizeGuideContent = {
    hero: {
      title: "Find Your Perfect Fit",
      subtitle:
        "Each piece has been carefully designed to fit beautifully. Use our guide to find the right size for your ANNA HORA piece.",
      supportingText:
        "You'll find product-specific measurements on individual product pages. For bespoke advice, our customer care team is always here to help.",
    },
    contact: {
      title: "Need Personal Assistance?",
      phone: "+44 20 7123 4567",
      email: "care@annahora.com",
      description:
        "There is nothing we love more than speaking to our customers. If you need assistance, we're here to help.",
      chatButton: "Book a Virtual Fitting",
    },
    measurementTips: {
      title: "How to Measure",
      description: "For the most accurate fit, take measurements over your undergarments.",
      measurements: [
        {
          name: "Bust",
          description: "Measure around the fullest part of your bust, keeping the tape parallel to the floor.",
        },
        {
          name: "Waist",
          description: "Measure around your natural waistline, the narrowest part of your torso.",
        },
        {
          name: "Hips",
          description: "Measure around the fullest part of your hips, about 8 inches below your waist.",
        },
        {
          name: "Length",
          description: "For tops, measure from the highest point of your shoulder to your desired length.",
        },
      ],
    },
    sizeCategories: [
      {
        category: "Robes",
        description: "Luxurious silk robes designed for elegant comfort",
        fitNotes:
          "Our robes are designed to have a slightly relaxed fit — if you prefer a closer fit, we recommend sizing down.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Bust (cm)", xs: "81-86", s: "86-91", m: "91-97", l: "97-102" },
            { measurement: "Waist (cm)", xs: "61-66", s: "66-71", m: "71-76", l: "76-81" },
            { measurement: "Hips (cm)", xs: "86-91", s: "91-97", m: "97-102", l: "102-107" },
            { measurement: "Length (cm)", xs: "110", s: "112", m: "114", l: "116" },
            { measurement: "Sleeve Length (cm)", xs: "58", s: "59", m: "60", l: "61" },
          ],
        },
      },
      {
        category: "Sleepwear Tops & Camisoles",
        description: "Delicate silk tops for ultimate comfort",
        fitNotes: "These pieces are cut for a relaxed, comfortable fit that drapes beautifully on the body.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Bust (cm)", xs: "81-86", s: "86-91", m: "91-97", l: "97-102" },
            { measurement: "Waist (cm)", xs: "61-66", s: "66-71", m: "71-76", l: "76-81" },
            { measurement: "Length (cm)", xs: "58", s: "60", m: "62", l: "64" },
            { measurement: "Strap Length (cm)", xs: "35", s: "36", m: "37", l: "38" },
          ],
        },
      },
      {
        category: "Sleepwear Bottoms & Lounge Trousers",
        description: "Flowing silk bottoms for relaxed elegance",
        fitNotes: "Designed with a comfortable elastic waistband and relaxed leg for easy movement.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Waist (cm)", xs: "61-66", s: "66-71", m: "71-76", l: "76-81" },
            { measurement: "Hips (cm)", xs: "86-91", s: "91-97", m: "97-102", l: "102-107" },
            { measurement: "Inseam (cm)", xs: "76", s: "78", m: "80", l: "82" },
            { measurement: "Rise (cm)", xs: "25", s: "26", m: "27", l: "28" },
          ],
        },
      },
      {
        category: "Lounge Sets",
        description: "Coordinated silk sets for effortless style",
        fitNotes:
          "Sets are designed to complement each other perfectly. Follow the individual sizing for tops and bottoms.",
        table: {
          headers: ["Measurement", "XS", "S", "M", "L"],
          rows: [
            { measurement: "Top Bust (cm)", xs: "81-86", s: "86-91", m: "91-97", l: "97-102" },
            { measurement: "Top Length (cm)", xs: "58", s: "60", m: "62", l: "64" },
            { measurement: "Bottom Waist (cm)", xs: "61-66", s: "66-71", m: "71-76", l: "76-81" },
            { measurement: "Bottom Inseam (cm)", xs: "76", s: "78", m: "80", l: "82" },
          ],
        },
      },
    ],
    generalNotes: {
      title: "Fit & Care",
      content:
        "Our pieces are designed to drape effortlessly and flatter every silhouette. All measurements are garment measurements taken flat. For the best fit, we recommend following your body measurements and referring to our size charts. If you're between sizes, we suggest sizing up for a more relaxed fit or sizing down for a closer fit. Remember, silk has a natural drape that moves beautifully with your body.",
    },
  }
  