type ProductLike = {
    id: string;
    handle: string;
  };
  
  const PINNED_PRODUCT_HANDLES = [
    "silk-edit-leopard-lounge-trousers",
    "silk-edit-leopard-lounge-shirt",
    "silk-edit-leopard-lounge-shorts",
    "silk-edit-blue-panther-lounge-trousers",
    "silk-edit-blue-panther-lounge-shirt",
    "silk-edit-blue-panther-lounge-shorts",
    "signature-edit-anthracit-lounge-trousers",
    "signature-edit-green-lounge-shorts",
    "signature-edit-pink-lounge-shorts",
    "signature-edit-off-white-lounge-shirt",
    "signature-edit-anthracite-lounge-shirt",
    "signature-edit-mink-lounge-shirt",
  ];
  
  export function applyMerchandisingOrder<T extends ProductLike>(
    products: T[]
  ): T[] {
    const pinnedOrder = new Map(
      PINNED_PRODUCT_HANDLES.map((handle, index) => [handle, index])
    );
  
    return [...products].sort((a, b) => {
      const aIndex = pinnedOrder.get(a.handle);
      const bIndex = pinnedOrder.get(b.handle);
  
      const aPinned = aIndex !== undefined;
      const bPinned = bIndex !== undefined;
  
      if (aPinned && bPinned) return aIndex - bIndex;
      if (aPinned) return -1;
      if (bPinned) return 1;
  
      return 0;
    });
  }