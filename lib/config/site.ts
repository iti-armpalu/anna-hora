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
    tagline: `Crafted with care. Worn with intention. Thank you for being here — 
    for choosing slower moments, thoughtful design, and pieces that feel as good 
    as they look. We're honoured to be part of your ritual.`,

    supportEmail: "customerservice@annahora.com",
    phone: "+420 773 583 533",

    customerCareHours: {
        mondayFriday: "9:00 AM – 6:00 PM CET",
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
