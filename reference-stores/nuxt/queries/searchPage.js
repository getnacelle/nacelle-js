import { PRODUCT_QUERY_FRAGMENT } from './product';

export const SEARCH_PAGE_QUERY = /* GraphQL */ `
  query SearchPage {
    products: allProducts {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PRODUCT_QUERY_FRAGMENT}
`;
