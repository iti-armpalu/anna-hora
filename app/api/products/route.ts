// import { getProducts } from "@/lib/shopify";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const after = searchParams.get("after") || undefined;

//     const PAGE_SIZE = 3;
//     const { products, pageInfo } = await getProducts(PAGE_SIZE, after);

//     return Response.json({ products, pageInfo });
// }
