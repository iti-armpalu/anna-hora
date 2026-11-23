import { z } from "zod";

const socialAccountSchema = z.object({
    link: z.string().url(),
    handle: z.string().min(1),
});

const customerCareHoursSchema = z.object({
    mondayFriday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
    /** Shown once under the hours instead of repeating a zone on every line */
    timezone: z.string(),
});

const addressSchema = z.object({
    companyName: z.string(),
    street: z.string(),
    zip: z.string(),
    city: z.string(),
    country: z.string(),
    countryCode: z.string().length(2),
});

const siteSchema = z.object({
    name: z.string(),
    displayName: z.string(),
    url: z.string().url(),
    tagline: z.string(),
    supportEmail: z.string().email(),
    phone: z.string(),
    /** Grouped for reading; `phone` stays unformatted for tel: links and copying */
    phoneDisplay: z.string(),
    address: addressSchema,
    customerCareHours: customerCareHoursSchema,

    social: z.object({
        instagram: socialAccountSchema.optional(),
        tiktok: socialAccountSchema.optional(),
        youtube: socialAccountSchema.optional(),
    }),
});

export const siteConfig = siteSchema.parse({
    name: "Anna Hora",
    displayName: "ANNA HORA", // used in titles and logo contexts only
    url: "https://www.annahora.com",
    tagline: `Crafted with care. Worn with intention. Thank you for being here — 
    for choosing slower moments, thoughtful design, and pieces that feel as good 
    as they look. We're honoured to be part of your ritual.`,

    supportEmail: "customerservice@annahora.com",
    phone: "+420773583533",
    phoneDisplay: "+420 773 583 533",

    address: {
        companyName: "Anna Hora s.r.o.",
        street: "Benešovská 1924/4",
        zip: "101 00",
        city: "Praha 10",
        country: "Czech Republic",
        countryCode: "CZ",
    },

    customerCareHours: {
        // 24-hour clock, the norm in Czechia; zone label covers both winter (CET) and summer (CEST)
        mondayFriday: "9:00 – 18:00",
        saturday: "Closed",
        sunday: "Closed",
        timezone: "Prague time (CET/CEST)",
    },

    social: {
        instagram: {
            link: "https://instagram.com/anna_hora_collection",
            handle: "anna_hora_collection",
        },
    },
});

export type SiteConfig = z.infer<typeof siteSchema>;

/**
 * Returns address lines as an array suitable for rendering in contact blocks,
 * footers, or legal copy where the address is displayed line-by-line.
 */
export function getAddressLines(config: SiteConfig): string[] {
    const { companyName, street, zip, city, country } = config.address;
    return [companyName, street, `${zip} ${city}`, country];
}

/**
 * Returns a compact single-line address string for use in legal paragraph copy,
 * e.g. "Anna Hora s.r.o., Benešovská 1924/4, 101 00 Praha 10, Czech Republic"
 */
export function getAddressInline(config: SiteConfig): string {
    return getAddressLines(config).join(", ");
}