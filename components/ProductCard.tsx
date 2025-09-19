import Link from "next/link";
import type { Product } from "@/lib/viewModels";


export function ProductCard({ p }: { p: Product }) {
const price = p.variants[0]?.price;
return (
<Link href={`/products/${p.handle}`} className="block rounded border p-4 hover:shadow">
{p.image && (
// eslint-disable-next-line @next/next/no-img-element
<img src={p.image.url} alt={p.image.alt ?? p.title} className="w-full h-auto" />
)}
<h3 className="mt-2 font-medium">{p.title}</h3>
{price && <p className="text-sm opacity-70">{price.amount} {price.currencyCode}</p>}
</Link>
);
}