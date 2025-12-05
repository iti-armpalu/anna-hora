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

  // If collection doesn't exist → return a fallback title
  if (!collection) {
    return {
      title: "Collection Not Found | Your Store Name",
      description: "This collection does not exist.",
      robots: "noindex",
    };
  }

  const title = collection.title;
  // const description =
  //   collection.description?.replace(/(<([^>]+)>)/gi, "") || // strip HTML if Shopify returns it
  //   `Explore products from the ${title} collection.`;

  return {
    title: `${title} | Your Store Name`,
    // description,

    openGraph: {
      title: `${title} | Your Store Name`,
      // description,
      url: `/collections/${handle}`,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Your Store Name`,
      // description,
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

  // Fetch specific collection
  const collection = await getCollectionByHandle(handle);

  // Handle invalid collection handles
  if (!collection) {
    return notFound();
  }

  // Fetch all collections (for FiltersPanel + navigation)
  const collections = await getCollections();

  // Products are already normalized by your Shopify layer
  const products = collection.products ?? [];

  return (
    <ShopClient
      initialProducts={products}
      collections={collections}
      activeCollection={handle}
    />
  );
}
