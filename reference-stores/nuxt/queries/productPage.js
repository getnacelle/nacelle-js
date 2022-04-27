import { CONTENT_QUERY_FRAGMENT } from './content';

export const PRODUCT_PAGE_QUERY = `
  query ProductPage($handle: String!, $pageHandle: String!){
    products: products(filter: { handles: [$handle] }){
      nacelleEntryId
      sourceEntryId
      content{
        handle
        title
        description
        options{
          name
          values
        }
        media{
          type
          src
          altText
        }
      }
      variants{
        nacelleEntryId
        sourceEntryId
        sku
        availableForSale
        price
        compareAtPrice
        content{
          title
          selectedOptions{
            name
            value
          }
          featuredMedia{
            src
            thumbnailSrc
            altText
          }
        }
      }
    }
    pages: content(filter: { type: "pageProduct", handles: [$pageHandle] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
  }
`;
