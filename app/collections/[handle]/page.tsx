import ShopClient from "@/app/shop/shop-client";
import { siteConfig } from "@/lib/config/site";
import { getCollections, getCollectionByHandle } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// -------------------------------
// SEO Metadata
// -------------------------------
export async function generateMetadata(
  { params }: { params: Promise<{ handle: string }> }
): Promise<Metadata> {
  const { handle } = await params;

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection Not Found",
      robots: "noindex",
    };
  }

  return {
    title: `${collection.title} | ${siteConfig.name.toUpperCase()}`,
    openGraph: {
      title: `${collection.title} | ${siteConfig.name.toUpperCase()}`,
      url: `/collections/${handle}`,
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
