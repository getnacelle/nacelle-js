export default /* GraphQL */ `
  query ProductPage($handle: String!) {
    products(filter: { handles: [$handle] }) {
      nacelleEntryId
      sourceEntryId
      content {
        handle
        title
        description
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
  }
`;
