import { PRODUCT_QUERY_FRAGMENT } from './product';

export const COLLECTION_PRODUCTS_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!, $after: String!) {
    collections: allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          products: productConnection(first: 12, after: $after) {
            pageInfo {
              endCursor
              hasNextPage
            }
            edges {
              node {
                ...ProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${PRODUCT_QUERY_FRAGMENT}
`;
