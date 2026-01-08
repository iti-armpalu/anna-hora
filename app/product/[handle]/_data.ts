export interface SizeGuideMeasurement {
    size: string
    bust: {
      cm: string
      inches: string
    }
    length: {
      cm: string
      inches: string
    }
    sleeve: {
      cm: string
      inches: string
    }
  }
  
  export interface SizeGuideData {
    title: string
    description: string
    headers: string[]
    measurements: SizeGuideMeasurement[]
  }
  
  export const sizeGuideData: SizeGuideData = {
    title: "Size Guide",
    description: "Our pieces are designed for a relaxed, comfortable fit.",
    headers: ["Size", "Bust", "Length", "Sleeve"],
    measurements: [
      {
        size: "XS",
        bust: { cm: "81-86", inches: '32-34"' },
        length: { cm: "122", inches: '48"' },
        sleeve: { cm: "58", inches: '23"' },
      },
      {
        size: "S",
        bust: { cm: "86-91", inches: '34-36"' },
        length: { cm: "124", inches: '49"' },
        sleeve: { cm: "60", inches: '23.5"' },
      },
      {
        size: "M",
        bust: { cm: "91-97", inches: '36-38"' },
        length: { cm: "127", inches: '50"' },
        sleeve: { cm: "61", inches: '24"' },
      },
      {
        size: "L",
        bust: { cm: "97-102", inches: '38-40"' },
        length: { cm: "130", inches: '51"' },
        sleeve: { cm: "62", inches: '24.5"' },
      },
    ],
  }
  