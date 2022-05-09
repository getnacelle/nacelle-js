import { PRODUCT_QUERY_FRAGMENT } from './product';

export const SEARCH_PAGE_QUERY = `
  query SearchPage{
    products: products{
      ${PRODUCT_QUERY_FRAGMENT}
    }
  }
`;
