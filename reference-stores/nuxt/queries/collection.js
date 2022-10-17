import { PRODUCT_QUERY_FRAGMENT } from './product';

export const COLLECTION_PRODUCTS_QUERY = `
  query CollectionProducts($handle: String!, $after: String!){
    collections: allProductCollections(filter: { handles: [$handle] }){
      edges {
				node {
          products: productConnection(first: 12, after: $after){
            ${PRODUCT_QUERY_FRAGMENT}
          }
        }
      }
    }
  }
`;
