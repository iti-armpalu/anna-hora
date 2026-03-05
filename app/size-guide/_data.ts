// app/size-guide/_data.ts
import { siteConfig } from "@/lib/config/site"

export type Unit = "cm" | "in"

export type SizeRow = {
  measurement: string
} & Record<string, string | undefined>

export type SizeTableData = {
  headers: string[] // e.g. ["Measurement", "XS", "S", "M", "L"]
  rows: SizeRow[]
}

export type SizeCategory = {
  /** Stable ID stored in the Shopify product metafield (internal, not customer-facing) */
  id: string
  /** Human label shown on /size-guide page and inside the dialog */
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
    title: string
    content: string
  }
}

type CmCategoryInput = Omit<SizeCategory, "tables"> & {
  table: SizeTableData // cm-only input
}

// -----------------------------
// Conversion helpers (cm -> in)
// -----------------------------
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
    const a = r.a / CM_PER_INCH
    const b = r.b / CM_PER_INCH
    return `${formatNumber(a, decimals)}–${formatNumber(b, decimals)}`
  }

  const n = parseNumberLike(v)
  if (n != null) {
    return formatNumber(n / CM_PER_INCH, decimals)
  }

  // Keep non-numeric (e.g. "One size") as-is
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

// ---------------------------------
// Categories (CM as canonical input)
// ---------------------------------
const CM_CATEGORIES: CmCategoryInput[] = [
  {
    id: "lounge-trousers",
    category: "Lounge Trousers",
    description: "Relaxed-fit trousers designed for comfort and style",
    fitNotes:
      "Our lounge trousers feature an elastic waistband and relaxed leg for maximum comfort. They have a slightly relaxed fit throughout.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "X", s: "106", m: "107", l: "108" },
        { measurement: "Inseam", xs: "X", s: "79.5", m: "79.5", l: "79.5" },
        { measurement: "Waist", xs: "X", s: "34-38", m: "36-40", l: "41-45" },
        { measurement: "Hips (max.)", xs: "X", s: "56", m: "58", l: "60" },
        { measurement: "Elastic waistband (height)", xs: "X", s: "5", m: "5", l: "5" },
      ],
    },
  },
  {
    id: "relaxed-fit-trousers",
    category: "Relaxed Fit Trousers",
    description: "Wide-leg trousers with a sophisticated, relaxed silhouette",
    fitNotes:
      "These trousers feature a high-rise waist and wide leg for an elegant, flowing look. Size down for a more tailored fit.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "103", s: "104", m: "105", l: "106" },
        { measurement: "Inseam", xs: "79.5", s: "79.5", m: "79.5", l: "79.5" },
        { measurement: "Waist", xs: "71-75", s: "77-82", m: "83-88", l: "89-94" },
        { measurement: "Hips (max.)", xs: "106", s: "110", m: "114", l: "118" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "lounge-shorts",
    category: "Lounge Shorts",
    description: "Comfortable shorts ideal for warm weather lounging",
    fitNotes: "Designed with an elastic waistband and relaxed fit. Perfect for lounging at home or casual summer wear.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "X", s: "34", m: "35", l: "36" },
        { measurement: "Inseam", xs: "X", s: "6.5", m: "7", l: "7" },
        { measurement: "Waist", xs: "X", s: "66-71", m: "74-79", l: "82-87" },
        { measurement: "Hips (max.)", xs: "X", s: "115", m: "121", l: "127" },
        { measurement: "Elastic waistband (height)", xs: "X", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "boxer-shorts",
    category: "Boxer Shorts",
    description: "Classic boxer shorts designed for ultimate comfort",
    fitNotes: "Made from soft, breathable fabric with an elastic waistband. True to size fit.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Outseam", xs: "36", s: "37", m: "38", l: "39" },
        { measurement: "Inseam", xs: "9", s: "9.5", m: "9.5", l: "9.5" },
        { measurement: "Waist", xs: "60-66", s: "64-74", m: "68-78", l: "72-82" },
        { measurement: "Hips (max.)", xs: "105", s: "110", m: "115", l: "120" },
        { measurement: "Elastic waistband (height)", xs: "4", s: "4", m: "4", l: "4" },
      ],
    },
  },
  {
    id: "long-shirt",
    category: "Long Shirt",
    description: "Elegant long shirts perfect for lounging or layering",
    fitNotes: "This shirt is designed with a relaxed, comfortable fit that drapes beautifully on the body.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Back length", xs: "97.5", s: "97.5", m: "97.5", l: "97.5" },
        { measurement: "Front length", xs: "77.5", s: "77.5", m: "77.5", l: "77.5" },
        { measurement: "Chest", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Hips", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Sleeve length", xs: "54", s: "55", m: "56", l: "57" },
      ],
    },
  },
  {
    id: "short-shirt",
    category: "Short Shirt",
    description: "Elegant short shirt perfect for lounging or layering",
    fitNotes: "This shirt is designed with a relaxed, comfortable fit that drapes beautifully on the body.",
    table: {
      headers: ["Measurement", "XS", "S", "M", "L"],
      rows: [
        { measurement: "Back length", xs: "97.5", s: "97.5", m: "97.5", l: "97.5" },
        { measurement: "Front length", xs: "77.5", s: "77.5", m: "77.5", l: "77.5" },
        { measurement: "Chest", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Hips", xs: "54.5", s: "56.5", m: "58.5", l: "61" },
        { measurement: "Sleeve length", xs: "54", s: "55", m: "56", l: "57" },
      ],
    },
  },
]

// -----------------------------
// Export: full content object
// -----------------------------
export const SIZE_GUIDE_CONTENT: SizeGuideContent = {
  hero: {
    title: "Find Your Perfect Fit",
    subtitle: `Each piece has been carefully designed to fit beautifully. Use our guide to find the right size for your ${siteConfig.name.toUpperCase()} piece.`,
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
      { name: "Waist", description: "Measure around your natural waistline, the narrowest part of your torso." },
      { name: "Hips", description: "Measure around the fullest part of your hips, about about 20 cm (8 inches) below your waist." },
      { name: "Inseam", description: "Measure from the top of your inner thigh to your ankle along the inside of your leg." },
      { name: "Chest", description: "Measure around the fullest part of your chest, keeping the tape parallel to the floor." },
    ],
  },
  sizeCategories: CM_CATEGORIES.map((c) => ({
    id: c.id,
    category: c.category,
    description: c.description,
    fitNotes: c.fitNotes,
    tables: {
      cm: c.table,
      in: convertTableCmToIn(c.table),
    },
  })),
  generalNotes: {
    title: "Fit & Care",
    content:
      "Our pieces are designed to drape effortlessly and flatter every silhouette. All measurements are garment measurements taken flat. For the best fit, we recommend following your body measurements and referring to our size charts. If you're between sizes, we suggest sizing up for a more relaxed fit or sizing down for a closer fit.",
  },
}

// -----------------------------
// Helpers
// -----------------------------
function normalize(input: string) {
  return input.trim().toLowerCase().replace(/\s+/g, " ")
}

/**
 * Prefer storing `id` in the Shopify metafield (e.g. "lounge-trousers").
 * This also supports matching by label as fallback so older products won’t break.
 */
export function resolveSizeCategory(metafieldValue: string | null | undefined): SizeCategory | null {
  if (!metafieldValue) return null
  const v = normalize(metafieldValue)

  return (
    SIZE_GUIDE_CONTENT.sizeCategories.find((c) => normalize(c.id) === v) ??
    SIZE_GUIDE_CONTENT.sizeCategories.find((c) => normalize(c.category) === v) ??
    null
  )
}

/** For rendering all tables on the size guide page */
export const ALL_SIZE_CATEGORIES = SIZE_GUIDE_CONTENT.sizeCategories