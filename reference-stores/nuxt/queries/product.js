export const PRODUCT_QUERY_FRAGMENT = /* GraphQL */ `
  fragment ProductFragment on Product {
    nacelleEntryId
    sourceEntryId
    availableForSale
    productType
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
      availableForSale
      price
      compareAtPrice
      content {
        title
        locale
        featuredMedia {
          src
          thumbnailSrc
          altText
        }
        selectedOptions {
          name
          value
        }
      }
    }
  }
`;

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products($handles: [String!]) {
    products: allProducts(filter: { handles: $handles }) {
      edges {
        node {
          ...ProductFragment
        }
      }
    }
  }
  ${PRODUCT_QUERY_FRAGMENT}
`;
