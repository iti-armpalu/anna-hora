import type { ProductNormalized } from "./product-normalized";

export interface CollectionNormalized {
  id: string;
  title: string;
  handle: string;

  products: ProductNormalized[];
}
