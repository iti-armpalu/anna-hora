// lib/shopify/types/graphql.ts

export interface GraphQLResponse<T> {
    data: T;
    errors?: { message: string }[];
  }
  
  export interface Edge<T> {
    node: T;
  }
  