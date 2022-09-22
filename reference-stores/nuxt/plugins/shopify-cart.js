import createShopifyCartClient from '@nacelle/shopify-cart';

const customFragments = {
  EXTEND_CART: `
    fragment Cart_extendCart on Cart {
      id
      checkoutUrl
    }
  `,
  EXTEND_CART_LINE: `
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
  MERCHANDISE: `
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
