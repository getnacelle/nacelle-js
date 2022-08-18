import CollectionProductFragment from './collection-product-fragment.query';

export default `
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

export const CollectionProductsQuery = `
  query CollectionProducts($handle: String) {
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
