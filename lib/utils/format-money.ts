export function formatMoney(amount: string, currency: string) {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
    }).format(Number(amount));
  }