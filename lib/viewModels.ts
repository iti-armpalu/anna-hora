

export type Money = { amount: string; currencyCode: string };
export type Variant = { id: string; title: string; available: boolean; price: Money };
export type Product = {
id: string;
handle: string;
title: string;
descriptionHtml?: string;
image?: { url: string; alt?: string };
variants: Variant[];
};

export type CartLine = { id: string; merchandiseId: string; quantity: number };
export type Cart = { id: string; lines: CartLine[]; checkoutUrl?: string };