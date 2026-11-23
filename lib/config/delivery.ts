// Single source for delivery estimates — used by Shipping & returns and the Terms (section 6)
export interface DeliveryRegion {
    region: string
    time: string
    carriers: string
}

export const DELIVERY_REGIONS: DeliveryRegion[] = [
    { region: "Czech Republic", time: "2–3 business days", carriers: "PPL or Zásilkovna" },
    { region: "Europe", time: "3–4 business days", carriers: "DHL Express" },
    { region: "Rest of the world", time: "4–5 business days", carriers: "DHL Express" },
]
