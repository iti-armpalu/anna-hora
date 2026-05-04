import { z } from "zod";

const socialAccountSchema = z.object({
    link: z.string().url(),
    handle: z.string().min(1),
});

const customerCareHoursSchema = z.object({
    mondayFriday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
});

const siteSchema = z.object({
    name: z.string(),
    displayName: z.string(),
    url: z.string().url(),
    tagline: z.string(),
    supportEmail: z.string().email(),
    phone: z.string(),
    customerCareHours: customerCareHoursSchema,

    social: z.object({
        instagram: socialAccountSchema.optional(),
        tiktok: socialAccountSchema.optional(),
        youtube: socialAccountSchema.optional(),
    }),
});

export const siteConfig = siteSchema.parse({
    name: "Anna Hora",
    displayName: "ANNA HORA",  // used in titles and logo contexts only
    url: "https://www.annahora.com",
    tagline: `Crafted with care. Worn with intention. Thank you for being here — 
    for choosing slower moments, thoughtful design, and pieces that feel as good 
    as they look. We're honoured to be part of your ritual.`,

    supportEmail: "customerservice@annahora.com",
    phone: "+420773583533",

    customerCareHours: {
        mondayFriday: "9:00 AM – 6:00 PM CET (12:00 PM – 9:00 PM GST)",
        saturday: "Closed",
        sunday: "Closed",
    },

    social: {
        instagram: {
            link: "https://instagram.com/anna_hora_collection",
            handle: "anna_hora_collection",
        },
    },
});

export type SiteConfig = z.infer<typeof siteSchema>;
