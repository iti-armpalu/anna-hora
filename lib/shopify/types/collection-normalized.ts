import type { ProductNormalized } from "./product-normalized";

export interface CollectionNormalized {
  id: string;
  title: string;
  description: string;
  handle: string;
  image: {
    url: string;
    altText: string | null;
  } | null;

  products: ProductNormalized[];
}
