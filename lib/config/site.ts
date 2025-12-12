import { z } from "zod";

const socialAccountSchema = z.object({
    link: z.string().url(),
    handle: z.string().min(1),
});

const siteSchema = z.object({
    name: z.string(),
    tagline: z.string(),
    supportEmail: z.string().email(),
    phone: z.string(),
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
    phone: "+420 723 583 533",
    social: {
        instagram: {
            link: "https://instagram.com/anna_hora_collection",
            handle: "anna_hora_collection",
        },
    },
});

export type SiteConfig = z.infer<typeof siteSchema>;
