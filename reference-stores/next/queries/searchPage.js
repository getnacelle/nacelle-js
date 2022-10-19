import { PRODUCT_QUERY_FRAGMENT } from './product';

export const SEARCH_PAGE_QUERY = `
  query SearchPage {
    products: allProducts {
      ${PRODUCT_QUERY_FRAGMENT}
    }
  }
`;
