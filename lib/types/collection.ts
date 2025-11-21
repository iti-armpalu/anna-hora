import type { Product } from "./product";

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;

  products?: {
    nodes: Product[];
  };
}
