const usdFormatter = new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  })
  
  export function Money({ amount }: { amount: number }) {
    return <>{usdFormatter.format(amount)}</>
  }
  