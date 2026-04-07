import { shopifyFetch } from "./fetch";
import { GET_ARTICLES_QUERY, GET_ARTICLE_BY_HANDLE_QUERY } from "./queries/blog";

const BLOG_HANDLE = "Journal";

// ------------------------------------
// Types
// ------------------------------------
interface ShopifyMetafield {
  key: string;
  value: string;
}

interface ShopifyArticleNode {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  contentHtml: string | null;
  publishedAt: string;
  tags: string[];
  author: { name: string };
  image: { url: string; altText: string | null } | null;
  seo: { title: string | null; description: string | null } | null;
  metafields: (ShopifyMetafield | null)[];
}

interface ArticlesResponse {
  blog: {
    articles: {
      edges: { node: ShopifyArticleNode }[];
    };
  } | null;
}

interface ArticleByHandleResponse {
  blog: {
    articleByHandle: ShopifyArticleNode | null;
  } | null;
}

export interface NormalizedArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  date: string;
  image: string;
  imageAlt: string;
  tags: string[];
  featuredProductHandles: string[];
  seo: { title: string | null; description: string | null } | null;
  readTime: string | null;
  category: string | null;
}

// ------------------------------------
// Normalizer
// ------------------------------------
function normalizeArticle(node: ShopifyArticleNode): NormalizedArticle {
  const featuredProductHandles = node.tags
    .filter((t) => t.startsWith("product:"))
    .map((t) => t.replace("product:", ""));

  const metafields = node.metafields ?? [];

  return {
    id: node.id,
    slug: node.handle,
    title: node.title,
    excerpt: node.excerpt ?? "",
    content: node.contentHtml ?? "",
    author: node.author?.name ?? "ANNA HORA Editorial Team",
    publishedAt: node.publishedAt,
    date: new Date(node.publishedAt).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    image: node.image?.url ?? "/placeholder.svg",
    imageAlt: node.image?.altText ?? "",
    tags: node.tags,
    featuredProductHandles,
    seo: node.seo ?? null,
    readTime: metafields.find((m) => m?.key === "read_time")?.value ?? null,
    category: metafields.find((m) => m?.key === "category")?.value ?? null,
  };
}

// ------------------------------------
// Fetchers
// ------------------------------------
export async function getAllArticles(): Promise<NormalizedArticle[]> {
  const data = await shopifyFetch<ArticlesResponse>({
    query: GET_ARTICLES_QUERY,
    variables: { blogHandle: BLOG_HANDLE, first: 20 },
    cache: "force-cache",
    revalidate: 3600,
    skipMarket: true,
  });

  console.log("[blog] raw response:", JSON.stringify(data, null, 2));

  return (
    data.blog?.articles.edges.map(({ node }) => normalizeArticle(node)) ?? []
  );
}

export async function getArticleByHandle(
  handle: string
): Promise<NormalizedArticle | null> {
  const data = await shopifyFetch<ArticleByHandleResponse>({
    query: GET_ARTICLE_BY_HANDLE_QUERY,
    variables: { blogHandle: BLOG_HANDLE, articleHandle: handle },
    cache: "force-cache",
    revalidate: 3600,
    skipMarket: true,
  });

  const article = data.blog?.articleByHandle;
  if (!article) return null;
  return normalizeArticle(article);
}