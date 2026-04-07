export const GET_ARTICLES_QUERY = `
  query GetArticles($blogHandle: String!, $first: Int!) {
    blog(handle: $blogHandle) {
      articles(first: $first) {
        edges {
          node {
            id
            handle
            title
            excerpt
            contentHtml
            publishedAt
            tags
            author { name }
            image { url altText }
            seo { title description }
            metafields(identifiers: [
              { namespace: "custom", key: "read_time" }
              { namespace: "custom", key: "category" }
            ]) {
              key
              value
            }
          }
        }
      }
    }
  }
`;

export const GET_ARTICLE_BY_HANDLE_QUERY = `
  query GetArticleByHandle($blogHandle: String!, $articleHandle: String!) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        id
        handle
        title
        excerpt
        contentHtml
        publishedAt
        tags
        author { name }
        image { url altText }
        seo { title description }
        metafields(identifiers: [
          { namespace: "custom", key: "read_time" }
          { namespace: "custom", key: "category" }
        ]) {
          key
          value
        }
      }
    }
  }
`;