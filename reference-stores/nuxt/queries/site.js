import { CONTENT_QUERY_FRAGMENT } from './content';

export const SITE_QUERY = /* GraphQL */ `
  {
    space: spaceProperties {
      properties {
        namespace
        items {
          key
          value
        }
      }
    }
    header: allContent(
      filter: { type: "componentHeader", handles: ["component-header"] }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
    newsletter: allContent(
      filter: { type: "componentNewsletter", handles: ["component-newsletter"] }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
    footer: allContent(
      filter: { type: "componentFooter", handles: ["component-footer"] }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
    cart: allContent(
      filter: { type: "componentCart", handles: ["component-cart"] }
    ) {
      edges {
        node {
          ...ContentFragment
        }
      }
    }
    products: allProducts {
      edges {
        node {
          nacelleEntryId
          content {
            handle
            title
            featuredMedia {
              src
              thumbnailSrc
              altText
            }
          }
          variants {
            price
            compareAtPrice
          }
        }
      }
    }
  }
  ${CONTENT_QUERY_FRAGMENT}
`;
