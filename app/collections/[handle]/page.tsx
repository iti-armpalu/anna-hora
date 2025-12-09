import ShopClient from "@/app/shop/shop-client";
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
      title: "Collection Not Found | ANNA HORA",
      description: "This collection does not exist.",
      robots: "noindex",
    };
  }

  const title = collection.title;

  return {
    title: `${title} | ANNA HORA`,
    openGraph: {
      title: `${title} | ANNA HORA`,
      url: `/collections/${handle}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ANNA HORA`,
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

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return notFound();
  }

  const collections = await getCollections();
  const products = collection.products ?? [];

  return (
    <ShopClient
      initialProducts={products}
      collections={collections}
      activeCollection={handle}
    />
  );
}
