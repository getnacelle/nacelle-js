import createShopifyCartClient from '@nacelle/shopify-cart';

const customFragments = {
  EXTEND_CART: /* GraphQL */ `
    fragment Cart_extendCart on Cart {
      id
      checkoutUrl
    }
  `,
  EXTEND_CART_LINE: /* GraphQL */ `
    fragment CartLine_extendCartLine on CartLine {
      id
      quantity
      attributes {
        key
        value
      }
      cost {
        amountPerQuantity {
          amount
          currencyCode
        }
      }
    }
  `,
  MERCHANDISE: /* GraphQL */ `
    fragment Merchandise_merchandise on ProductVariant {
      availableForSale
      compareAtPriceV2 {
        amount
        currencyCode
      }
      image {
        altText
        url
      }
      product {
        handle
        title
      }
      selectedOptions {
        name
        value
      }
      title
    }
  `
};

export default (context, inject) => {
  const client = createShopifyCartClient({
    ...context.$config.shopify,
    customFragments
  });
  inject('cartClient', client);
};
