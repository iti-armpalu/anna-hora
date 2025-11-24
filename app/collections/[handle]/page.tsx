import ShopClient from "@/app/shop/shop-client";
import { getCollections, getCollectionByHandle } from "@/lib/shopify";

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const { handle } = params;

  const collection = await getCollectionByHandle(handle);
  const collections = await getCollections();

  const products = collection?.products?.nodes ?? [];
  const pageInfo = collection?.products?.pageInfo ?? {
    hasNextPage: false,
    endCursor: null,
  };

  return (
    <ShopClient
      initialProducts={products}
      collections={collections}
      initialCollectionHandle={handle}
      initialPageInfo={pageInfo}
    />
  );
}
