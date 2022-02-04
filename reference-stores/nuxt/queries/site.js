import { CONTENT_QUERY_FRAGMENT } from './content';

export const SITE_QUERY = `
  {
    space: spaceProperties{
      properties{
        namespace
        items{
          key
          value
        }
      }
    }
    header: content(filter: { type: "componentHeader", handles: ["component-header"] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
    newsletter: content(filter: { type: "componentNewsletter", handles: ["component-newsletter"] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
    footer: content(filter: { type: "componentFooter", handles: ["component-footer"] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
    cart: content(filter: { type: "componentCart",  handles: ["component-cart"] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
    products: products{
      nacelleEntryId
      content{
        handle
        title
        featuredMedia{
          src
          thumbnailSrc
          altText
        }
      }
      variants{
        price
        compareAtPrice
      }
    }
  }
`;
