/* eslint-disable no-undef */
export default /* GraphQL */ `
  fragment CollectionProductFragment on Product {
    nacelleEntryId
    sourceEntryId
    content {
      handle
      title
      options {
        name
        values
      }
      featuredMedia {
        src
        thumbnailSrc
        altText
      }
    }
    variants {
      nacelleEntryId
      sourceEntryId
      sku
      availableForSale
      price
      compareAtPrice
      content {
        title
        selectedOptions {
          name
          value
        }
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
      }
    }
  }
`;
