import { PRODUCT_QUERY_FRAGMENT } from './product';
import { CONTENT_QUERY_FRAGMENT } from './content';

export const COLLECTION_ROUTES_QUERY = `
{
  collections: productCollections {
    content {
      handle
    }
  }
}
`

export const COLLECTION_PAGE_QUERY = `
  query CollectionPage($handle: String!){
    collections: productCollections(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
      }
      products(first: 13){
        ${PRODUCT_QUERY_FRAGMENT}
      }
    }
    pages: content(filter: { type: "collectionContent", handles: [$handle] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;
