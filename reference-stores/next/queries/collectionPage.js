import { PRODUCT_QUERY_FRAGMENT } from './product';
import { CONTENT_QUERY_FRAGMENT } from './content';

export const COLLECTION_ROUTES_QUERY = /* GraphQL */ `
  {
    collections: allProductCollections {
      edges {
        node {
          content {
            handle
          }
        }
      }
    }
  }
`;

export const COLLECTION_PAGE_QUERY = /* GraphQL */ `
  query CollectionPage($handle: String!, $pageHandle: String!) {
    collections: allProductCollections(filter: { handles: [$handle] }) {
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content {
            handle
            title
          }
          products: productConnection(first: 13) {
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
    pages: allContent(
      filter: { type: "pageCollection", handles: [$pageHandle] }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
  }
  ${PRODUCT_QUERY_FRAGMENT}
  ${CONTENT_QUERY_FRAGMENT}
`;
