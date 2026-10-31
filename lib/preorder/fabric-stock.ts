import "server-only";
import { adminFetch } from "@/lib/shopify/admin";
import { PREORDER_LINE_ATTRIBUTE_KEY } from "@/lib/config/preorder";
import {
  PRODUCTS_FABRIC_QUERY,
  FABRIC_WITH_PRODUCTS_QUERY,
  FABRIC_UPDATE_MUTATION,
  VARIANTS_POLICY_MUTATION,
  ORDER_TAGS_ADD_MUTATION,
} from "./admin-queries";

// Order tags make processing idempotent — Shopify retries webhooks
export const FABRIC_DEDUCTED_TAG = "fabric-deducted";
export const FABRIC_RESTORED_TAG = "fabric-restored";

// ----------------------------------
// Types
// ----------------------------------

/** The subset of Shopify's order webhook payload we use. */
export interface OrderWebhookPayload {
  admin_graphql_api_id: string;
  name: string;
  tags: string; // comma-separated
  line_items: {
    product_id: number | null;
    quantity: number;
    properties: { name: string; value: string }[];
  }[];
}

type InventoryPolicy = "CONTINUE" | "DENY";
type UserErrors = { userErrors: { field: string[] | null; message: string }[] };

interface ProductsFabricData {
  nodes: ({ id: string; fabric: { reference: { id: string } | null } | null } | null)[];
}

interface FabricWithProductsData {
  metaobject: {
    id: string;
    remainingCm: { value: string | null } | null;
    referencedBy: {
      nodes: {
        // Empty object when the referencer isn't a Product
        referencer: {
          id?: string;
          cmPerItem?: { value: string | null } | null;
          variants?: { nodes: { id: string; inventoryPolicy: InventoryPolicy }[] };
        };
      }[];
    };
  } | null;
}

// ----------------------------------
// Helpers
// ----------------------------------

function throwOnUserErrors(operation: string, result: UserErrors): void {
  if (result.userErrors.length) {
    throw new Error(`${operation}: ${result.userErrors.map((e) => e.message).join("; ")}`);
  }
}

function hasTag(order: OrderWebhookPayload, tag: string): boolean {
  return order.tags.split(",").map((t) => t.trim()).includes(tag);
}

/** Pre-order quantity per product GID, from the cart line attribute set at add-to-bag. */
function getPreorderQuantities(order: OrderWebhookPayload): Map<string, number> {
  const quantities = new Map<string, number>();

  for (const line of order.line_items) {
    const isPreorder = line.properties.some((p) => p.name === PREORDER_LINE_ATTRIBUTE_KEY);
    if (!isPreorder || line.product_id === null) continue;

    const productGid = `gid://shopify/Product/${line.product_id}`;
    quantities.set(productGid, (quantities.get(productGid) ?? 0) + line.quantity);
  }

  return quantities;
}

async function fetchFabric(fabricId: string) {
  const { metaobject } = await adminFetch<FabricWithProductsData>(FABRIC_WITH_PRODUCTS_QUERY, {
    id: fabricId,
  });
  if (!metaobject) throw new Error(`Fabric ${fabricId} not found`);

  const products = metaobject.referencedBy.nodes
    .map(({ referencer }) => referencer)
    .filter((p): p is Required<typeof p> => Boolean(p.id && p.variants));

  return {
    remainingCm: Number(metaobject.remainingCm?.value ?? 0),
    products: products.map((p) => ({
      id: p.id,
      cmPerItem: Number(p.cmPerItem?.value ?? 0),
      variants: p.variants.nodes,
    })),
  };
}

// ----------------------------------
// Public API
// ----------------------------------

/**
 * Turns pre-ordering on or off for every product linked to a fabric, based on whether
 * the remaining fabric covers one more item. Safe to run any time — it only writes
 * variants whose policy needs to change.
 */
export async function syncFabricAvailability(fabricId: string): Promise<void> {
  const fabric = await fetchFabric(fabricId);

  await Promise.all(
    fabric.products.map(async (product) => {
      if (product.cmPerItem <= 0) {
        console.error(`Product ${product.id} is linked to fabric ${fabricId} without fabric_cm_per_item — skipped`);
        return;
      }

      const policy: InventoryPolicy = fabric.remainingCm >= product.cmPerItem ? "CONTINUE" : "DENY";
      const variantsToUpdate = product.variants
        .filter((v) => v.inventoryPolicy !== policy)
        .map((v) => ({ id: v.id, inventoryPolicy: policy }));

      if (!variantsToUpdate.length) return;

      const { productVariantsBulkUpdate } = await adminFetch<{ productVariantsBulkUpdate: UserErrors }>(
        VARIANTS_POLICY_MUTATION,
        { productId: product.id, variants: variantsToUpdate }
      );
      throwOnUserErrors("productVariantsBulkUpdate", productVariantsBulkUpdate);
    })
  );
}

/**
 * Deducts fabric for a new order's pre-order lines ("deduct"), or returns it for a
 * cancelled order ("restore"). Each order is processed at most once per direction.
 */
export async function applyOrderToFabric(
  order: OrderWebhookPayload,
  direction: "deduct" | "restore"
): Promise<void> {
  const doneTag = direction === "deduct" ? FABRIC_DEDUCTED_TAG : FABRIC_RESTORED_TAG;
  if (hasTag(order, doneTag)) return;
  // Only return fabric that was actually taken
  if (direction === "restore" && !hasTag(order, FABRIC_DEDUCTED_TAG)) return;

  const preorderQuantities = getPreorderQuantities(order);
  if (!preorderQuantities.size) return;

  const { nodes } = await adminFetch<ProductsFabricData>(PRODUCTS_FABRIC_QUERY, {
    ids: [...preorderQuantities.keys()],
  });

  // Group the products in this order by fabric
  const quantitiesByFabric = new Map<string, Map<string, number>>();
  for (const product of nodes) {
    const fabricId = product?.fabric?.reference?.id;
    if (!product || !fabricId) continue;
    const forFabric = quantitiesByFabric.get(fabricId) ?? new Map<string, number>();
    forFabric.set(product.id, preorderQuantities.get(product.id) ?? 0);
    quantitiesByFabric.set(fabricId, forFabric);
  }

  for (const [fabricId, productQuantities] of quantitiesByFabric) {
    const fabric = await fetchFabric(fabricId);

    const cmUsed = fabric.products.reduce(
      (sum, p) => sum + p.cmPerItem * (productQuantities.get(p.id) ?? 0),
      0
    );
    const change = direction === "deduct" ? -cmUsed : cmUsed;
    const newRemaining = fabric.remainingCm + change;

    if (newRemaining < 0) {
      // Two near-simultaneous orders can oversell by a little; record it, don't fail
      console.error(`Fabric ${fabricId} oversold by ${-newRemaining} cm on order ${order.name}`);
    }

    const { metaobjectUpdate } = await adminFetch<{ metaobjectUpdate: UserErrors }>(
      FABRIC_UPDATE_MUTATION,
      { id: fabricId, remainingCm: String(Math.max(0, newRemaining)) }
    );
    throwOnUserErrors("metaobjectUpdate", metaobjectUpdate);
  }

  // Tag immediately after the fabric write so a retry can't apply it twice.
  // (If tagging itself fails, a retry double-deducts — the safe direction: undersell, never oversell.)
  const { tagsAdd } = await adminFetch<{ tagsAdd: UserErrors }>(ORDER_TAGS_ADD_MUTATION, {
    id: order.admin_graphql_api_id,
    tags: [doneTag],
  });
  throwOnUserErrors("tagsAdd", tagsAdd);

  await Promise.all([...quantitiesByFabric.keys()].map(syncFabricAvailability));
}
