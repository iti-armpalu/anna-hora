// ----- TYPES -----

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export type ProductImage = {
  url: string;
  altText?: string | null;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  price: { amount: string; currencyCode: string };
};

export type Metafield = {
  key: string | null;
  value: string | null;
};

export type ProductCollectionRef = {
  handle: string;
};


export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: ProductImage | null;
  options?: { id: string; name: string; values: string[]; }[];
  images: { edges: { node: ProductImage }[] };
  variants: { edges: { node: ProductVariant }[] };
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string };
    maxVariantPrice: { amount: string; currencyCode: string };
  };
  metafields?: Metafield[];
  collections?: {
    nodes: ProductCollectionRef[];
  };
};