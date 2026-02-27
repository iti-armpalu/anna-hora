import type { Product } from "./product";

export interface ShopifyCollection {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    url: string;
    altText?: string | null;
  } | null;

  products?: {
    nodes: Product[];
  };
}
