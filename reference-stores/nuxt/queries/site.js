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
    header: allContent(filter: { type: "componentHeader", handles: ["component-header"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
    newsletter: allContent(filter: { type: "componentNewsletter", handles: ["component-newsletter"] }) {
      ${CONTENT_QUERY_FRAGMENT}
    }
    footer: allContent(filter: { type: "componentFooter", handles: ["component-footer"] }){
      ${CONTENT_QUERY_FRAGMENT} 
    }
    cart: allContent(filter: { type: "componentCart",  handles: ["component-cart"] }){
      ${CONTENT_QUERY_FRAGMENT}
    }
    products: allProducts{
      edges {
        node {
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
    }
  }
`;
