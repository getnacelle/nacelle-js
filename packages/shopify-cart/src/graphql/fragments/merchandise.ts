export default /* GraphQL */ `
  fragment Merchandise_merchandise on ProductVariant {
    id
    availableForSale
    compareAtPriceV2 {
      ...Money_money
    }
    priceV2 {
      ...Money_money
    }
    requiresShipping
    title
    image {
      ...Image_image
    }
    product {
      handle
      onlineStoreUrl
      tags
      title
      vendor
    }
    selectedOptions {
      name
      value
    }
  }
`;
