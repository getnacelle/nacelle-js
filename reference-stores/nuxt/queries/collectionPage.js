import { PRODUCT_QUERY_FRAGMENT } from './product';
import { CONTENT_QUERY_FRAGMENT } from './content';

export const COLLECTION_PAGE_QUERY = `
  query CollectionPage($handle: String!, $pageHandle: String!){
    collections: allProductCollections(filter: { handles: [$handle] }){
      edges {
        node {
          nacelleEntryId
          sourceEntryId
          content{
            handle
            title
          }
          products: productConnection(first: 13){
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
    }
    pages: allContent(filter: { type: "pageCollection", handles: [$pageHandle] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;
