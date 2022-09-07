export default () => /* GraphQL */ `
  fragment Merchandise_merchandise on ProductVariant {
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
      id
      url
      altText
      width
      height
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
