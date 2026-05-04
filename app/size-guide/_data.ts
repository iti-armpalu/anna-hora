import { siteConfig } from "@/lib/config/site"
import type { ClosingContent } from "@/components/common/page-closing"

export type Unit = "cm" | "in"

export type SizeRow = {
  measurement: string
} & Record<string, string | undefined>

export type SizeTableData = {
  headers: string[]
  rows: SizeRow[]
}

export type SizeCategory = {
  id: string
  edit: "signature" | "silk" | "core"
  category: string
  description?: string
  fitNotes?: string
  tables: Record<Unit, SizeTableData>
}

export type SizeGuideContent = {
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
    chatButton: string
  }
  measurementTips: {
    title: string
    description: string
    measurements: Array<{ name: string; description: string }>
  }
  sizeCategories: SizeCategory[]
  generalNotes: {
    fitTitle: string
    fitDescription: string
    careTitle: string
    careDescription: string
    careCta: {
      label: string
      href: string
    }
  }
  closing: ClosingContent
}

type CmCategoryInput = Omit<SizeCategory, "tables"> & {
  table: SizeTableData
}

const CM_PER_INCH = 2.54

function roundTo(value: number, decimals: number) {
  const p = 10 ** decimals
  return Math.round(value * p) / p
}

function formatNumber(value: number, decimals = 1) {
  const rounded = roundTo(value, decimals)
  return Number.isInteger(rounded) ? String(rounded) : String(rounded)
}

function parseNumberLike(input: string): number | null {
  const n = Number(input.trim())
  return Number.isFinite(n) ? n : null
}

function parseRangeLike(input: string): { a: number; b: number } | null {
  const raw = input.trim().replace(/\s+/g, "")
  const parts = raw.split(/-|–/g)
  if (parts.length !== 2) return null
  const a = parseNumberLike(parts[0])
  const b = parseNumberLike(parts[1])
  if (a == null || b == null) return null
  return { a, b }
}

function cmToInText(value: string, decimals = 1): string {
  const v = value.trim()
  if (!v) return v
  const r = parseRangeLike(v)
  if (r) {
    return `${formatNumber(r.a / CM_PER_INCH, decimals)}–${formatNumber(r.b / CM_PER_INCH, decimals)}`
  }
  const n = parseNumberLike(v)
  if (n != null) return formatNumber(n / CM_PER_INCH, decimals)
  return v
}

function convertTableCmToIn(cm: SizeTableData): SizeTableData {
  return {
    headers: [...cm.headers],
    rows: cm.rows.map((row) => {
      const out: SizeRow = { measurement: row.measurement }
      for (const [key, val] of Object.entries(row)) {
        if (key === "measurement") continue
        out[key] = val ? cmToInText(val, 1) : val
      }
      return out
    }),
  }
}

const FLAT_MEASUREMENT_NOTE =
  "All measurements are taken with the garment laid flat. Waist and hip measurements represent half-circumference."

const CM_CATEGORIES: CmCategoryInput[] = [
  // ------------------------------------
  // SIGNATURE EDIT
  // ------------------------------------
  {
    id: "signature-edit-lounge-trousers",
    edit: "signature",
    category: "Signature Edit Lounge Trousers",
    description: "Relaxed-fit trousers designed for comfort and style",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", s: "106", m: "107", l: "108" },
        { measurement: "Inseam", s: "79.5", m: "79.5", l: "79.5" },
        { measurement: "Waist", s: "34-38", m: "36-40", l: "41-45" },
        { measurement: "Hips (max.)", s: "56", m: "58", l: "60" },
        { measurement: "Elastic waistband (height)", s: "5", m: "5", l: "5" },
      ],
    },
  },
  {
    id: "signature-edit-lounge-shorts",
    edit: "signature",
    category: "Signature Edit Lounge Shorts",
    description: "Comfortable shorts ideal for warm weather lounging",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", s: "34", m: "35", l: "36" },
        { measurement: "Inseam", s: "6.5", m: "7", l: "7" },
        { measurement: "Waist", s: "33-35.5", m: "37-39.5", l: "41-43.5" },
        { measurement: "Hips (max.)", s: "57.5", m: "60.5", l: "63.5" },
        { measurement: "Elastic waistband (height)", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "signature-edit-lounge-shirt",
    edit: "signature",
    category: "Signature Edit Lounge Shirt",
    description: "Elegant long shirts perfect for lounging or layering",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Front length", xs: "77.5", s: "77.5", m: "77.5", l: "77.5" },
        { measurement: "Back length", xs: "97.5", s: "97.5", m: "97.5", l: "97.5" },
        { measurement: "Chest", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Hips", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Sleeve length", xs: "54", s: "55", m: "56", l: "57" },
      ],
    },
  },

  // ------------------------------------
  // SILK EDIT
  // ------------------------------------
  {
    id: "silk-edit-lounge-trousers",
    edit: "silk",
    category: "Silk Edit Lounge Trousers",
    description: "Wide-leg trousers with a sophisticated, relaxed silhouette",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "103", s: "104", m: "105", l: "106" },
        { measurement: "Inseam", xs: "79.5", s: "79.5", m: "79.5", l: "79.5" },
        { measurement: "Waist", xs: "35.5-37.5", s: "38.5-41", m: "41.5-44", l: "44.5-47" },
        { measurement: "Hips (max.)", xs: "53", s: "55", m: "57", l: "59" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "silk-edit-lounge-shorts",
    edit: "silk",
    category: "Silk Edit Lounge Shorts",
    description: "Classic boxer shorts designed for ultimate comfort",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "36", s: "37", m: "38", l: "39" },
        { measurement: "Inseam", xs: "9", s: "9.5", m: "9.5", l: "9.5" },
        { measurement: "Waist", xs: "30-33", s: "32-37", m: "34-39", l: "36-41" },
        { measurement: "Hips (max.)", xs: "52.5", s: "55", m: "57.5", l: "60" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "silk-edit-lounge-shirt",
    edit: "silk",
    category: "Silk Edit Lounge Shirt",
    description: "Elegant short shirt perfect for lounging or layering",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L", "XL"],
      rows: [
        { measurement: "Neck circumference", xs: "38", s: "39", m: "40", l: "41", xl: "42" },
        { measurement: "Front length", xs: "63", s: "63", m: "63", l: "63", xl: "63" },
        { measurement: "Back length", xs: "77", s: "77", m: "77", l: "77", xl: "77" },
        { measurement: "Chest", xs: "55", s: "57", m: "59", l: "61", xl: "63" },
        { measurement: "Shoulder length", xs: "15", s: "15.5", m: "16", l: "16.5", xl: "17" },
        { measurement: "Sleeve length", xs: "49.5", s: "50", m: "50.5", l: "51", xl: "51.5" },
        { measurement: "Cuff length", xs: "10", s: "10", m: "10", l: "10", xl: "10" },
      ],
    },
  },

  // ------------------------------------
  // CORE EDIT (mirrors Silk Edit measurements)
  // ------------------------------------
  {
    id: "core-edit-lounge-trousers",
    edit: "core",
    category: "Core Edit Lounge Trousers",
    description: "Wide-leg trousers with a sophisticated, relaxed silhouette",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "103", s: "104", m: "105", l: "106" },
        { measurement: "Inseam", xs: "79.5", s: "79.5", m: "79.5", l: "79.5" },
        { measurement: "Waist", xs: "35.5-37.5", s: "38.5-41", m: "41.5-44", l: "44.5-47" },
        { measurement: "Hips (max.)", xs: "53", s: "55", m: "57", l: "59" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "core-edit-lounge-shorts",
    edit: "core",
    category: "Core Edit Lounge Shorts",
    description: "Classic boxer shorts designed for ultimate comfort",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "36", s: "37", m: "38", l: "39" },
        { measurement: "Inseam", xs: "9", s: "9.5", m: "9.5", l: "9.5" },
        { measurement: "Waist", xs: "30-33", s: "32-37", m: "34-39", l: "36-41" },
        { measurement: "Hips (max.)", xs: "52.5", s: "55", m: "57.5", l: "60" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "core-edit-lounge-shirt",
    edit: "core",
    category: "Core Edit Lounge Shirt",
    description: "Elegant short shirt perfect for lounging or layering",
    fitNotes: FLAT_MEASUREMENT_NOTE,
    table: {
      headers: ["Measurement", "XS", "S", "M", "L", "XL"],
      rows: [
        { measurement: "Neck circumference", xs: "38", s: "39", m: "40", l: "41", xl: "42" },
        { measurement: "Front length", xs: "63", s: "63", m: "63", l: "63", xl: "63" },
        { measurement: "Back length", xs: "77", s: "77", m: "77", l: "77", xl: "77" },
        { measurement: "Chest", xs: "55", s: "57", m: "59", l: "61", xl: "63" },
        { measurement: "Shoulder length", xs: "15", s: "15.5", m: "16", l: "16.5", xl: "17" },
        { measurement: "Sleeve length", xs: "49.5", s: "50", m: "50.5", l: "51", xl: "51.5" },
        { measurement: "Cuff length", xs: "10", s: "10", m: "10", l: "10", xl: "10" },
      ],
    },
  },
]

export const sizeGuideContent: SizeGuideContent = {
  hero: {
    title: "Find Your Perfect Fit",
    subtitle: `Each piece has been carefully designed to fit beautifully. Use our guide to find the right size for your ${siteConfig.displayName} piece.`,
    supportingText:
      "You'll find product-specific measurements on individual product pages. For bespoke advice, our customer care team is always here to help.",
  },
  contact: {
    title: "Need Personal Assistance?",
    phone: siteConfig.phone,
    email: siteConfig.supportEmail,
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
        description:
          "Measure around the fullest part of your hips, about 20 cm (8 inches) below your waist.",
      },
      {
        name: "Inseam",
        description:
          "Measure from the top of your inner thigh to your ankle along the inside of your leg.",
      },
      {
        name: "Chest",
        description:
          "Measure around the fullest part of your chest, keeping the tape parallel to the floor.",
      },
    ],
  },
  sizeCategories: CM_CATEGORIES.map((c) => ({
    id: c.id,
    edit: c.edit,
    category: c.category,
    description: c.description,
    fitNotes: c.fitNotes,
    tables: {
      cm: c.table,
      in: convertTableCmToIn(c.table),
    },
  })),
  generalNotes: {
    fitTitle: "Fit Notes & Garment Care",
    fitDescription:
      "Our pieces are designed to drape effortlessly and flatter every silhouette. All measurements are garment measurements taken flat. For the best fit, we recommend following your body measurements and referring to our size charts. If you're between sizes, we suggest sizing up for a more relaxed fit or sizing down for a closer fit.",
    careTitle: "Garment Care",
    careDescription: "Silk requires gentle care to maintain its beauty. Read our full guide for washing, drying, and storage instructions.",
    careCta: {
      label: "View Silk Care Guide",
      href: "/care-guide",
    },
  },
  closing: {
    titleLines: ["Find Your", { italic: "Perfect Fit" }],
    ctas: [
      { label: "Shop Collection", href: "/shop", variant: "primary" },
      { label: "Contact Us", href: "/contact", variant: "outline" },
    ],
  },
}

function normalize(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, " ")
}

export function resolveSizeCategory(
  metafieldValue: string | null | undefined
): SizeCategory | null {
  if (!metafieldValue) return null
  const v = normalize(metafieldValue)
  return (
    sizeGuideContent.sizeCategories.find((c) => normalize(c.id) === v) ??
    sizeGuideContent.sizeCategories.find((c) => normalize(c.category) === v) ??
    null
  )
}

export const allSizeCategories = sizeGuideContent.sizeCategories