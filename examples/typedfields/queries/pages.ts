import { graphql } from '../gql';

export const CONTENT_ROUTES_QUERY = graphql(/* GraphQL */ `
  query ContentRoutes {
    pages: allContent(filter: { type: "page" }) {
      edges {
        node {
          handle
        }
      }
    }
  }
`);

export const PAGE_QUERY_BY_HANDLE = graphql(/* GraphQL */ `
  query allContent($handle: String!) {
    allContent(filter: { type: "page", handles: [$handle] }) {
      edges {
        node {
          handle
          nacelleEntryId
          typedFields {
            ... on TypedFieldsExamplePageFields {
              __typename
              handle
              title
              sections {
                edges {
                  node {
                    ... on TypedFieldsExampleArticle {
                      typedFields {
                        __typename
                        haiku
                        title
                        author {
                          typedFields {
                            firstName
                            lastName
                          }
                        }
                      }
                    }
                    ... on TypedFieldsExampleLinks {
                      typedFields {
                        __typename
                        links {
                          edges {
                            node {
                              typedFields {
                                handle
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
