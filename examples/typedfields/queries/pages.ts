import { graphql } from '../gql';

export const ARTICLE_FRAGMENT = graphql(/* GraphQL */ `
  fragment ArticleFragment on TypedFieldsExampleArticle {
    nacelleEntryId
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
`);

export const LINK_FRAGMENT = graphql(/* GraphQL */ `
  fragment LinkFragment on TypedFieldsExampleArticle {
    nacelleEntryId
    typedFields {
      __typename
      title
      author {
        typedFields {
          firstName
          lastName
        }
      }
    }
  }
`);

export const LINKS_FRAGMENT = graphql(/* GraphQL */ `
  fragment LinksFragment on TypedFieldsExampleLinks {
    nacelleEntryId
    typedFields {
      __typename
      title
      links {
        edges {
          node {
            typedFields {
              handle
              sections {
                edges {
                  node {
                    ...LinkFragment
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
                    ...ArticleFragment
                    ...LinksFragment
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
