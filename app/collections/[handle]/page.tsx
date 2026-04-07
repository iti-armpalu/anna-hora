import { Metadata } from "next";
import { pageMeta } from "@/lib/config/metadata";
import { siteConfig } from "@/lib/config/site";

import { notFound } from "next/navigation";

import ShopClient from "@/app/shop/shop-client";
import { getCollections, getCollectionByHandle } from "@/lib/shopify";

// -------------------------------
// Metadata
// -------------------------------
export async function generateMetadata({ params }): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return { title: "Collection Not Found", robots: "noindex, nofollow" };
  }

  return {
    title: collection.title, // template in defaultMetadata appends " | ANNA HORA"
    description: collection.description || pageMeta.shop.description,
    openGraph: {
      title: `${collection.title} | ${siteConfig.name.toUpperCase()}`,
      url: `/collections/${handle}`,
      images: collection.image
        ? [{ url: collection.image.url, width: 1200, height: 630, alt: collection.title }]
        : undefined,
      type: "website",
    },
  };
}

// -------------------------------
// PAGE
// -------------------------------
export default async function CollectionPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {

  const { handle } = await params;

  const [collection, collections] = await Promise.all([
    getCollectionByHandle(handle),
    getCollections(),
  ]);

  if (!collection) notFound();


  return (
    <ShopClient
      initialProducts={collection.products ?? []}
      collections={collections}
      activeCollection={handle}
    />
  );
}
