import ShopClient from "@/app/shop/shop-client";
import { getCollections, getCollectionByHandle } from "@/lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// -------------------------------
// SEO Metadata
// -------------------------------
export async function generateMetadata(
  { params }: { params: { handle: string } }
): Promise<Metadata> {

  const { handle } = params;

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return {
      title: "Collection Not Found | Your Store Name",
      description: "This collection does not exist.",
      robots: "noindex",
    };
  }

  const title = collection.title;

  return {
    title: `${title} | Your Store Name`,
    openGraph: {
      title: `${title} | Your Store Name`,
      url: `/collections/${handle}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Your Store Name`,
    },
  };
}

// -------------------------------
// PAGE
// -------------------------------
export default async function CollectionPage({
  params,
}: {
  params: { handle: string };
}) {
  const { handle } = params;

  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    notFound();
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
