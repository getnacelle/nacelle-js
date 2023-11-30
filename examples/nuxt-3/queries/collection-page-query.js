import CollectionProductFragment from './collection-product-fragment.query';

export default /* GraphQL */ `
  query CollectionPage($handle: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content {
            title
          }
          productConnection(first: 12) {
            pageInfo {
              hasNextPage
              endCursor
            }
            totalCount
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${CollectionProductFragment}
`;

export const CollectionProductsQuery = /* GraphQL */ `
  query CollectionProducts($handle: String!, $after: String!) {
    allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          productConnection(first: 12, after: $after) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                ...CollectionProductFragment
              }
            }
          }
        }
      }
    }
  }
  ${CollectionProductFragment}
`;
