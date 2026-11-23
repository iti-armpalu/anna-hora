export const cartContent = {
    title: "Your bag",
    itemCount: (count: number): string => `${count} ${count === 1 ? "item" : "items"}`,
    summaryTitle: "Order summary",
    subtotal: "Subtotal",
    checkout: "Checkout",
    viewBag: "View bag",
    checkoutNote: "Shipping, discount codes and gift cards are applied at checkout.",
    remove: "Remove",
    size: (size: string): string => `Size ${size}`,
    empty: {
        title: "Your bag is empty",
        text: "Discover our silk loungewear, crafted for moments of quiet luxury.",
        cta: "Continue shopping",
    },
    errors: {
        remove: "We couldn't remove this item. Please try again.",
        update: "We couldn't update the quantity. Please try again.",
        maxQuantity: "That's all we have in this size.",
    },
} as const
